import "./styles/pokemoncard.modules.css";

//criei essa porra aqui pq se quisesse fazer o gradiente pelo css ia ter que ser na mão
//aliás to deixando tudo em inglês porque imagino que na API também esteja

const typeColors = {
  grass: "#78C850",
  poison: "#A040A0",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  dark: "#705848",
  flying: "#A890F0",
};

const PokemonCard = ({ pokemon }) => {

  const types = pokemon.types.map(t => t.type.name);

  const color1 = typeColors[types[0]];
  const color2 = types[1] ? typeColors[types[1]] : null;

  //pra fazer um gradiente no BG se o pokemon tiver mais de um tipo
  const backgroundStyle = color2 ? {background: `linear-gradient(135deg, ${color1}, ${color2})`} : {backgroundColor: color1};

  return (
    <article className="pokemonCard" style={backgroundStyle}>
      
      <img src= {pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default} /> 
      <h3>{pokemon.name}</h3>

      <div className="pokemonBadges">
        
      {types.map((type, index) => (
        <span key={index} className="badge" style={{ backgroundColor: typeColors[type] }}> 
          {type}
        </span>
      ))}
      </div>

    </article>
  );
};

export default PokemonCard;