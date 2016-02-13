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

	r.login = function (req, res, next) {
		Access.login(req.body)
		// Success
		.then(function (allowed) {
			if (!allowed) {
				res.status(401);
				Response.error(req, res, next)({
					details: 'Invalid credentials'
				});
				return;
			}
			Response.success(req, res, next)({
				details: 'Success on login'
			})
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}
	
	return r;
}