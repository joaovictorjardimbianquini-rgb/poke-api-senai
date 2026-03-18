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

const PokemonCard = ({ pokemon, onAddToTeam, isInTeam = false }) => {

  const rawTypes = (pokemon.poke_types ?? pokemon.types) || [];
  const typesArr = rawTypes.map(t => t && (t.type ? t.type.name : t)).filter(Boolean);

  const color1 = typeColors[typesArr[0]];
  const color2 = typesArr[1] ? typeColors[typesArr[1]] : null;

  // pra fazer um gradiente no BG se o pokemon tiver mais de um tipo
  const backgroundStyle = color2 ? { background: `linear-gradient(135deg, ${color1}, ${color2})` } : { backgroundColor: color1 };

  const imgSrc = pokemon.sprite || pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default || '';
  // color helpers
  function hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return { r: 107, g: 114, b: 128 }; // default gray
    const h = hex.replace('#','');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return { r: 107, g: 114, b: 128 };
    const bigint = parseInt(h, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }
  function rgbToHex(r,g,b){
    return '#'+[r,g,b].map(x=>{
      const s = Math.max(0,Math.min(255,Math.round(x))).toString(16);
      return s.length===1? '0'+s : s;
    }).join('');
  }
  function lighten(hex, percent){
    const {r,g,b} = hexToRgb(hex);
    return rgbToHex(r + (255 - r) * percent, g + (255 - g) * percent, b + (255 - b) * percent);
  }
  function mixHex(a,b,weight=0.5){
    const A = hexToRgb(a); const B = hexToRgb(b);
    return rgbToHex(A.r*(1-weight)+B.r*weight, A.g*(1-weight)+B.g*weight, A.b*(1-weight)+B.b*weight);
  }
  function getContrastColor(hex){
    const {r,g,b} = hexToRgb(hex);
    const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
    return luminance > 0.6 ? '#101520' : '#ffffff';
  }

  return (
    <article className={`pokemonCard ${isInTeam ? 'added' : ''}`} style={backgroundStyle}>
      {isInTeam && <div className="team-badge">✓</div>}
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
        className={`button-add-pokemon ${isInTeam ? 'added' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (isInTeam) return; // prevent re-adding
          onAddToTeam(pokemon);
        }}
        type="button"
        style={{
          background: (color1 || color2)
            ? (color2 ? `linear-gradient(135deg, ${color1 || '#6B7280'}, ${color2 || '#A78BFA'})` : `linear-gradient(135deg, ${color1 || '#6B7280'}, ${lighten(color1 || '#6B7280',0.32)})`)
            : undefined,
          color: getContrastColor(color2 ? mixHex(color1, color2, 0.45) : (color1 || '#6B7280'))
        }}
      >
        {isInTeam ? 'ADICIONADO ✓' : 'ADICIONAR AO TIME'}
      </button>

    </article>
  );
};

export default PokemonCard;
