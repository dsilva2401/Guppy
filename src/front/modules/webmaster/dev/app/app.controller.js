(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $state, $resources, $window, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.responseError = function (resp) {
				if (resp.status == 500) {
					gpyComponents.popup.show({
						message: 'Server error, please provide this code to the administrator: '+resp.data.errorId,
						type: 'error'
					});
					console.warn('Error in server', resp);
				}
			}
			$scope.methods.setModules = function () {
				$scope.models.modules = [{
					name: 'System logs',
					submodules: [{
						name: 'Server error details',
						state: 'systemLogs.serverErrorDetails'
					}
					/*{
						name: 'General report',
						state: 'systemLogs.general'
					},{
						name: 'Server errors',
						state: 'systemLogs.serverErrors'
					},{
						name: 'Client errors',
						state: 'systemLogs.clientErrors'
					}*/]
				}, {
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

})(angular);