import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import { SearchBar } from "./assets/Components/pesquisa";
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
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
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const searchLower = search.toLowerCase();
    return (
      pokemon.name.toLowerCase().startsWith(searchLower) ||
      pokemon.id.toString().startsWith(searchLower)
    );
  });

  return (
    <div className="app">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
      />

      <main className="container">
        {loading ? (
          <div className="loading">Carregando Pokémons...</div>
        ) : (
          <div className="pokemon-grid">
            {filteredPokemon.map((pokemon) => (
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
