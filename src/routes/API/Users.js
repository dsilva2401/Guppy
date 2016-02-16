module.exports = function ($) {
	var r = {};
	var Database = $.methods.Database;
	var Response = $.methods.Response;
	var db = $.methods.Database('main');

	r.getAll = function (req, res, next) {
		db.model('Person').findWithPagination({
			page: req.query.page || 0,
			limit: req.query.limit || 20,
			attributes: [ 'id', 'name', 'lastname', 'email', 'sex', 'birthday', 'createdAt' ]
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

	return r;
}