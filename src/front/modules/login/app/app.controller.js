(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.serverErrorPopup = function (resp) {
				gpyComponents.popup.show({
					message: 'Server error, please provide this code to the administrator: '+resp.data.errorId,
					type: 'error'
				});
			}
			$scope.methods.submit = function () {
				gpyComponents.loading.start();
				$scope.models.invalidPassword = true;
				$resources.Login.post({
					data: {
						email: $scope.models.email,
						password: $scope.models.password
					}
				})
				// Success
				.then(function (resp) {
					gpyComponents.loading.stop();
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					console.warn(resp)
					if (resp.status == 401) $scope.models.invalidCredentials = true;
					if (resp.status >= 500) {
						$scope.models.serverError = true;
						$scope.methods.serverErrorPopup(resp);
					}
					$scope.models.password = '';
				});
			}
		
		// Init

	});

})(angular)