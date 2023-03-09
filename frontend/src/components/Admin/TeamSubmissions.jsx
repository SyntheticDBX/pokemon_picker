import React from 'react';
import TeamContainer from './TeamContainer';

const TeamSubmissions = ({ teams, deleteTeam }) => {
  return (
    <div className="pure-u-1">
      {teams.map((team, index) => {
        return <TeamContainer team={team} key={index} deleteTeam={deleteTeam} />;
      })}
      {teams.length === 0 && <h2 className="yellow-box">No teams found</h2>}
    </div>
  );
};

export default TeamSubmissions;
