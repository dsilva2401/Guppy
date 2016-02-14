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
		Access.verifyCredentials(req.body)
		// Success
		.then(function (credential) {
			if (!credential) {
				res.status(401);
				Response.error(req, res, next)({
					details: 'Invalid credentials'
				});
				return;
			}
			Access.createSession(credential.dataValues.PersonId, res)
			// Success
			.then(function (session) {
				Response.success(req, res, next)({
					details: 'Welcome!'
				})
			})
			// Error
			.catch(
				Response.error(req, res, next)
			)
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}
	
	return r;
}