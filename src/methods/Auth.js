module.exports = function ($) {
	var Auth = {};
	var Useful = $.methods.Useful;
	var models = $.database.main.models;

	Auth.verifyCredentials = function (credentials) {
		var deferred = $.q.defer();
		models.Credential.findOne({
			attributes: ['PersonId'],
			where: {
				$or: [ {username: credentials.usernameOrEmail}, {email: credentials.usernameOrEmail} ],
				$and: {password: credentials.password}
			}
		})
		// Success
		.then(function (credentials) {
			deferred.resolve(credentials);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}
	
	Auth.createSession = function (personId, res) {
		var deferred = $.q.defer();
		var sKey = Useful.createRandomWord(30);
		models.SessionKey.create({
			key: sKey,
			PersonId: personId
		})
		// Success
		.then(function (sessionKey) {
			res.cookie('uid', personId);
			res.cookie('skey', sKey);
			deferred.resolve({
				personId: personId
			});
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.getCurrentSession = function (uid, skey) {
		var deferred = $.q.defer();
		models.SessionKey.findOne({
			PersonId: uid,
			key: skey
		})
		// Success
		.then(function (session) {
			if (!session) {
				deferred.resolve(null);
				return;
			}
			models.Person.findById(session.PersonId)
			// Success
			.then(function (person) {
				deferred.resolve(person);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.deleteSession = function (uid, skey, res) {
		var deferred = $.q.defer();
		models.SessionKey.findOne({
			PersonId: uid,
			key: skey
		})
		// Success
		.then(function (session) {
			if (!session) {
				deferred.resolve(null);
				return;
			}
			session.destroy()
			// Success
			.then(function (status) {
				deferred.resolve(true);
			})
			// Error
			.catch(function (error) {
				deferred.reject(error);
			})
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Auth.verifyPlatformAccess = function (uid, platformPath) {
		
	}

	return Auth;
}