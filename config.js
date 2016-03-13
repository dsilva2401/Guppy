// Envirnomnet varialbes
	var PROCENV = process.env.NODE_ENV;
	var ISPRODENV = (PROCENV=='prod' || PROCENV=='PROD' || PROCENV=='production' || PROCENV=='PRODUCTION');
	var ENV = (ISPRODENV ? 'prod' : 'dev');

// Basic configuration
	exports.env = ENV;
	exports.prod = ISPRODENV;
	exports.rootDir = __dirname;

// Static directories
	exports.frontDir = 'src/front';

// HTTP & HTTP Servers
	exports.httpServer = {};
	exports.httpsServer = {};
	exports.httpServer.domain = (ISPRODENV ? 'http://myapp.com' : 'http://localhost:3000');
	exports.httpsServer.domain = (ISPRODENV ? 'http://myapp.com' : 'http://localhost:5000');
	exports.httpServer.host = '0.0.0.0';
	exports.httpsServer.host = '0.0.0.0'; 
	exports.httpServer.port = (ISPRODENV ? 80 : 3000);
	exports.httpsServer.port = (ISPRODENV ? 443 : 5000);

// Databases
	exports.databases = {};
	// Main
	exports.databases.main = {};
	exports.databases.main.database = (ISPRODENV ? 'guppy' : 'guppydev');
	exports.databases.main.username = 'postgres';
	exports.databases.main.password = 'postgres';
	exports.databases.main.options = {};
	exports.databases.main.options.host = 'localhost';
	exports.databases.main.options.dialect = 'postgres';
	exports.databases.main.options.logging = (ISPRODENV ? false : console.log);
	// Mongo
	exports.databases.mongo = {};
	exports.databases.mongo.host = 'localhost';
	exports.databases.mongo.port = 27017;
	exports.databases.mongo.database = (ISPRODENV ? 'guppy' : 'guppydev');