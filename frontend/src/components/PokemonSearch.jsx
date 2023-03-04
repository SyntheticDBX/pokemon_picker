import React, { useState } from "react";
import "./PokemonSearch.css";

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();
    const formattedSearchTerm = searchTerm.toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${formattedSearchTerm}`
      );
      if (!response.ok) {
        // check if the response is not successful
        throw new Error("Pokemon not found");
      }
      const data = await response.json();
      setPokemon(data);
      setError(null); // reset error state if the request was successful
    } catch (error) {
      console.error(error);
      setPokemon(null);
      setError(error.message); // set the error message state if the request fails
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="search-form">
        <label>
          Search for a pokemon:
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {pokemon && (
        <div className="pokemon-container">
          <h2>
            {pokemon &&
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default PokemonSearch;
