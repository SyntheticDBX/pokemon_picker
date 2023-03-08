import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import Modal from 'react-modal';

const LoginModal = ({ isOpen, setModalOpen, setUser }) => {
  Modal.setAppElement('#root');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [openSnackbar] = useSnackbar();

  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  // tries to login to the server with the inputted password and username
  const onSubmit = e => {
    e.preventDefault();
    resetForm();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    fetch('/login', requestOptions)
      .then(res => {
        if (res.ok) {
          setModalOpen(false);
          setUser(username);
          openSnackbar('Login successful!');
        } else if (res.status === 401) {
          openSnackbar('Invalid username or password.');
        } else {
          openSnackbar('An unknown error occurred. Please try again.');
        }
      })
      .catch(err => {
        console.error(err);
        openSnackbar('An error occurred while trying to login. Please try again.');
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={() => setModalOpen(false)}>
      <form className="pure-form pure-form-stacked modal-form" onSubmit={onSubmit}>
        <fieldset>
          <legend style={{ borderBottom: '1px solid gray' }}>Login your account</legend>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            maxLength="20"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            maxLength="30"
          />
        </fieldset>
        <button type="submit" className="pure-button pure-input-1 pure-button-primary">
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
