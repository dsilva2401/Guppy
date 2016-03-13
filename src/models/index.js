module.exports = function ($config, $methods, $global, $database) {

	// Databases
		require('./sequelize')($config, $methods, $global, $database);
		require('./mongoose')($config, $methods, $global, $database);

}