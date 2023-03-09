import React from "react";
import { TYPE_COLORS } from "../../js/shared";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: relative;
  cursor: ${(props) => (props.isHover ? "pointer" : "default")};
  border: 2px solid black;
  transition: transform 0.2s;
  height: fit-content;
  user-select: none;

  ${(props) =>
    props.isHover &&
    css`
      &:hover {
        transform: scale(1.1);
      }
    `}
`;

const PokemonName = styled.p`
  padding: 7px 0;
  background-color: black;
  color: white;
  text-transform: capitalize;
  text-align: center;
`;

const Lock = styled(FontAwesomeIcon)`
  font-size: 2em;
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
`;

// function that allows the pokemon container's background to represent it's typing
const getBackgroundStyle = (pokemon) => {
  if (!pokemon) return;

  const types = pokemon.types;

  if (types.length === 1) {
    return { backgroundColor: `${TYPE_COLORS[types[0]]}` };
  } else {
    return {
      background: `linear-gradient(90deg, ${TYPE_COLORS[types[0]]} 50%,
       ${TYPE_COLORS[types[1]]} 50%)`,
    };
  }
};

const PokemonContainer = ({ pokemon }) => {
  return (
    <Container style={getBackgroundStyle(pokemon)}>
      <img
        src={pokemon.sprite}
        alt={`sprite of ${pokemon.name}`}
        className="pure-img"
      />
      <PokemonName className="pure-u-1">{pokemon.name}</PokemonName>
    </Container>
  );
};

const AddPokemonContainer = ({ pokemon, setTeamSlot }) => {
  return (
    <Container
      isHover={true}
      onClick={() => setTeamSlot(pokemon)}
      style={getBackgroundStyle(pokemon)}>
      <img src={pokemon.sprite} alt={`sprite of ${pokemon.name}`} className="pure-img" />
      <PokemonName className="pure-u-1">{pokemon.name}</PokemonName>
    </Container>
  );
};

const RandomPokemonContainer = ({ pokemon, isLocked, index, toggleLock }) => {
  return (
    <Container style={getBackgroundStyle(pokemon)}>
      <Lock
        icon={isLocked ? faLock : faUnlock}
        onClick={() => toggleLock(index)}
      />
      <img
        src={pokemon.sprite}
        alt={`sprite of ${pokemon.name}`}
        className="pure-img"
      />
      <PokemonName className="pure-u-1">{pokemon.name}</PokemonName>
    </Container>
  );
};

export default PokemonContainer;
export { AddPokemonContainer, RandomPokemonContainer };
