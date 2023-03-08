import React, { useState } from 'react';
import styles from './index.module.scss';

const PokemonSearchForm = ({ filterPokemonList }) => {
  const [types, setTypes] = useState(['any']);
  const [generations, setGenerations] = useState(['any']);
  const [searchType, setSearchType] = useState('and');
  const [search, setSearch] = useState('');

  // whenever the form is submitted get all the states of the 
  // inputs and send that over to the parent component to filter the pokedex
  const handleSubmit = e => {
    e.preventDefault();
    const filters = { types, searchType, search, generations };
    filterPokemonList(filters);
  };

  // called when reset button is clicked
  // sets all the states of the inputs to their default values
  const resetFilters = e => {
    setTypes(['any']);
    setGenerations(['any']);
    setSearchType('and');
    setSearch('');
  };

  return (
    <form id="search-form" className="pure-form pure-form-stacked" onSubmit={e => handleSubmit(e)}>
      <div>
        <label className="bold" htmlFor="type-select">
          Type
        </label>
        <select
          multiple={true}
          value={types}
          onChange={e => setTypes(Array.from(e.target.selectedOptions, option => option.value))}
          id="type-select"
          style={{ width: '150px', height: '120px' }}>
          <option value="any">Any</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <div>
        <p className="bold">Search Options</p>
        <label htmlFor="andRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="andRadio"
            value="and"
            checked={searchType === 'and'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          AND
        </label>
        <label htmlFor="orRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="orRadio"
            value="or"
            checked={searchType === 'or'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          OR
        </label>
        <label htmlFor="notRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="notRadio"
            value="not"
            checked={searchType === 'not'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          NOT
        </label>
        <label htmlFor="onlyRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="onlyRadio"
            value="only"
            checked={searchType === 'only'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          ONLY
        </label>
      </div>
      <div id="generation">
        <label htmlFor="generationSelect" className="bold">
          Pokemon Generation
        </label>
        <select
          style={{ width: '150px' }}
          multiple={true}
          value={generations}
          onChange={e =>
            setGenerations(Array.from(e.target.selectedOptions, option => option.value))
          }
          id="generationSelect">
          <option value="any">Any</option>
          <option value="1,151">Gen 1</option>
          <option value="152,251">Gen 2</option>
          <option value="252,386">Gen 3</option>
          <option value="387,494">Gen 4</option>
          <option value="495,649">Gen 5</option>
          <option value="650,721">Gen 6</option>
        </select>
      </div>
      <div style={{ display: 'flex', gridColumn: '1 / span 2' }}>
        <label className="bold" htmlFor="search-bar">
          Pokemon Name{' '}
          <input
            type="search"
            id="search-bar"
            placeholder="Enter a pokemon"
            style={{ width: '220px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </label>
        <button className={`pure-button pure-button-primary ${styles.button}`}>Search</button>
        <button
          className={`pure-button button-danger ${styles.button}`}
          onClick={e => resetFilters(e)}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default PokemonSearchForm;
