module.exports = function ($) {
	var r = {};
	var Database = $.methods.Database;
	var Response = $.methods.Response;
	var db = $.methods.Database('main');

	r.getAll = function (req, res, next) {
		db.model('Role').findAll({
			where: { active: true },
			attributes: [ 'id', 'name' ]
		})
		// Success
		.then(
			Response.success(req, res, next)
		)
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	r.post = function (req, res, next) {
		db.model('Role').create({
			name: req.body.name
		})
		// Success
		.then(
			Response.success(req, res, next)
		)
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	r.update = function (req, res, next) {
		db.model('Role').findById(req.params.roleId)
		// Success
		.then(function (role) {
			role.name = req.body.name;
			role.save()
			// Success
			.then(
				Response.success(req, res, next)
			)
			// Error
			.catch(
				Response.error(req, res, next)
			)
		})
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	r.disable = function (req, res, next) {
		db.model('Role').findById(req.params.roleId)
		// Success
		.then(function (role) {
			role.active = false;
			role.save()
			// Success
			.then(
				Response.success(req, res, next)
			)
			// Error
			.catch(
				Response.error(req, res, next)
			)
		})
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

	return r;
}