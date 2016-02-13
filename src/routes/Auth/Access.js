module.exports = function ($) {
	var r = {};
	var Access = $.methods.Access;
	var Database = $.methods.Database;
	var Response = $.methods.Response;

	r.register = function (req, res, next) {
		Access.register(req.body)
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