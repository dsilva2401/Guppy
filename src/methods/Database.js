module.exports = function ($) {
	
	var mainDatabase = function () {
		var db = $.database.main;
		var mainDb = {};

		mainDb.model = function (modelName) {
			var dbModel = db.models[modelName];

			// Methods
			dbModel.findWithPagination = function (data) {
				data = data || {};
				data.limit = Math.min(data.limit || 20, 50);
				data.offset = (data.page || 0)*data.limit;
				return dbModel.findAll(data);
			}

			return dbModel;
		}

		return mainDb;
	}


	return function (dbName) {
		switch (dbName) {
			case 'main':
				return mainDatabase();
			break;
		}
	}
}