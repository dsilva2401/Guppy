(function (ang) {
	
	var app = ang.module('app');

	app.controller('rolesPlatformsAccessController', function ($scope, $http, $state, $resources, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadData = function () {
				$resources.Roles.get()
				// Success
				.then(function (resp) {
					$scope.models.roles = resp.data;
				})
				// Error
				.catch(function (resp) {
					$scope.methods.responseError(resp);
				})
				$resources.Platforms.get()
				// Success
				.then(function (resp) {
					$scope.models.platforms = resp.data;
				})
				// Error
				.catch(function (resp) {
					$scope.methods.responseError(resp);
				})
			}

		// Init
			$scope.methods.loadData();

	});

})(angular)