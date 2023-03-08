import React from 'react';
import styled from 'styled-components';
import SleepingPikachu from '../media/sleeping-pikachu.png';

const Container = styled.div`
  color: white;
  padding-top: 20px;
  text-align: center;
`;

const PageNotFound = () => {
  return (
    <Container>
      <img src={SleepingPikachu} alt="a sleeping pikachu" style={{ maxHeight: '300px' }} />
      <h1>404 - Page not found.</h1>
      <p>Check your URL, or your typing.</p>
      <a href="/" style={{ color: '#ca7e3b' }}>
        Click here to go back to the home page
      </a>
    </Container>
  );
};

export default PageNotFound;
