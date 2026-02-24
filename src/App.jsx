import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const results = response.data.results;

        const detailedPokemon = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );

        setPokemonList(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleCardClick = (pokemon) => {
    console.log("Selected Pokemon:", pokemon.name);
    // Aqui no futuro será implementada a exibição de informações detalhadas
  };

  return (
    <div className="app">
      <main className="container">
        {loading ? (
          <div className="loading">Carregando Pokémon...</div>
        ) : (
          <div className="pokemon-grid">
            {pokemonList.map((pokemon) => (
              <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
                onClick={() => handleCardClick(pokemon)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
