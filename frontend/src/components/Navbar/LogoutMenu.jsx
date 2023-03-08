import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const LogoutMenu = ({ user, setUser }) => {
  const history = useHistory();

  // logs the user out and redirects them back to the home page
  const signOut = () => {
    fetch('/logout').then(res => {
      if (res.redirected) {
        history.push('/');
      }
    });
    setUser('');
  };

  return (
    <ul className={styles.menu}>
      <li className="pure-menu-item">
        <p className={styles.greeting}>Welcome, {user}!</p>
      </li>
      <li className="pure-menu-item">
        <p className={`pure-menu-link ${styles.navLink}`} onClick={signOut}>
          Sign Out
        </p>
      </li>
    </ul>
  );
};

export default LogoutMenu;
