module.exports = function ($) {
	var r = {};
	var Auth = $.methods.Auth;
	var Response = $.methods.Response;

	r.getCurrentSession = function (req, res, next) {
		var uid = req.cookies.uid;
		var skey = req.cookies.skey;
		Auth.getCurrentSession(uid, skey)
		// Success
		.then(function (person) {
			console.log( person )
			req.currentPerson = person;
			next();
		})
		// Error
		.catch(
			Response.error(req, res, next)
		);
	}

	r.preventIfAlreadyLoggedIn = function (req, res, next) {
		/*if (req.currentPerson) {
			res.status(409);
			Response.error(req, res, next)({
				details: 'User already logged in'
			});
			return;
		}*/
		next();
	}

	r.preventIfNotLoggedIn = function (req, res, next) {
		if (!req.currentPerson) {
			res.status(401);
			Response.error(req, res, next)({
				details: 'User not logged in'
			});
			return;
		}
		next();
	}

	r.login = function (req, res, next) {
		Auth.verifyCredentials({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
		// Success
		.then(function (credentals) {
			if (!credentals) {
				res.status(401);
				Response.error(req, res, next)({
					details: 'Invalid credentals'
				});
				return;
			}
			Auth.createSession(credentals.dataValues.PersonId, res)
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
		);
	}

	return r;
}