const passport = require('passport');
const controllers = require('./controllers');
const middleware = require('./middleware');

// This is a function that takes in the express app and configures it
const router = (app) => {
  app.post('/register', controllers.User.registerUser);
  app.post('/login', passport.authenticate('local'), controllers.User.loginUser);
  app.get('/logout', controllers.User.logoutUser);
  app.get('/getUsername', controllers.User.getUsername);
  app.get('/user', middleware.isAuth, controllers.User.getUser);
  app.delete('/user/:username', middleware.isAuth, controllers.User.deleteUser);
  app.get('/team/:username', controllers.Team.getTeams);
  app.get('/team', middleware.isAuth, controllers.Team.getTeams);
  app.post('/team', middleware.isAuth, controllers.Team.createTeam);
  app.put('/team', middleware.isAuth, controllers.Team.updateTeam);
  app.delete('/team/:username/:name', middleware.isAuth, controllers.Team.deleteTeam);
  app.get('/create-team', middleware.isAuth, controllers.getReactPage);
  app.get('/random-team', middleware.isAuth, controllers.getReactPage);
  app.get('/edit-team', middleware.isAuth, controllers.getReactPage);
  app.get('/profile', middleware.isAuth, controllers.getReactPage);
  app.get('*', controllers.getReactPage);
};

module.exports = router;