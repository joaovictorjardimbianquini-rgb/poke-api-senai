import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard';
import PokemonInfo from '../../components/PokemonInfo';
import './styles/home.modules.css';

function Home({ searchQuery = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        const results = response.data.results;

        const detailedPokemon = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );

        setPokemons(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  async function fetchPokemonSpeciesData(pokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
      const speciesData = await response.json();

      const adapted = adaptPokemonData(pokemon, speciesData);
      setSelectedPokemon(adapted);
    } catch (error) {
      console.error('Erro ao buscar detalhes da espécie:', error);
      setSelectedPokemon(adaptPokemonData(pokemon));
    }
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

  const filtered = pokemons.filter((p) => {
    if (!query) return true;
    const q = query.replace(/^#/, "");
    const isNumber = /^\d+$/.test(q);
    if (isNumber) return p.id === Number(q);
    return p.name.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <>
      <div className="pokemonContainerOverlay">
        <main className="pokemonContainer">
          {loading ? (
            <div className="loading">Carregando Pokémon...</div>
          ) : (
            filtered.map((pokemon) => (
              <div key={pokemon.id} onClick={() => fetchPokemonSpeciesData(pokemon)} style={{ cursor: 'pointer' }}>
                <PokemonCard pokemon={{ ...pokemon, poke_types: pokemon.types }} />
              </div>
            ))
          )}
        </main>
      </div>

      {selectedPokemon && <PokemonInfo pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}

      <footer />
    </>
  );
}

export default Home;
