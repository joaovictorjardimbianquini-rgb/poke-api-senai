import Header from '../../components/Header';
import Pesquisa from '../../components/Pesquisa';
import PokemonCard from '../../components/PokemonCard';
import  "./styles/home.modules.css"

function Home() {

//fakemon charizard pra usar de teste
    const fakePokemon = {
    id: 6,
    name: "charizard",
    poke_types: [
        { type: { name: "fire" } },
        { type: { name: "flying" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
            }
        }
    }
};

//Criei vários fakemon (criei o primeiro na IA e fui mudando)
const fakePokemonVenusaur = {
    id: 3,
    name: "venusaur",
    poke_types: [
        { type: { name: "grass" } },
        { type: { name: "poison" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
            }
        }
    }
};

const fakePokemonButterfree = {
    id: 12,
    name: "butterfree",
    poke_types: [
        { type: { name: "bug" } },
        { type: { name: "flying" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png"
            }
        }
    }
};

const fakePokemonNidoking = {
    id: 34,
    name: "nidoking",
    poke_types: [
        { type: { name: "poison" } },
        { type: { name: "ground" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png"
            }
        }
    }
};

const fakePokemonGengar = {
    id: 94,
    name: "gengar",
    poke_types: [
        { type: { name: "ghost" } },
        { type: { name: "poison" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
            }
        }
    }
};

const fakePokemonOshawott = {
    id: 501,
    name: "oshawott",
    poke_types: [
        { type: { name: "water" } }
    ],
    sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/501.png",
        other: {
            official_artwork: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png"
            }
        }
    }
};


    return(
        <>   
            <Header title="PokeDex" subtitle="Explore todos os Pokemon" children={<Pesquisa/>}/>
            <div className='pokemonContainerOverlay'>
            <main className="pokemonContainer">
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />
                <PokemonCard pokemon={fakePokemon} />
                <PokemonCard pokemon={fakePokemonVenusaur} />
                <PokemonCard pokemon={fakePokemonButterfree} />
                <PokemonCard pokemon={fakePokemonNidoking} />
                <PokemonCard pokemon={fakePokemonGengar} />
                <PokemonCard pokemon={fakePokemonOshawott} />

            </main>
            </div>
            
            <footer></footer>
        </>
    );
}

export default Home;