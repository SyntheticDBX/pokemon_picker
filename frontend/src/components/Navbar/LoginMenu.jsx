import React from 'react';
import styles from './index.module.scss';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

const LoginMenu = ({ setUser }) => {
  const [signUpModalIsOpen, setSignUpModalOpen] = React.useState(false);
  const [loginModalIsOpen, setLoginModalOpen] = React.useState(false);

  return (
    <ul className={styles.menu}>
      <li className="pure-menu-item">
        <p onClick={() => setLoginModalOpen(true)} className={`pure-menu-link ${styles.navLink}`}>
          Login
        </p>
      </li>
      <li className="pure-menu-item">
        <p onClick={() => setSignUpModalOpen(true)} className={`pure-menu-link ${styles.navLink}`}>
          Sign Up
        </p>
      </li>
      <SignUpModal isOpen={signUpModalIsOpen} setModalOpen={setSignUpModalOpen} setUser={setUser} />
      <LoginModal isOpen={loginModalIsOpen} setModalOpen={setLoginModalOpen} setUser={setUser} />
    </ul>
  );
};

export default LoginMenu;
