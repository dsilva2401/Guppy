module.exports = function ($config, $methods, $global, $database) {

	// Database name
		var name = 'mongo';

	// Database configuration
		var mongoose = $global.mongoose;
		var dbConfig = $config.databases[name];
		var dburl = 'mongodb://'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database;
		var db = null;
		mongoose.connect(dburl);
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));

	// Models
		// mongoose.model('Kitten', mongoose.Schema({
		//     name: String
		// }));

	// Export database
		$database[name] = db;

}