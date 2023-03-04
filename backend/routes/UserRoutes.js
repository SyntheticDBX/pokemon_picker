const express = require("express");
const {
  loginUser,
  signupUser,
  logoutUser,
  findUserById,
} = require("../controllers/UserController");
const router = express.Router();

// user login
router.post("/login", loginUser);

// user signup
router.post("/signup", signupUser);

// user logout
router.get("/logout", logoutUser);

// user profile
router.get("/:id", findUserById);

module.exports = router;
