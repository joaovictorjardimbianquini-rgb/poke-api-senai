import './styles/home.modules.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import PokemonCard from '../../components/PokemonCard';
import PokemonInfo from '../../components/PokemonInfo';
import AxiosWithoutToken from '../../services/config';

function Home({ searchQuery = "", team, setTeam }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setPageLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const PAGE_SIZE = 26;
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const pageLoadingRef = useRef(false);
  const cache = useRef(new Map());
  const addToTeam = (pokemon) => {
  if (team.length >= 6) {
    alert("Seu time já tem 6 Pokémon");
    return;
  }

  const exists = team.find(p => p.id === pokemon.id);
  if (exists) {
    alert("Esse Pokémon já está no time (Dupes Clause)");
    return;
  }

  const formatted = {
    id: pokemon.id,
    name: pokemon.name,
    sprite:
      pokemon.sprites?.other?.['official-artwork']?.front_default ||
      pokemon.sprites?.front_default ||
      pokemon.sprite ||
      null,
  };

  setTeam([...team, formatted]);
};

  // helpers to derive id and sprite without fetching details
  function getIdFromUrl(url) {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }
  function getSpriteUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  // Fetch paginated lightweight list (name + url -> id + sprite)
  useEffect(() => {
    const fetchPage = async () => {
      try {
        // `loading` is used for initial full-screen loader; `pageLoading` prevents duplicate page fetches
        if (offset === 0) setLoading(true);
        setPageLoading(true);
        const res = await AxiosWithoutToken().get(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
        const results = res.data.results;
        const mapped = results.map(r => {
          const id = getIdFromUrl(r.url);
          return { name: r.name, url: r.url, id, sprite: getSpriteUrl(id), poke_types: [] };
        });
        setPokemons(prev => {
          // append but prevent duplicates by id
          const merged = [...prev, ...mapped];
          const byId = new Map();
          merged.forEach(p => byId.set(p.id, p));
          return Array.from(byId.values());
        });
        // eager-load types for the newly fetched page so badges and card bg appear
        try {
          const details = await Promise.allSettled(mapped.map(p => AxiosWithoutToken().get(`/pokemon/${p.id}`)));
          const typesMap = new Map();
          details.forEach((d, i) => {
            if (d.status === 'fulfilled' && d.value?.data) {
              typesMap.set(mapped[i].id, d.value.data.types);
            }
          });
          if (typesMap.size > 0) {
            setPokemons(prev => prev.map(p => ({ ...p, poke_types: typesMap.get(p.id) || p.poke_types })));
          }
        } catch (err) {
          console.warn('Erro carregando tipos da página:', err);
        }
        if (results.length < PAGE_SIZE) setHasMore(false);
      } catch (e) {
        console.error('Error fetching Pokemon page:', e);
      } finally {
        if (offset === 0) setLoading(false);
        setPageLoading(false);
        pageLoadingRef.current = false;
      }
    };
    fetchPage();
  }, [offset]);

  // Infinite scroll: observe loaderRef and increase offset when visible
  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // use ref to avoid races between observer callbacks and state updates
        if (entry.isIntersecting && hasMore && !pageLoadingRef.current) {
          pageLoadingRef.current = true;
          setPageLoading(true);
          setOffset(o => o + PAGE_SIZE);
        }
      });
    });
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [loaderRef.current, hasMore]);

  // Load full details + species on demand with simple cache
  const loadFullPokemon = useCallback(async (id) => {
    if (cache.current.has(id)) {
      setSelectedPokemon(cache.current.get(id));
      return;
    }
    try {
      setLoading(true);
      const res = await AxiosWithoutToken().get(`/pokemon/${id}`);
      const speciesRes = await AxiosWithoutToken().get(`/pokemon-species/${id}/`).then(r => r.data);
      const adapted = adaptPokemonData(res.data, speciesRes);
      cache.current.set(id, adapted);
      setSelectedPokemon(adapted);
    } catch (err) {
      console.error('Error loading full pokemon:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // legacy interface: keep compatibility but delegate to loadFullPokemon
  async function fetchPokemonSpeciesData(pokemon) {
    await loadFullPokemon(pokemon.id);
  }

  function adaptPokemonData(pokemon, speciesData = null) {
    const statsMap = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed',
    };

    const stats = {};
    let total = 0;
    pokemon.stats.forEach((s) => {
      const label = statsMap[s.stat.name] || s.stat.name;
      stats[label] = s.base_stat;
      total += s.base_stat;
    });
    stats['Total'] = total;

    const genus = speciesData?.genera.find((g) => g.language.name === 'en')?.genus || pokemon.name;
    const eggGroups = speciesData?.egg_groups.map((g) => g.name) || ['?'];
    const catchRate = speciesData?.capture_rate || '?';
    const baseFriendship = speciesData?.base_happiness || '?';
    const growthRate = speciesData?.growth_rate.name.replace('-', ' ') || '?';
    const genderRate = speciesData?.gender_rate;
    const genderText =
      genderRate === -1
        ? 'Genderless'
        : genderRate === 8
        ? '100% female'
        : genderRate === 0
        ? '100% male'
        : `${(8 - genderRate) * 12.5}% male, ${genderRate * 12.5}% female`;

    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
      types: pokemon.types.map((t) => t.type.name),
      species: genus,
      height: `${pokemon.height / 10} m`,
      weight: `${pokemon.weight / 10} kg`,
      abilities: pokemon.abilities.map((a) => a.ability.name),
      stats: stats,
      training: {
        'Base Exp.': pokemon.base_experience,
        'Catch rate': catchRate,
        Friendship: baseFriendship,
        'Growth Rate': growthRate,
      },
      breeding: {
        egg_groups: eggGroups,
        gender: genderText,
        egg_cycles: speciesData?.hatch_counter || '?',
      },
    };
  }

  const query = (searchQuery || "").toString().trim();

  const [remoteResult, setRemoteResult] = useState(null);
  const [searchingRemote, setSearchingRemote] = useState(false);

  // When the query is not found in the currently loaded pages, try fetching it directly
  useEffect(() => {
    let cancelled = false;
    const q = (query || "").replace(/^#/, "");
    if (!q) {
      setRemoteResult(null);
      setSearchingRemote(false);
      return;
    }

    const isNumber = /^\d+$/.test(q);

    // If the item is already in the loaded list, don't perform a remote fetch
    if (isNumber) {
      const id = Number(q);
      if (pokemons.some(p => p.id === id)) {
        setRemoteResult(null);
        setSearchingRemote(false);
        return;
      }
    } else {
      if (pokemons.some(p => p.name.toLowerCase().includes(q.toLowerCase()))) {
        setRemoteResult(null);
        setSearchingRemote(false);
        return;
      }
    }

    setSearchingRemote(true);
    const fetchRemote = async () => {
      try {
        const res = await AxiosWithoutToken().get(`/pokemon/${q}`);
        if (cancelled) return;
        const data = res.data;
        const id = data.id;
        const sprite = data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default || getSpriteUrl(id);
        const adapted = { id, name: data.name, url: `/pokemon/${id}`, sprite, poke_types: data.types || [] };
        setRemoteResult(adapted);
      } catch (err) {
        if (cancelled) return;
        // not found or error — mark as not found so list can be empty
        setRemoteResult({ notFound: true });
      } finally {
        if (!cancelled) setSearchingRemote(false);
      }
    };

    fetchRemote();

    return () => { cancelled = true; };
  }, [query, pokemons]);

  const filtered = (() => {
    if (!query) return pokemons;
    else if (remoteResult && !remoteResult.notFound) return [remoteResult];
    const q = query.replace(/^#/, "");
    const isNumber = /^\d+$/.test(q);
    if (isNumber) return pokemons.filter(p => p.id === Number(q));
    return pokemons.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  })();

  return (
    <>
      <div className="pokemonContainerOverlay">
        <main className="pokemonContainer">
          {loading ? (
            <div className="loading">Carregando Pokémons...</div>
          ) : filtered.length === 0 ? (
            <div className="loading">Nenhum Pokémon encontrado.</div>
          ) : searchingRemote ?
              (
              <PokemonCard
                pokemon={remoteResult}
              />
              )  
            :
            (
            filtered.map((pokemon) => (
              <div key={`${pokemon.id}-${pokemon.name}`} onClick={(e) => { e.preventDefault(); loadFullPokemon(pokemon.id); }} style={{ cursor: 'pointer' }}>
                <PokemonCard
                  pokemon={{ ...pokemon, poke_types: pokemon.poke_types || pokemon.types || [] }}
                  onAddToTeam={addToTeam}
                  isInTeam={team.some(t => t.id === pokemon.id)}
                />
              </div>
            ))
          )
          }
          <div ref={loaderRef} style={{ height: 1 }} />
        </main>
      </div>

      {selectedPokemon && <PokemonInfo pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}

      <footer />
    </>
  );
}

export default Home;
