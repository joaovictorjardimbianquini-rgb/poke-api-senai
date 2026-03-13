import "./styles/index.modules.css"


//Tela estática só pra ter algo na tela do tambuilder. As funções o Igor disse queria passar com todo mundo junto então vou deixar pra ser resolvido em sala
function TeamBuilder() {

  return (
    <div className="teamBuilder">

      <h2>Time 1</h2>

      <div className="teamGrid">

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"/>
          <p>Charizard</p>
        </div>

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"/>
          <p>Pikachu</p>
        </div>

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"/>
          <p>Blastoise</p>
        </div>

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"/>
          <p>Venusaur</p>
        </div>

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"/>
          <p>Gengar</p>
        </div>

        <div className="slot">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png"/>
          <p>Gyarados</p>
        </div>

      </div>

    </div>
  );
};

export default TeamBuilder;