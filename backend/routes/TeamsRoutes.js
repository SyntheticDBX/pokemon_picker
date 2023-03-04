const express = require("express");
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/TeamsController");
const router = express.Router();

// get all teams
router.get("/", getAllTeams);

// get team by id
router.get("/:id", getTeamById);

// create team
router.post("/", createTeam);

// update team
router.patch("/:id", updateTeam);

// delete team
router.delete("/:id", deleteTeam);

module.exports = router;