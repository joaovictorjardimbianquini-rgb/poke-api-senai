import React from "react";
import "./styles/pokemoninfo.modules.css";

const Section = ({ title, children }) => (
  <div className="info-section">
    <h3>{title}</h3>
    <ul>{children}</ul>
  </div>
);

const Row = ({ label, value }) => (
  <li><b>{label}:</b> {value}</li>
);

const PokemonInfo = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <header className="info-header">
          <img src={pokemon.image} alt={pokemon.name} className="info-img" />
          <div className="info-title">
            <h2>{pokemon.name} <small>#{pokemon.id.toString().padStart(4, "0")}</small></h2>
            <div className="types">
              {pokemon.types.map(type => (
                <span key={type} className={`badge ${type}`}>{type}</span>
              ))}
            </div>
          </div>
        </header>

        <div className="info-grid">
          <Section title="Pokédex data">
            <Row label="Species" value={pokemon.species} />
            <Row label="Height" value={pokemon.height} />
            <Row label="Weight" value={pokemon.weight} />
            <Row label="Abilities" value={pokemon.abilities.join(", ")} />
          </Section>

          <Section title="Base stats">
            {Object.entries(pokemon.stats).map(([key, val]) => (
              <Row key={key} label={key.replace("_", " ")} value={val} />
            ))}
          </Section>

          <Section title="Training">
            {Object.entries(pokemon.training).map(([key, val]) => (
              <Row key={key} label={key.replace("_", " ")} value={val} />
            ))}
          </Section>

          <Section title="Breeding">
            <Row label="Groups" value={pokemon.breeding.egg_groups.join(", ")} />
            <Row label="Gender" value={pokemon.breeding.gender} />
            <Row label="Cycles" value={pokemon.breeding.egg_cycles} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
