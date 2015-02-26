
/*!
 * Module dependencies.
 */

// Note: We can require users, fellowship and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('users');
var fellowship = require('fellowship');
var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/users/:userId', users.show);

  app.param('userId', users.load);

  // article routes
  app.param('id', fellowship.load);
  app.get('/fellowship', fellowship.index);
  app.get('/fellowship/new', auth.requiresLogin, fellowship.new);
  app.post('/fellowship', auth.requiresLogin, fellowship.create);
  app.get('/fellowship/:id', fellowship.show);
  app.get('/fellowship/:id/edit', articleAuth, fellowship.edit);
  app.put('/fellowship/:id', articleAuth, fellowship.update);
  app.delete('/fellowship/:id', articleAuth, fellowship.destroy);

  // home route
  app.get('/', fellowship.index);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
