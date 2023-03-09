import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import styles from './index.module.scss';

const GetUsersForm = ({ getTeams }) => {
  const [openSnackbar] = useSnackbar();

  const [users, setUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // fetch users off the server
  const fetchUsers = async () => {
    const res = await fetch('/user');
    const data = await res.json();
    setUsers(data);
    // fetch the team from the first user
    setSelectedIndex(0);
    getTeams(data[0].username);
  };

  // delete a given user and their teams
  const deleteUser = async () => {
    if (
      !window.confirm('Are you sure you want to delete this user? All their teams will be deleted.')
    ) {
      return;
    }
    const username = users[selectedIndex].username;
    const res = await fetch(`/user/${username}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      fetchUsers();
    }
    if (data) {
      openSnackbar(data.message);
    }
  };

  // fires off whenever the user selects changes
  // it then automatically grabs the team for the newly selected user
  const handleSelectChange = e => {
    const index = e.target.value;
    setSelectedIndex(index);
    const username = users[index].username;
    getTeams(username);
  };

  return (
    <div>
      <form className={`pure-form pure-form-stacked`} onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend></legend>
          <div className={`${styles.flexContainer} ${styles.wrap}`}>
            <button
              className={`pure-button pure-button-primary ${styles.button}`}
              onClick={fetchUsers}
              style={{ marginRight: '10px' }}>
              Get Users
            </button>
            <div>
              <label htmlFor="users">Select a user</label>
              <select
                id="users"
                name="users"
                style={{ minWidth: '180px' }}
                value={selectedIndex}
                onChange={e => handleSelectChange(e)}
                disabled={users.length === 0}>
                {users.map((user, index) => {
                  return (
                    <option key={index} value={index}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className={`pure-button button-danger ${styles.button}`}
              disabled={users.length === 0}
              onClick={deleteUser}>
              Delete User
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default GetUsersForm;
