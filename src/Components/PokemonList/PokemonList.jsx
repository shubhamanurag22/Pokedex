import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    // const [PokemonList, setPokemonList] = useState([]);
    // const [IsLoading, setIsLoading] = useState(true);

    // const [pokedex_url, setPokedex_url] = useState('https://pokeapi.co/api/v2/pokemon/');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [ pokemonListState, setPokemonListState] = useState({
        PokemonList: [],
        IsLoading: true,
        pokedex_url: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl:'',
        prevUrl:''
    });

    async function downloadPokemons(){

        // setIsLoading(true);

        setPokemonListState((state) => ({
            ...state, 
            IsLoading: true
        }));

        const response = await axios.get(pokemonListState.pokedex_url); // this downloads list of 20 pokemons

        const pokemonResults = response.data.results; // we get the array of pokemons from result
        console.log(response.data);

        
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));

        // iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promises array to axios.all
        const pokemonData = await axios.all(pokemonResultsPromise); // array of 20 pokemon detailed data
        console.log(pokemonData);


        // now iterating on the data of each pokemon, and extract id, name, image, types
        const pokeListResults = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.dream_world.front_shiny,
                types: pokemon.types
            }
        });
        console.log(pokeListResults);

        // setPokemonList(pokeListResults);
        // setIsLoading(false);

        setPokemonListState((state) => ({
            ...state,
            pokemonList : pokeListResults,
            IsLoading: false
        }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedex_url]);
    // dependency array that means if any changes has been occured on that particular element then only the effect will be called
    // helps to track particular set of variables

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div className="pokemon-wrapper">
                    {(pokemonListState.IsLoading) ? 'Loading...' : 
                        pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                    }
                </div>
                <div className="controls">
                    <button disabled={pokemonListState.prevUrl == null} onClick={() => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({...pokemonListState, pokedex_url: urlToSet});
                    }}>Previous</button>
                    <button disabled={pokemonListState.nextUrl == null} onClick={() => {
                        const urlToSet = pokemonListState.nextUrl; 
                        setPokemonListState({...pokemonListState, pokedex_url: urlToSet});
                    }}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList;