const passport = require('passport');
const { registerUser, loginUser, logoutUser, getUsername, getUser, deleteUser } = require('./controllers/UserController');
const { getTeams, createTeam, updateTeam, deleteTeam } = require('./controllers/TeamsController');
const { getReactPage } = require('./controllers/Index');
const middleware = require('./middleware');

// app router
const router = (app) => {
  app.post('/register', registerUser);
  app.post('/login', passport.authenticate('local'), loginUser);
  app.get('/logout', middleware.isAuth, logoutUser);
  app.get('/getUsername', getUsername);
  app.get('/user', middleware.isAuth, getUser);
  app.delete('/user/:username', middleware.isAuth, deleteUser);
  app.get('/team/:username', getTeams);
  app.get('/team', middleware.isAuth, getTeams);
  app.post('/team', middleware.isAuth, createTeam);
  app.put('/team', middleware.isAuth, updateTeam);
  app.delete('/team/:name/:username', middleware.isAuth, deleteTeam);
  app.get('/create-team', middleware.isAuth, getReactPage);
  app.get('/random-team', middleware.isAuth, getReactPage);
  app.get('/edit-team', middleware.isAuth, getReactPage);
  app.get('/admin', middleware.isAuth, getReactPage);
  app.get('*', getReactPage);
};

module.exports = router;