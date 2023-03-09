const Team = require("../models/TeamsModel");

  // get team associated with the user
const getTeams = async (req, res) => {
  let { username } = req.params;
  if (!username) {
    // if username is undefined, grab the username from the session
    username = req.user.username;
  }

  const teams = await Team.find({ username }, { name: 1, team: 1, _id: 0 }).lean();
  const teamLen = teams.length;

  if (teamLen <= 0) {
    return res.status(200).json({ message: `No teams were found for ${username}` });
  }

  const message = teamLen === 1
    ? `1 team was found for ${username}`
    : `${teamLen} teams were found for ${username}`;

  return res.status(200).json({ teams, message });
};

// add a new team to the database
const createTeam = async (req, res) => {
  const { name, team } = req.body;

  // get the username and user id from the session
  const { username, _id: userId } = req.user;

  // check if a team with the same name already exists
  const savedTeams = await Team.find({ name, userId });

  // if a team with the same name already exists, return a 202 status code
  if (savedTeams.length > 0) {
    return res
      .status(202)
      .json({ message: 'A team with name name already exists.', needsOverwrite: true });
  }

  const newTeam = new Team({
    name,
    team,
    username,
    userId,
  });

  try {
    const savedTeam = await newTeam.save();
    console.log(savedTeam);
    return res.status(201).json({ message: 'Team successfully saved!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred while saving the team.' });
  }
};

// replace a team of a given username and their team name
const updateTeam = async (req, res) => {
  const { name, team } = req.body;
  const { username, _id: userId } = req.user;
  const newTeam = {
    name,
    team,
    username,
    userId,
  };

  try {
    const updatedTeam = await Team.findOneAndReplace({ name, userId }, newTeam, { new: true });
    console.log(updatedTeam);
    res.status(200).json({ message: 'Team was successfully overwritten!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred while updating the team.' });
  }
};

// delete a team of a given username and their team name
const deleteTeam = async (req, res) => {
  const { name, username } = req.params;

  if (!name || !username) {
    return res.status(400).json({ message: 'Bad request, missing name or username.' });
  }

  try {
    const query = await Team.deleteOne({ name, username });
    if (query.deletedCount === 1) {
      return res.status(200).json({ message: 'Team was successfully deleted.' });
    } else {
      return res.status(400).json({ message: 'The team is already deleted.' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred.' });
  }
};


module.exports = {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};