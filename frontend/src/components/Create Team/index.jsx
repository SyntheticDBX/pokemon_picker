import { useState, useEffect, useRef } from "react";
import PokemonSections from "./PokemonSections";
import PokemonSearch from './PokemonSearch';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";

const Container = styled.main`
  display: flex;
`;

const Heading = styled.h1`
  grid-column: 1 / -1;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 4px;
`;

const PokemonSelection = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  gap: 4px;
  padding: 4px;
  
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 1040px) {
    grid-template-columns: repeat(1, 1fr);
  }
  
  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CreateTeam = () => {
  const COUNT = 10000;

  const pokemonList = useRef();

  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));
  const [filteredList, setPokemonList] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isCollapsed, setCollapsed] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getPokemon = async () => {
      const list = sessionStorage.getItem('pokemonList');
      if (list) {
        const parsedList = JSON.parse(list);
        pokemonList.current = parsedList.map(pokeObject => Pokemon.instanceFromObject(pokeObject));
      } else {
        pokemonList.current = await fetchPokemon();
        sessionStorage.setItem('pokemonList', JSON.stringify(pokemonList.current));
      }
      setPokemonList(pokemonList.current);
      setActive(false);
    };
    getPokemon();

    if (location.state) {
      const { team } = location.state;
      const converted = team.map(team => Pokemon.instanceFromObject(team));
      setTeam(converted);
    }
  }, []);

  const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${COUNT}`);
    const data = await res.json();
    const pokeList = await fetchPokemonFromList(data.results);
    return pokeList;
  };

  const fetchPokemonFromList = async (list) => {
    const pokeList = await Promise.all(list.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return Pokemon.instanceFromObject(data);
    }));
    return pokeList;
  };

  const setTeamSection = pokemon => {
    const index = team.findIndex(pokemon => pokemon.isDefault());
    if (index !== -1) {
      const newTeam = [...team];
      newTeam[index] = pokemon;
      setTeam(newTeam);
    }
  };

  const filterPokemonList = filters => {
    let list = [...pokemonList.current];
    const { types, searchType, search, generations } = filters;

    if (!generations.includes('any') && generations.length > 0 {
      let newList = [];
      generations.forEach(gen => {
        const [start, end] = generation.split(',');
        newList = newList.concat(list.slice(start -1, end));
      });
      list = newList;
    }

    if (!types.includes('any') && types.length > 0) {
      list = list.filter(pokemon => {
        switch(searchType) {
          case 'and':
            for (const selectedType of types) {
              if (!pokemon.types.includes(selectedType)) {
                return false;
              }
            }
            return true;
          case 'or':
            for (const selectedType of types) {
              if (pokemon.types.includes(selectedType)) {
                return true;
              }
            }
            return false;
          case 'only':
            for (const selectedType of types) {
              if(pokemon.types.includes(selectedType) && pokemon.types.length === 1) {
                return true;
              }
            }
            return false;
          default:
            console.log('Unknown search type: ' + searchType);
            return false;
          }
      });
    }

    if (search) {
      list = list.filter(pokemon => pokemon.name.includes(search.toLowerCase()));
    }

    setPokemonList(list);
  };

  const saveTeam = async teamName => {
    const filteredTeam = team.filter(pokemon => !pokemon.isDefault());

    if (filteredTeam.length === 0) {
      alert('You must have at least one pokemon on your team!');
      return;
    }

    const response = await shared.saveTeam(teamName, filteredTeam);
    if (response) {
      alert('Team saved successfully!');
    }
  };

  return (
    <Container>
      <TeamContainer>
        <Heading>Team View</Heading>
        {team.map((pokemon, index) => {
          return (
            <PokemonSections
              key={index}
              pokemon={pokemon}
              
            />
          )
        })}
      </TeamContainer>
  )
