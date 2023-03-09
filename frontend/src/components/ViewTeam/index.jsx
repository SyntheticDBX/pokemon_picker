import React, { useState } from 'react';
import GetTeamForm from './GetTeamForm';
import TeamView from '../Shared/TeamView';
import Pokemon from '../../js/classes/Pokemon';

const ViewTeam = () => {
  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));

  return (
    <div className="pure-g padded-container">
      <div className="yellow-box pure-u-1">
        <h2>Instructions</h2>
        <p className="paragraph">
          This page allows you to view a team from the database.
          Clicking 'Get Teams' with no user inputted will give you the teams 
          of the currently logged in user.
        </p>
        <GetTeamForm setTeam={setTeam} />
      </div>
      <TeamView team={team} />
    </div>
  );
};

export default ViewTeam;
