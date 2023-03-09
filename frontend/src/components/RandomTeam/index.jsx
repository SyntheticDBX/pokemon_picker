import React, { useState } from 'react';
import styled from 'styled-components';
import { useSnackbar } from 'react-simple-snackbar';
import { useLocation } from 'react-router-dom';
import GenerationControls from './GenerationControls';
import SaveTeamForm from '../Shared/SaveTeamForm';
import { TeamViewRandom } from '../Shared/TeamView';
import * as shared from '../../js/shared';
import Pokemon from '../../js/classes/Pokemon';

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

// get a random number up to a maximum number
const getRand = max => {
  return Math.floor(Math.random() * max);
};

// get a random number between two numbers
const getRandBetween = (min, max) => {
  return Math.floor(Math.random() * max - min + 1) + min;
};

const RandomTeam = () => {
  // constants to be used throughout the component
  const TEAM_SIZE = 6;
  const MAX_POKEMON = 898;
  const MAX_EVOLVED = 475;
  const MISSING_CHAINS = [210, 222, 225, 226, 227, 231, 238, 251];
  // URL for the pokeapi to be used throughout the component
  const BASE_URL = 'https://pokeapi.co/api/v2';

  const location = useLocation();

  const [team, setTeam] = useState(
    location.state ? location.state.team : new Array(TEAM_SIZE).fill(new Pokemon())
  );
  const [lockedSlots, setLockedSlots] = useState(new Array(TEAM_SIZE).fill(false));
  const [isLoading, setIsLoading] = useState(false);

  const [openSnackbar] = useSnackbar();

  // toggles whether the lock is locked or unlocked for a given index
  const toggleLock = index => {
    const copy = [...lockedSlots];
    copy[index] = !copy[index];
    setLockedSlots(copy);
  };

  // gets the id from the pokeapi's species url
  const getIdFromSpeciesUrl = url => {
    const match = url.match(/pokemon-species\/(\d+)/);
    return match[1];
  };

  // gets the id from the pokeapi's pokemon url
  const getIdFromPokemonUrl = url => {
    const match = url.match(/pokemon\/(\d+)/);
    return match[1];
  };

  // generate pokemon given the generation parameters
  const generate = async generationOptions => {
    const unlockedSlots = [];
    for (let i = 0; i < TEAM_SIZE; i++) {
      if (!lockedSlots[i]) {
        unlockedSlots.push(i);
      }
    }

    let pokemon = [];

    switch (generationOptions.generationType) {
      case 'random-any':
        pokemon = await generateAnyTeam(unlockedSlots);
        break;
      case 'random-feo':
        pokemon = await generateFeoTeam(unlockedSlots);
        break;
      case 'random-type':
        pokemon = await generateTypeTeam(unlockedSlots, generationOptions.selectedType);
        break;
      default:
        console.error('Generation type not selected');
    }

    const newTeam = [...team];
    unlockedSlots.forEach((slot, index) => {
      newTeam[slot] = pokemon[index];
    });

    setTeam(newTeam);
    setIsLoading(false);
  };

  // generates a team of any type of pokemon
  const generateAnyTeam = async unlockedSlots => {
    console.log('Generating any team');

    const pokemon = await Promise.all(
      unlockedSlots.map(async slot => {
        const randId = getRandBetween(1, MAX_POKEMON);
        return Pokemon.fetchById(randId);
      })
    );

    return pokemon;
  };

  // generates a team with only fully evolved pokemon
  const generateFeoTeam = async unlockedSlots => {
    console.log('Generating feo team');

    const pokemon = await Promise.all(
      unlockedSlots.map(async slot => {
        let randId;
        do {
          randId = getRandBetween(1, MAX_EVOLVED);
        } while (MISSING_CHAINS.includes(randId));
        const url = `${BASE_URL}/evolution-chain/${randId}`;
        const res = await fetch(url);
        const data = await res.json();
        const chain = data.chain;
        let id = getIdFromSpeciesUrl(chain.species.url);
        let evolves_to = chain.evolves_to;
        while (evolves_to.length > 0) {
          const randNum = getRand(evolves_to.length);
          id = getIdFromSpeciesUrl(evolves_to[randNum].species.url);
          evolves_to = evolves_to[randNum].evolves_to;
        }
        return Pokemon.fetchById(id);
      })
    );

    return pokemon;
  };

  // generates a team of pokemon for a specific type
  const generateTypeTeam = async (unlockedSlots, type) => {
    console.log('Generating type team of ' + type);

    const url = `${BASE_URL}/type/${type}`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemonList = data.pokemon;
    const pokemon = await Promise.all(
      unlockedSlots.map(async slot => {
        let id;
        do {
          const randIndex = getRand(pokemonList.length);
          const pokeUrl = pokemonList[randIndex].pokemon.url;
          id = getIdFromPokemonUrl(pokeUrl);
        } while (id > MAX_POKEMON);
        return Pokemon.fetchById(id);
      })
    );

    return pokemon;
  };

  // saves a team of pokemon to the server
  const saveTeam = async teamName => {
    console.log('Saving team');
    // get team with filtered empty slots
    const filteredTeam = team.filter(pokemon => !pokemon.isDefault());

    // check if team has any slots
    if (filteredTeam.length === 0) {
      return openSnackbar('The team needs at least one Pokemon.');
    }

    const response = await shared.saveTeam(teamName, filteredTeam);
    if (response) {
      openSnackbar(response);
    }
  };

  return (
    <div className={`pure-g padded-container`}>
      <div className={`pure-u-1 yellow-box`}>
        <ControlsContainer>
          <GenerationControls
            generate={generate}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <SaveTeamForm hideLegend={true} saveTeam={saveTeam} />
        </ControlsContainer>
      </div>

      <TeamViewRandom
        team={team}
        isLoading={isLoading}
        lockedSlots={lockedSlots}
        toggleLock={toggleLock}
      />
    </div>
  );
};

export default RandomTeam;
