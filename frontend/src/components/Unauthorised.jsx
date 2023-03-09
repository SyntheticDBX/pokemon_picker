import React from 'react';
import Snorlax from '../media/sleeping_snorlax.png';
import styled from 'styled-components';

const Container = styled.div`
  color: white;
  padding-top: 20px;
  text-align: center;
`;

const Unauthorised = () => {
  return (
    <Container>
      <img src={Snorlax} alt="a sleeping snorlax" style={{ maxHeight: '500px' }} />
      <h1>403 - A Sleeping Snorlax is In The Way</h1>
      <p>You tried to access a resource you weren't authorized to access.</p>
      <p>Please try logging in before trying again.</p>
      <a href="/" style={{ color: '#ca7e3b' }}>
        Click here to go back to the home page.
      </a>
    </Container>
  );
};

export default Unauthorised;
