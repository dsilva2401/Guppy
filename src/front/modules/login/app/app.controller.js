(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.submit = function () {
				$scope.models.invalidPassword = true;
				$resources.Login.post({
					data: {
						email: $scope.models.email,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					$scope.models.loading = false;
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					$scope.models.loading = false;
					console.warn(resp)
					if (resp.status == 401) $scope.models.invalidCredentials = true;
					if (resp.status >= 500) $scope.models.serverError = true;
					$scope.models.password = '';
				});
			}
		
		// Init

	});

})(angular)