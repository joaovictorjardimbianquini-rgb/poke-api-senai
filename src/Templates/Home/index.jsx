import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../../components/PokemonCard';
import './styles/home.modules.css';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
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

        // map to shape expected by existing PokemonCard component
        const mapped = detailedPokemon.map((p) => ({ ...p, poke_types: p.types }));
        setPokemonList(mapped);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <>
      <div className="pokemonContainerOverlay">
        <main className="pokemonContainer">
          {loading ? (
            <div className="loading">Carregando Pokémon...</div>
          ) : (
            pokemonList.map((p) => <PokemonCard key={p.id} pokemon={p} />)
          )}
        </main>
      </div>

      <footer />
    </>
  );
}

export default Home;
