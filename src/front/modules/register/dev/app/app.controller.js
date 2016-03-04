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
				if ($scope.models.password != $scope.models.repassword) {
					$scope.models.invalidPassword = true;
					$scope.models.password = '';
					$scope.models.repassword = '';
					return;
				}
				gpyComponents.loading.start();
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
					gpyComponents.loading.stop();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.serverErrorPopup(resp);
					console.warn('Error on register', resp);
				})
			}
		
		// Init

	});

})(angular);