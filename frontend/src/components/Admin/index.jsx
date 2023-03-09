import React, { useState, useRef } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import styles from './index.module.scss';
import GetUsersForm from './GetUsersForm';
import TeamSubmissions from './TeamSubmissions';

const Admin = () => {
  const user = useRef('');
  const [teams, setTeams] = useState([]);
  const [showSnackbar] = useSnackbar();

  // get teams off the server for a specific user
  const getTeams = async username => {
    const res = await fetch(`/team/${username}`);
    const data = await res.json();
    setTeams(data.teams || []);
    user.current = username;
  };

  // delete team for a specific user and team name
  const deleteTeam = async teamName => {
    try {
      // prevent multiple delete requests from being sent simultaneously
      if (teams.some(team => team.name === teamName && team.isDeleting)) {
        return;
      }
      setTeams(teams =>
        teams.map(team =>
          team.name === teamName ? { ...team, isDeleting: true } : team
        )
      );
      const res = await fetch(`/team/${user.current}/${teamName}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showSnackbar('Team deleted successfully');
        getTeams(user.current);
      } else {
        showSnackbar('Error deleting team');
      }
    } catch (err) {
      console.log(err);
      showSnackbar('Error deleting team');
    } finally {
      setTeams(teams =>
        teams.map(team =>
          team.name === teamName ? { ...team, isDeleting: false } : team
        )
      );
    }
  };
  

  return (
    <div className={`pure-g ${styles.container}`}>
      <div className="yellow-box pure-u-1">
        <h2>Instructions</h2>
        <p className='paragraph'>
          This page allows you to delete users and/or teams from the database.
          Clicking the 'Get Users' will bring you all the users currently in the database.
        </p>
        <GetUsersForm getTeams={getTeams} />
      </div>
      <TeamSubmissions teams={teams} deleteTeam={deleteTeam} />
    </div>
  );
};

export default Admin;
