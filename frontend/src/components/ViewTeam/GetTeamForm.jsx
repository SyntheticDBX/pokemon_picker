import React, { useState } from 'react';
import styles from './index.module.scss';
import { useSnackbar } from 'react-simple-snackbar';
import EditTeamButtons from '../Shared/EditTeamButtons';

const GetTeamForm = ({ setTeam }) => {
  const [username, setUsername] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openSnackbar] = useSnackbar();

  // fetches the teams of a given user
  const fetchTeam = async () => {
    console.log('Fetching the teams from the server for user: ' + username);
    const res = await fetch(`/team/${username}`);
    const data = await res.json();
    const teamsJson = data.teams;
    if (teamsJson) {
      setTeams(teamsJson);
      // default the select to the first team
      setTeam(teamsJson[0].team);
    }
    openSnackbar(data.message);
  };

  // updates the team whenever the select value is changed
  const handleSelectTeam = e => {
    const index = e.target.value;
    const teamObj = teams[index];
    setSelectedIndex(index);
    setTeam(teamObj.team);
  };

  return (
    <form className="pure-form pure-form-stacked pure-u-1" onSubmit={e => e.preventDefault()}>
      <fieldset>
        <legend></legend>
        <div className={`${styles.flexContainer} ${styles.wrap}`}>
          <div>
            <label htmlFor="search-box">Username</label>
            <input
              type="search"
              id="search-box"
              placeholder="Search a user"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              className={`pure-button pure-button-primary ${styles.button}`}
              onClick={fetchTeam}>
              Get Teams
            </button>
          </div>
          <div className={`${styles.flexContainer} ${styles.wrap}`} style={{ marginLeft: '1em' }}>
            <div>
              <label htmlFor="team-select">Select a team</label>
              <select
                className={`${styles.teamSelect}`}
                name="team-select"
                disabled={teams.length === 0}
                value={selectedIndex}
                onChange={e => handleSelectTeam(e)}>
                {teams.map((team, index) => {
                  return (
                    <option key={index} value={index}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <EditTeamButtons teamObj={teams[selectedIndex]} />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default GetTeamForm;
