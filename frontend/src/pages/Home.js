import PokemonSearch from '../components/PokemonSearch';

const Home = () => {
    return (
        <div>
            <h1>Pokémon Picker</h1>
            <PokemonSearch name="Ash" numberOfPokemons={5} />
        </div>
    );
};

export default Home;