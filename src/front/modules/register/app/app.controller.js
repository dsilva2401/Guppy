(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.submit = function () {
				if ($scope.models.password != $scope.models.repassword) {
					$scope.models.invalidPassword = true;
					$scope.models.password = '';
					$scope.models.repassword = '';
					return;
				}
				$resources.Register.post({
					data: {
						name: $scope.models.name,
						lastname: $scope.models.lastname,
						email: $scope.models.email,
						sex: $scope.models.sex,
						birthday: $scope.models.birthday,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error on register', resp);
				})
			}
		
		// Init

	});

})(angular)