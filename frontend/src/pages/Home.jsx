import PokemonSearch from '../components/PokemonSearch';


const Home = () => {
    return (
        <div>
            <PokemonSearch name="Ash" numberOfPokemons={5} />
        </div>
    );
};

export default Home;