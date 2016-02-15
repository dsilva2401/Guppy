(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $resources, $window) {
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
				$scope.models.loading = true;
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
					$scope.models.loading = false;
					$window.location.reload();
				})
				// Error
				.catch(function (resp) {
					$scope.models.loading = false;
					console.warn('Error on register', resp);
				})
			}
		
		// Init

	});

})(angular)