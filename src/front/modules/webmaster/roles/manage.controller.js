(function (ang) {
	
	var app = ang.module('app');

	app.controller('rolesManageController', function ($scope, $http, $state, $resources, gpyComponents) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.loadRoles = function () {
				gpyComponents.loading.start();
				$resources.Roles.get()
				// Success
				.then(function (resp) {
					$scope.models.roles = resp.data;
					gpyComponents.loading.stop();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.responseError(resp);
				})
			}
			$scope.methods.createRole = function () {
				gpyComponents.loading.start();
				$resources.Roles.post({
					data: { name: $scope.models.nRoleName }
				})
				// Success
				.then(function (resp) {
					gpyComponents.loading.stop();
					console.log('Role created', resp);
					$scope.methods.hideAddForm();
					$scope.methods.loadRoles();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.hideAddForm();
					$scope.methods.responseError(resp);
				})
			}
			$scope.methods.disableRole = function (roleId) {
				if (!confirm('Disable this role?')) return;
				gpyComponents.loading.start();
				$resources.Roles.delete({
					urlParams: { roleId: roleId }
				})
				// Success
				.then(function (resp) {
					gpyComponents.loading.stop();
					console.log('Role disabled', resp);
					$scope.methods.hideAddForm();
					gpyComponents.popup.show({
						message: 'Role disabled..',
						type: 'warn'
					});
					$scope.methods.loadRoles();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.hideAddForm();
					$scope.methods.responseError(resp);
				})
			}
			$scope.methods.updateRole = function (roleId) {
				gpyComponents.loading.start();
				$resources.Roles.put({
					urlParams: { roleId: roleId },
					data: { name: $scope.models.rNewName }
				})
				// Success
				.then(function (resp) {
					gpyComponents.loading.stop();
					console.log('Role renamed', resp);
					$scope.methods.hideAddForm();
					$scope.methods.loadRoles();
				})
				// Error
				.catch(function (resp) {
					gpyComponents.loading.stop();
					$scope.methods.hideAddForm();
					$scope.methods.responseError(resp);
				})
			}
			$scope.methods.showAddForm = function () {
				$scope.models.showAddForm = true;
			}
			$scope.methods.hideAddForm = function () {
				$scope.models.nRoleName = '';
				$scope.models.showAddForm = false;
			}

		// Init
			$scope.methods.loadRoles();

	});

})(angular)