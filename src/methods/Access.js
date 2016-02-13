module.exports = function ($) {
	var Access = {};
	var db = $.methods.Database('main');
	
	Access.register = function (userData) {
		var deferred = $.q.defer();		
		db.model('Person').create({
			name: userData.name,
			lastname: userData.lastname,
			email: userData.email,
			sex: userData.sex,
			birthday: userData.birthday
		})
		// Success
		.then(function (person) {
			db.model('Credential').create({
				email: userData.email,
				password: $.global.md5(userData.password),
				PersonId: person.id
			})
			// Success
			.then(function (credential) {
				deferred.resolve(person);
			})
			// Error
			.catch(function (error) {
				person.destroy();
				deferred.reject(error);
			});	
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	Access.login = function (credentials) {
		var deferred = $.q.defer();		
		db.model('Credential').findOne({
			where: {
				email: credentials.email,
				password: $.global.md5(credentials.password)
			}
		})
		// Success
		.then(function (credential) {
			deferred.resolve(!!credential);
		})
		// Error
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return Access;
}