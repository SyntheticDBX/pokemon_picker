import styled from 'styled-components';

const TeamSections = styled.div`
  text-align: center;
`;

const PokemonName = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PokemonType = styled.span`
  text-transform: uppercase;
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

const PokemonSections = ({ pokemon, sectionNum, removeFromSection }) => {
  return (
    <TeamSections
      style={pokemon.isDefault() || { cursor: 'no-drop' }}
      onClick={() => removeFromSection(pokemon, sectionNum)}>
        <img src={pokemon.sprite} alt={`team slot ${sectionNum + 1}`} style={{ maxHeight: '100px'}} />
        <PokemonName>{pokemon.name}</PokemonName>
        <TypeContainer>
          {pokemon.types.map((type, index) => {
            return (
              <PokemonType
                key={index}
                isDefault={pokemon.isDefault()}>
                {type}
              </PokemonType>
            );
          })}
        </TypeContainer>
    </TeamSections>
  );
};

export default PokemonSections;