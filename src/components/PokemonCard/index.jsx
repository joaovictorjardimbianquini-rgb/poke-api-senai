import "./styles/pokemoncard.modules.css"

const PokemonCard = ({ pokemon }) => {
    
  return (
    <nav className={`${pokemon.tipo[0].type.name} pokemonCard` } >
      <img src={pokemon.imagem} alt={pokemon.nome} />
      <h3>{pokemon.nome}</h3>
      {pokemon.tipo.map( t => (<p>{t.type.name}</p>))}
    </nav>  
  );
};

export default PokemonCard
