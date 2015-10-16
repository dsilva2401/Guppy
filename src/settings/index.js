var cookieParser = require('cookie-parser');
module.exports = function ($app, $config, $express, $global) {

	// Set parsers
	$app.use( $global.bodyParser.json() );
	$app.use( $global.bodyParser.urlencoded({ extended: true }) );
	$app.use( $global.cookieParser() );

	// Set logger
	$app.use( $global.logger('dev') );

	// Compress all requests
	$app.use( $global.compress() );

	// Set static folder
	$app.use( $express.static($config.publicDir) );

	// Set front components status folder
	$app.use('/front', $express.static($config.frontDir));

	// Set Access Control
	$app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		if ('OPTIONS' == req.method) res.send(200);
		else next();
	});

}