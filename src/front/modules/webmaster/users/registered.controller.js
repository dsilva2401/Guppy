(function (ang) {
	
	var app = ang.module('app');

	app.controller('usersRegisteredController', function ($scope, $http, $state, $resources) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadUsers = function () {
				$scope.methods.startLoading();
				$scope.models.currentPage = 0;
				$scope.models.noMoreResults = false;
				$resources.Users.get()
				// Success
				.then(function (resp) {
					$scope.methods.stopLoading();
					console.log('Users loaded', resp);
					$scope.models.users = resp.data;
				})
				// Error
				.catch(function (resp) {
					$scope.methods.stopLoading();
					console.warn('Error loading users', resp);
				})
			}
			$scope.methods.loadMore = function () {
				$scope.methods.startLoading();
				$scope.models.currentPage++;
				$resources.Users.get({
					urlParams: { query: 'page='+$scope.models.currentPage }
				})
				// Success
				.then(function (resp) {
					if (!resp.data.length) $scope.models.noMoreResults = true;
					console.log('Users loaded', resp);
					$scope.models.users = $scope.models.users.concat(resp.data);
					$scope.methods.stopLoading();
				})
				// Error
				.catch(function (resp) {
					console.warn('Error loading users', resp);
					$scope.methods.stopLoading();
				})
			}
		
		
		// Init
			$scope.methods.loadUsers();
			

	});

})(angular)