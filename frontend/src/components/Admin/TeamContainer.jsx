import React from 'react';
import EditTeamButtons from '../Shared/EditTeamButtons';
import TeamView from '../Shared/TeamView';

const TeamContainer = ({ team, deleteTeam }) => {
  return (
    <div className="yellow-box" style={{ marginBottom: '10px' }}>
      <h2 className="bordered" style={{ paddingBottom: '10px', marginBottom: '10px' }}>
        {team.name}
      </h2>
      <div style={{ marginBottom: '10px' }}>
        <EditTeamButtons teamObj={team} deleteTeam={deleteTeam} />
      </div>
      <TeamView team={team.team} cols={6} />
    </div>
  );
};

export default TeamContainer;
