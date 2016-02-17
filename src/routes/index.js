module.exports = function ( $express, $app, $methods, $config, $global, $database ) {

	// Controllers dependencies
		var $ = {};
		$.methods = $methods;
		$.config = $config;
		$.global = $global;
		$.database = $database;

	// Routes
		var viewsRouter = $express.Router();
		var authRouter = $express.Router();
		var apiRouter = $express.Router();

	// Controllers
		var Middleware = require('./Middleware')($);
		var Views = require('./Views')($);
		var Auth = require('./Auth')($);
		var API = require('./API')($);

	// Middleware
		authRouter.all('/*', Middleware.startRequest );
		authRouter.all('/*', Auth.Access.getCurrentSession );
		apiRouter.all('/*', Middleware.startRequest );
		apiRouter.all('/*', Auth.Access.getCurrentSession );
		viewsRouter.all('/*', Auth.Access.getCurrentSession );

	// Auth
		authRouter.post('/webmaster/login', Auth.WebmasterAccess.login);
		authRouter.delete('/webmaster/logout', Auth.WebmasterAccess.logout);
		authRouter.post('/register', Auth.Access.register);
		authRouter.post('/login', Auth.Access.login);

	// API
		apiRouter.get('/server-error/:errorId', API.Logs.getServerErrorDetails);
		apiRouter.get('/users', API.Users.getAll);
		apiRouter.get('/roles', API.Roles.getAll);
		apiRouter.post('/roles', API.Roles.post);
		apiRouter.put('/roles/:roleId', API.Roles.update);
		apiRouter.delete('/roles/:roleId', API.Roles.disable);

	// Views
		viewsRouter.get('/wmaster', Auth.WebmasterAccess.verifySession, Views.webmaster );
		viewsRouter.get('/register', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.register );
		viewsRouter.get('/login', Auth.Access.redirectIfAlreadyLoggedIn('/'), Views.login );
		viewsRouter.get('/admin', Auth.Access.redirectIfNotLoggedIn('/login'), Views.admin );

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}