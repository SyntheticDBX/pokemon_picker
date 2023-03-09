// types and their colors in hex format
const TYPE_COLORS = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
};

// makes a put request to the server with the given team object
const replaceTeam = async teamObj => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teamObj),
  };

  try {
    const res = await fetch('/team', requestOptions);
    if (res.redirected) {
      window.location = 'unauthorized';
    } else {
      const json = await res.json();
      return json.message;
    }
  } catch (err) {
    console.log(err);
    return 'An error occured while trying to update the team.';
  }
};

// make a post request to the server with the given team object
const saveTeam = async (name, team) => {
  const teamObj = { name, team };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teamObj),
  };

  try {
    const res = await fetch('team', requestOptions);
    if (res.redirected) {
      window.location = 'unauthorized';
    } else if (res.status === 202) {
      if (window.confirm('A team with this name already exists, do you want to overwrite it?')) {
        return replaceTeam(teamObj);
      }
    } else {
      const json = await res.json();
      if (json) {
        return json.message;
      }
    }
  } catch (err) {
    console.log(err);
    return 'An error occured while trying to update the team.';
  }
};
// an array of numbers from 0 to N
// only occurs at runtime, so it's not a big deal
const arrayToN = N => {
  let i = 0,
    a = Array(N);
  while (i < N) a[i++] = i;
  return a;
};

export { TYPE_COLORS, saveTeam, arrayToN };
