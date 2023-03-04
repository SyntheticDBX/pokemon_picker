const Teams = require("../models/Teams");
const mongoose = require("mongoose");

// get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Teams.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get team by id
const getTeamById = async (req, res) => {
  try {
    const team = await Teams.findById(req.params.id);
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create team
const createTeam = async (req, res) => {
  try {
    const team = req.body;
    const newTeam = new Teams(team);
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update team
const updateTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such team");
  }
  const team = await Teams.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!team) {
    return res.status(404).send("No such team");
  }
  res.status(200).json(team);
};

// delete team
const deleteTeam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No such team");
  }

	const team = await Teams.findOneAndDelete(
		{ _id: id },
		{
			...req.body,
		}
	);
	if (!team) {
		return res.status(404).send("No such team");
	}
	res.status(200).json(team);
};

module.exports = {
	getAllTeams,
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
};
