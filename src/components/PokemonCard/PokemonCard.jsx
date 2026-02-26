const PokemonCard = ({ pokemon, onClick }) => {
  const mainType = pokemon.types[0].type.name;
  
  return (
    <div 
      className={`pokemon-card card-bg-${mainType}`}
      onClick={onClick}
    >
      <div className="image-container">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name} 
        />
      </div>
      <div className="pokemon-info">
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="type-badges">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge type-${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
