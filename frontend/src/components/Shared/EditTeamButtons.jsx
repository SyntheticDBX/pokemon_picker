import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import Pokemon from '../../js/classes/Pokemon';

const TEAM_SIZE = 6;

const EditTeamButtons = ({ teamObj, deleteTeam }) => {
  const history = useNavigate();

  // redirects you to another page of a specified url and with the team data pushed into the location state
  const redirectWithTeamData = url => {
    const { name, team } = teamObj;
    // convert objects into pokemon objects with ES6 class methods
    // also pads the array with default pokemon objects if it's less than the max team size
    const convertedTeam = team
      .map(pokeObj => Pokemon.instanceFromObject(pokeObj))
      .concat(new Array(TEAM_SIZE - team.length).fill(new Pokemon()));
    history(url, { state: { team: convertedTeam, teamName: name } });
  };

  return (
    <div className={styles.flexContainer}>
      <button
        className={`pure-button pure-button-primary ${styles.button}`}
        disabled={!teamObj}
        onClick={() => redirectWithTeamData('/create-team')}>
        Edit Team
      </button>
      <button
        className={`pure-button pure-button-primary ${styles.button}`}
        disabled={!teamObj}
        onClick={() => redirectWithTeamData('/random-team')}>
        Edit Team Random
      </button>
      {deleteTeam && (
        <button
          className={`pure-button button-danger ${styles.button}`}
          disabled={!teamObj}
          onClick={() => deleteTeam(teamObj.name)}>
          Delete Team
        </button>
      )}
    </div>
  );
};

export default EditTeamButtons;
