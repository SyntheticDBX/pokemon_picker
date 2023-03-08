// types and their correpsonding colors in hex format
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
    return 'An occured while trying to update the team.';
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
    return 'An occured while trying to update the team.';
  }
};

// https://stackoverflow.com/a/65244270/7838349
const arrayToN = N => {
  let i = 0,
    a = Array(N);
  while (i < N) a[i++] = i;
  return a;
};

// modified version that starts from any inital value
// didn't end needing this as I went for an alternative approach
// that involved concatening arrays, but I will keep this around in case I need it later.
const arrayFromToN = (i, N) => {
  let a = Array(N - i);
  while (i < N) a[i++] = i;
};

export { TYPE_COLORS, saveTeam, arrayToN, arrayFromToN };
