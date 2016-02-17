(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $state, $resources, $window, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.serverErrorPopup = function (resp) {
				gpyComponents.popup.show({
					message: 'Server error, please provide this code to the administrator: '+resp.data.errorId,
					type: 'error'
				});
			}
			$scope.methods.setModules = function () {
				$scope.models.modules = [{
					name: 'Users',
					submodules: [{
						name: 'Registered users',
						state: 'users.registered'
					}]
				}]
			}
			$scope.methods.goToSubModule = function (state) {
				$state.go(state);
			}
			$scope.methods.logout = function () {
				$resources.Logout.delete().then(function (resp) {
					$window.location.reload();
				})
			}
		
		
		// Init
			$scope.methods.setModules();

	});

})(angular)