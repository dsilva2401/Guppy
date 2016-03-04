(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.serverErrorPopup = function (resp) {
				gpyComponents.popup.show({
					message: 'Server error, please provide this code to the administrator: '+resp.data.errorId,
					type: 'error'
				});
			}
		
		
		// Init

	});

})(angular);