const Team = require("../models/TeamsModel");

const getAllTeams = async (req, res) => {
  let { username } = req.params;
  if (!username) {
    username = req.user.username;
  }

  const teams = await Team.find(
    { username },
    { name: 1, team: 1, _id: 0 }
  ).lean();
  const teamLen = teams.length;

  if (teamLen <= 0) {
    return res.status(404).json({ error: "No teams found" });
  }

  const message =
    teamLen === 1
      ? `1 team found for ${username}`
      : `${teamLen} teams found for ${username}`;

  return res.status(200).json({ teams, message });
};

const addTeam = async (req, res) => {
  const { name, team } = req.body;

  const { username, _id: userId } = req.user;

  const savedTeams = await Team.find({ name, userId });

  if (savedTeams.length > 0) {
    return res.status(409).json({ error: "Team already exists" });
  }

  const newTeam = new Team({
    name,
    team,
    username,
    userId,
  });

  try {
    await newTeam.save();
    res.status(201).json({ message: "Team added" });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const replaceTeam = async (req, res) => {
  const { name, team } = req.body;
  const { username, _id: userId } = req.user;
  const newTeam = {
    name,
    team,
    username,
    userId,
  };

  try {
    const replacedTeam = await Team.findOneAndReplace(
      { name, userId },
      newTeam,
      { new: true }
    );
    res.status(200).json({ replacedTeam });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const { name, username } = req.params;

  if (!name || !username) {
    return res.status(400).json({ error: "Name and username required" });
  }

  try {
    const query = await Team.deleteOne({ name, username });
    if (query.deletedCount === 1) {
      return res.status(200).json({ message: "Team deleted" });
    } else {
      return res.status(404).json({ error: "Team not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTeams,
  addTeam,
  replaceTeam,
  deleteTeam,
};
