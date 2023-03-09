import React from 'react';
import styled from 'styled-components';
import { TYPE_COLORS } from '../../js/shared';

const TeamSlot = styled.div`
  text-align: center;
`;

const PokemonName = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PokemonType = styled.span`
  text-transform: uppercase;
  color: ${props => (props.isDefault ? 'black' : 'white')};
  font-size: 14px;
  font-weight: 600;
  padding: 4px;
  margin-right: 2px;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 150px;
`;
const PokemonSlot = ({ pokemon, slotNum, removeFromSlot }) => {
  return (
    <TeamSlot
      style={pokemon.isDefault() || { cursor: 'no-drop' }}
      onClick={() => removeFromSlot(pokemon, slotNum)}>
      <img src={pokemon.sprite} alt={`team slot ${slotNum + 1}`} style={{ maxHeight: '100px' }} />
      <PokemonName>{pokemon.name}</PokemonName>
      <TypeContainer>
        {pokemon.types.map((type, index) => {
          return (
            <PokemonType
              key={index}
              isDefault={pokemon.isDefault()}
              style={{ backgroundColor: TYPE_COLORS[type] }}>
              {type}
            </PokemonType>
          );
        })}
      </TypeContainer>
    </TeamSlot>
  );
};

export default PokemonSlot;
