import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import styles from './index.module.scss';
import cn from 'classnames';
import LoginMenu from './LoginMenu';
import LogoutMenu from './LogoutMenu';

const Nav = styled.nav`
  display: flex;
  flex-flow: row wrap;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const Navbar = ({ user, setUser }) => {
  const links = ['/create-team', '/random-team', '/edit-team', '/admin'];
  const descriptions = ['Create a team', 'Random teams', 'View teams', 'Admin'];

  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <Nav className="pure-menu pure-menu-horizontal">
      <h4 to="/" className="pure-menu-heading">
        Pokémon Team Builder
      </h4>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link
            to="/"
            className={cn('pure-menu-link', styles.navLink, {
              [styles.selected]: selected === '/',
            })}>
            Home
          </Link>
        </li>
        {user !== '' &&
          links.map((link, index) => {
            return (
              <li key={index} className="pure-menu-item">
                <Link
                  to={link}
                  className={cn('pure-menu-link', styles.navLink, {
                    [styles.selected]: selected === link,
                  })}>
                  {descriptions[index]}
                </Link>
              </li>
            );
          })}
      </ul>
      {user === '' ? (
        <LoginMenu className="pure-menu-list" setUser={setUser} />
      ) : (
        <LogoutMenu className="pure-menu-list" user={user} setUser={setUser} />
      )}
    </Nav>
  );
};

export default Navbar;
