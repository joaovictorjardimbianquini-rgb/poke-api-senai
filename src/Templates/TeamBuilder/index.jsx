import "./styles/index.modules.css";

function TeamBuilder({ team, setTeam }) {

  const removeFromTeam = (id) => {
    setTeam(team.filter(p => p.id !== id));
  };

  return (
    <div className="teamBuilder">
      <h2>Time 1</h2>

      <div className="teamGrid">
        {[...Array(6)].map((_, index) => {
          const pokemon = team[index];

          return (
            <div key={index} className="slot">
              {pokemon ? (
                <>
                  <img src={pokemon.sprite} alt={pokemon.name} />
                  <p>{pokemon.name}</p>

                  <button onClick={() => removeFromTeam(pokemon.id)}>
                    Remover
                  </button>
                </>
              ) : (
                <p>Vazio</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamBuilder;