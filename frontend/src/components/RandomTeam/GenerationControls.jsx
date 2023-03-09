import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './index.module.scss';

const RadioLabel = styled.label`
  padding-right: 20px;
`;

const GenerateButton = styled.button`
  margin-left: 10px;
`;

const GenerationControls = ({ generate, isLoading, setIsLoading }) => {
  const [generationType, setGenerationType] = useState('random-any');
  const [selectedType, setSelectedType] = useState('normal');

  // gets all the generating options and sends it to the parent component to generate pokemon
  const handleSubmit = e => {
    e.preventDefault();
    const generationOptions = { generationType, selectedType };
    setIsLoading(true);
    generate(generationOptions);
  };

  return (
    <form className="pure-form pure-u-1" onSubmit={e => handleSubmit(e)}>
      <fieldset>
        <legend className={styles.legend}>Generation Options</legend>
        <RadioLabel htmlFor="random-any">
          <input
            type="radio"
            name="generation-option"
            id="random-any"
            value="random-any"
            checked={generationType === 'random-any'}
            onChange={e => setGenerationType(e.target.value)}
          />{' '}
          Any
        </RadioLabel>
        <RadioLabel htmlFor="random-feo">
          <input
            type="radio"
            name="generation-option"
            id="random-feo"
            value="random-feo"
            checked={generationType === 'random-feo'}
            onChange={e => setGenerationType(e.target.value)}
          />{' '}
          Fully Evolved Only
        </RadioLabel>
        <RadioLabel htmlFor="random-type">
          <input
            type="radio"
            name="generation-option"
            id="random-type"
            value="random-type"
            checked={generationType === 'random-type'}
            onChange={e => setGenerationType(e.target.value)}
          />{' '}
          Type
        </RadioLabel>
        <select
          disabled={generationType !== 'random-type'}
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}>
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
        <GenerateButton disabled={isLoading} className="pure-button pure-button-primary">
          Generate
        </GenerateButton>
      </fieldset>
    </form>
  );
};

export default GenerationControls;
