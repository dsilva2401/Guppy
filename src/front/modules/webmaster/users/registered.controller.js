(function (ang) {
	
	var app = ang.module('app');

	app.controller('usersRegisteredController', function ($scope, $http, $state, $resources, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadUsers = function () {
				gpyComponents.loading.start();
				$scope.models.currentPage = 0;
				$scope.models.noMoreResults = false;
				$resources.Users.get()
				// Success
				.then(function (resp) {
					gpyComponents.loading.stop();
					console.log('Users loaded', resp);
					$scope.models.users = resp.data;
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.responseError(resp);
				})
			}

			$scope.methods.loadMore = function () {
				gpyComponents.loading.start();
				$scope.models.currentPage++;
				$resources.Users.get({
					urlParams: { query: 'page='+$scope.models.currentPage }
				})
				// Success
				.then(function (resp) {
					if (!resp.data.length) $scope.models.noMoreResults = true;
					console.log('Users loaded', resp);
					$scope.models.users = $scope.models.users.concat(resp.data);
					gpyComponents.loading.stop();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.responseError(resp);
				})
			}
		
		
		// Init
			$scope.methods.loadUsers();
			

	});

})(angular)