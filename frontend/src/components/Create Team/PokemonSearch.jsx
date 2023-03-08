import { useState } from "react";

const PokemonSearchForm = ({ filterPokemonList }) => {
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [searchType, setSearchType] = useState("and");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const filters = { types, searchType, searchTerm, generations };
    filterPokemonList(filters);
  };

  const resetSearchFilters = (event) => {
    setTypes([]);
    setGenerations([]);
    setSearchType("name");
    setSearchTerm("");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="search-form">
      <div>
        <label className="bold">Type:</label>
        <select
          multiple={true}
          value={types}
          onChange={(event) =>
            setTypes(
              Array.from(event.target.selectedOptions, (item) => item.value)
            )
          }
          id="type-select"
        >
          <option value="any">Any</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <div>
        <p className="bold">Search Options</p>
        <label className="radio">
          <input
            type="radio"
            name="searchOptions"
            id="radio-and"
            value="and"
            checked={searchType === "and"}
            onChange={(event) => setSearchType(event.target.value)}
          />{" "}
          AND
        </label>
        <label className="radio">
          <input
            type="radio"
            name="searchOptions"
            id="radio-or"
            value="or"
            checked={searchType === "or"}
            onChange={(event) => setSearchType(event.target.value)}
          />{" "}
          OR
        </label>
        <label className="radio">
          <input
            type="radio"
            name="searchOptions"
            id="radio-not"
            value="not"
            checked={searchType === "not"}
            onChange={(event) => setSearchType(event.target.value)}
          />{" "}
          NOT
        </label>
        <label className="radio">
          <input
            type="radio"
            name="searchOptions"
            id="radio-only"
            value="only"
            checked={searchType === "only"}
            onChange={(event) => setSearchType(event.target.value)}
          />{" "}
          ONLY
        </label>
      </div>
      <div id="generation">
        <label className="bold">Generation:</label>
        <select
          multiple={true}
          value={generations}
          onChange={(event) =>
            setGenerations(
              Array.from(event.target.selectedOptions, (item) => item.value)
            )
          }
          id="generation-select"
        >
          <option value="any">Any</option>
          <option value="gen1">Gen 1</option>
          <option value="gen2">Gen 2</option>
          <option value="gen3">Gen 3</option>
          <option value="gen4">Gen 4</option>
          <option value="gen5">Gen 5</option>
          <option value="gen6">Gen 6</option>
        </select>
      </div>
      <div>
        <label className="bold">
          Pokemon Name{" "}
          <input
            type="search"
            id="search-bar"
            placeholder="Enter a pokemon"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <button>Search</button>
        <button onClick={(event) => resetSearchFilters(event)}>Reset</button>
      </div>
    </form>
  );
};

export default PokemonSearchForm;
