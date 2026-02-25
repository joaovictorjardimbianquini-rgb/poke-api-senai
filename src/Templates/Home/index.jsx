import Header from '../../components/Header';
import Pesquisa from '../../components/Pesquisa';
import PokemonCard from '../../components/PokemonCard';

function Home() {
    const fakePokemon = {
        id: 25,
        name: "pikachu",
        poke_types: [
            { type: { name: "electric" } }
        ],
        sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            other: {
                official_artwork: {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                }
            }
        }

    };

    return(
        <>
            <Header title="Pokemon" subtitle="sub" children={<Pesquisa/>}/>
            <main>
                <PokemonCard
                    pokemon={{
                        nome: fakePokemon.name,
                        imagem: fakePokemon.sprites.front_default,
                        tipo: fakePokemon.poke_types
                    }}
                />
            </main>
            <footer>Rodapé</footer>
        </>
    );
}

export default Home;