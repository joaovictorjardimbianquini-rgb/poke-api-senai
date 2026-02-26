import Header from "./components/topopagina";
import { SearchBar } from "./components/pesquisa";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import "./App.css"

export default function App() {

  /* isso aqui pode excluir depois, é só pra testar até integrar a API */ const fakePokemon = {
id: 25,
name: "pikachu",
types: [
  { type: { name: "electric" } }
],
sprites: {
  front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  other: {
    "official-artwork": {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    }
  }
}

};
  return (


    <div>
      <Header
        title="Pokédex"
        subtitle="Busque e explore todos os Pokémon"
      >
        <SearchBar />
      </Header>

      <main>
        <div className="pokemon-grid">
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        <PokemonCard pokemon={fakePokemon} />
        </div>
      </main>
    </div>
  );
}