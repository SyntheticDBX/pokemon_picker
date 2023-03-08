import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import Modal from 'react-modal';

const SignUpModal = ({ isOpen, setModalOpen }) => {
  Modal.setAppElement('#root');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [openSnackbar] = useSnackbar();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setPassword2('');
  };

  // attempts to create a new account on the server using the form data and the /register endpoint
  const onSubmit = async e => {
    e.preventDefault();

    // trim username, and passwords
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    const trimmedPass2 = password2.trim();

    if (!trimmedUser || !trimmedPass || !trimmedPass2) {
      openSnackbar('Username and password must not be empty.');
      return;
    }

    try {
      const res = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({
          username: trimmedUser,
          password: trimmedPass,
          password2: trimmedPass2,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const resJson = await res.json();
      openSnackbar(resJson.message);

      if (res.ok) {
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      openSnackbar('An error occurred while trying to register. Please try again.');
    }
    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={() => setModalOpen(false)}>
      <form className="pure-form pure-form-stacked modal-form" onSubmit={onSubmit}>
        <fieldset>
          <legend style={{ borderBottom: '1px solid gray' }}>Create your account</legend>
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
          <label htmlFor="password2">Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Confirm password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
            maxLength="30"
          />
        </fieldset>
        <button type="submit" className="pure-button pure-input-1 pure-button-primary">
          Sign up
        </button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
