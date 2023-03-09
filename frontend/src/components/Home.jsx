import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled.a`
  font-weight: bold;
  color: #3b4cca;

  &:hover {
    color: #2a3279;
  }
`;

const InfoContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1em;
  gap: 2em;
`;

const Box = styled.div`
  width: 400px;
  min-height: 400px;
  padding: 1em 2em;
  border: inset 4px black;
  background-color: var(--pokemon-yellow);
  border-radius: 1em;
`;

const BoxTitle = styled.h2`
  text-align: center;
  margin: 1em 0;
`;

const Home = () => {
  return (
    <main style={{ padding: '2em 15%' }} className="pure-g">
      <h1 className="pure-u-1">
        {/* <img
          className="pure-img pure-u-1"
          id="logo"
          src={pokemonLogo}
          alt="pokemon team builder logo"
        /> */}
      </h1>
      <InfoContainer className="pure-u-1">
        <Box>
          <BoxTitle>Users</BoxTitle>
          <p className="paragraph">
            App to build and save your Pokemon teams for your next Nuzlocke run.
          </p>
          <p className="paragraph">
            In this app you can create a team of 6 Pokemon, save it, and then edit it later. You can
            also delete your team if you want to start over.
          </p>
          <p className="paragraph">
            There is also an option to randomly generate a team, maybe you're feeling lucky?
          </p>
        </Box>
        <Box>
          <BoxTitle>Main Functions</BoxTitle>
          <p className="paragraph">
            There is an administration page that allows you to remove users from the database.
            This is useful if you want to remove a user that has been spamming the database with
            fake accounts.
          </p>
          <p className="paragraph">
            <StyledLink as={Link} to="/unauthorised">
              403 - unauthorized
            </StyledLink>
          </p>
          <p className="paragraph">
            <StyledLink as={Link} to="/page-not-found">
              404 - page not found
            </StyledLink>
          </p>
        </Box>
      </InfoContainer>
    </main>
  );
};

export default Home;
