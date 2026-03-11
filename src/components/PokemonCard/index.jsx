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

  const typesArr = (pokemon.poke_types ?? pokemon.types) .map(t => t.type ? t.type.name : t);

  const color1 = typeColors[typesArr[0]];
  const color2 = typesArr[1] ? typeColors[typesArr[1]] : null;

  // pra fazer um gradiente no BG se o pokemon tiver mais de um tipo
  const backgroundStyle = color2 ? { background: `linear-gradient(135deg, ${color1}, ${color2})` } : { backgroundColor: color1 };

  const imgSrc = pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default;

  return (
    <article className="pokemonCard" style={backgroundStyle}>
      <div className="fundoTransparente">
        <img src={imgSrc} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
      </div>

      <div className="pokemonBadges">
        {typesArr.map((type, index) => (
          <span key={index} className="badge" style={{ backgroundColor: typeColors[type] }}>
            {type}
          </span>
        ))}
      </div>

      <button
        className="button-add-pokemon"
        onClick={(e) => {
          e.stopPropagation();
          /* Criar a funcionalidade depois */
        }}
        type="button"
      >
        ADICIONAR AO TIME
      </button>

    </article>
  );
};

export default PokemonCard;