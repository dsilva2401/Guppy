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
		apiRouter.all('/*', Middleware.startRequest );

	// Auth
		authRouter.post('/webmaster/login', Auth.WebmasterAccess.login);
		authRouter.delete('/webmaster/logout', Auth.WebmasterAccess.logout);
		authRouter.post('/register', Auth.Access.register);
		authRouter.post('/login', Auth.Access.login);

	// API
		apiRouter.get('/server-error/:errorId', API.Logs.getServerErrorDetails);

	// Views
		viewsRouter.get('/wmaster', Auth.WebmasterAccess.verifySession, Views.webmaster );
		viewsRouter.get('/register', Views.register );
		viewsRouter.get('/login', Views.login );

	// Set routers
		$app.use( viewsRouter );
		$app.use( '/auth/v1', authRouter );
		$app.use( '/api/v1', apiRouter );

}