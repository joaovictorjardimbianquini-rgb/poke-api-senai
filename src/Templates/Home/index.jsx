import React from 'react';
import Header from '../../components/Header';
import Pesquisa from '../../components/Pesquisa';
import PokemonCard from '../../components/PokemonCard';
import PokemonInfo from '../../components/PokemonInfo';
import  "./styles/home.modules.css"

function Home() {
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    async function fetchPokemonSpeciesData(pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
            const speciesData = await response.json();
            
            // Adaptando os dados para incluir informações de breeding e training reais
            const adapted = adaptPokemonData(pokemon, speciesData);
            setSelectedPokemon(adapted);
        } catch (error) {
            console.error("Erro ao buscar detalhes da espécie:", error);
            // Se falhar o species, mostra o básico
            setSelectedPokemon(adaptPokemonData(pokemon));
        }
    }

    function adaptPokemonData(pokemon, speciesData = null) {
        // Mapeando stats da API para o formato do nosso componente
        const statsMap = {
            hp: "HP",
            attack: "Attack",
            defense: "Defense",
            "special-attack": "Sp. Atk",
            "special-defense": "Sp. Def",
            speed: "Speed"
        };

        const stats = {};
        let total = 0;
        pokemon.stats.forEach(s => {
            const label = statsMap[s.stat.name] || s.stat.name;
            stats[label] = s.base_stat;
            total += s.base_stat;
        });
        stats["Total"] = total;

        // Dados de espécie (Breeding e Training)
        const genus = speciesData?.genera.find(g => g.language.name === "en")?.genus || pokemon.name;
        const eggGroups = speciesData?.egg_groups.map(g => g.name) || ["?"];
        const catchRate = speciesData?.capture_rate || "?";
        const baseFriendship = speciesData?.base_happiness || "?";
        const growthRate = speciesData?.growth_rate.name.replace("-", " ") || "?";
        const genderRate = speciesData?.gender_rate;
        const genderText = genderRate === -1 ? "Genderless" : 
                           genderRate === 8 ? "100% female" :
                           genderRate === 0 ? "100% male" :
                           `${(8 - genderRate) * 12.5}% male, ${genderRate * 12.5}% female`;

        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default,
            types: pokemon.types.map(t => t.type.name),
            species: genus,
            height: `${pokemon.height / 10} m`,
            weight: `${pokemon.weight / 10} kg`,
            abilities: pokemon.abilities.map(a => a.ability.name),
            stats: stats,
            training: { 
                "Base Exp.": pokemon.base_experience,
                "Catch rate": catchRate,
                "Friendship": baseFriendship,
                "Growth Rate": growthRate
            },
            breeding: { 
                egg_groups: eggGroups, 
                gender: genderText, 
                egg_cycles: speciesData?.hatch_counter || "?" 
            },
        };
    }

    React.useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // Buscando os primeiros 50 pokemons
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
                const data = await response.json();
                
                // Buscando os detalhes de cada um
                const pokemonDetails = await Promise.all(
                    data.results.map(async (res) => {
                        const pokeRes = await fetch(res.url);
                        return await pokeRes.json();
                    })
                );
                
                setPokemons(pokemonDetails);
            } catch (error) {
                console.error("Erro ao buscar pokémons:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return <div style={{color: "white", textAlign: "center", padding: "50px"}}>Carregando Pokémons...</div>;
    }

    return (
        <>
            <Header title="PokeDex" subtitle="Explore todos os Pokemon" children={<Pesquisa/>}/>
            <div className='pokemonContainerOverlay'>
                <main className="pokemonContainer">
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.id} onClick={() => fetchPokemonSpeciesData(pokemon)} style={{cursor: "pointer"}}>
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))}
                </main>
            </div>
            {selectedPokemon && (
                <PokemonInfo pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
            )}
            <footer></footer>
        </>
    );
}

export default Home;

