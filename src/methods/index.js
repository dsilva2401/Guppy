module.exports = function ($methods, $database, $q, $config, $global, $app) {
	
	// Dependencies
		var $ = {};
		$.database = $database;
		$.q = $q;
		$.config = $config;
		$.global = $global;
		$.methods = $methods;
		$.app = $app;

	// Methods
		$methods.SystemData = require('./SystemData')($);
		$methods.Useful = require('./Useful')($);
		$methods.Database = require('./Database')($);
		$methods.Log = require('./Log')($);
		$methods.Console = require('./Console')($);
		$methods.Response = require('./Response')($);
		$methods.Webmaster = require('./Webmaster')($);
		$methods.Access = require('./Access')($);
		$methods.Router = require('./Router')($);
}