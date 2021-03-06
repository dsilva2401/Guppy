module.exports = function ($) {
	var r = {};
	var Access = $.methods.Access;
	var Database = $.methods.Database;
	var Response = $.methods.Response;

	r.getCurrentSession = function (req, res, next) {
		Access.verifySession(req)
		// Success
		.then(function (person) {
			req.currentPerson = person;
			next();
		})
		// Error
		.catch(
			Response.error(req, res, next)
		)
	}

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

	r.redirectIfAlreadyLoggedIn = function (url) {
		return function (req, res, next) {
			if (req.currentPerson) {
				res.redirect(url);
				return;
			}
			next();
		}
	}

	r.redirectIfNotLoggedIn = function (url) {
		return function (req, res, next) {
			if (!req.currentPerson) {
				res.redirect(url);
				return;
			}
			next();
		}
	}
	
	return r;
}