(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Users: {
						route: '/api/v1/users/:userId?:query'
					},

					ServerError: {
						route: '/api/v1/server-error/:errorId'
					},

					Roles: {
						route: '/api/v1/roles/:roleId'
					},

					Platforms: {
						route: '/api/v1/platforms/:platformPath'
					},

					Logout: {
						route: '/auth/v1/webmaster/logout'
					}
				}
			});			

		// Router
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('systemLogs', {
					url: '/system-logs',
					template: '<div class="cover" ui-view></div>'
				})
					.state('systemLogs.general', {
						url: '/general',
						templateUrl: '/front/modules/webmaster/system-logs/general.html',
						controller:'systemLogsGeneralController'
					})
					.state('systemLogs.serverErrors', {
						url: '/server-errors',
						templateUrl: '/front/modules/webmaster/system-logs/server-errors.html'
					})
					.state('systemLogs.clientErrors', {
						url: '/client-errors',
						templateUrl: '/front/modules/webmaster/system-logs/client-errors.html'
					})
					.state('systemLogs.serverErrorDetails', {
						url: '/server-error-details/:errorId',
						templateUrl: '/front/modules/webmaster/system-logs/server-error-details.html',
						controller: 'systemLogsServerErrorDetailsController'
					})
				.state('users', {
					url: '/users',
					template: '<div class="cover" ui-view></div>'
				})
					.state('users.registered', {
						url: '/registered',
						templateUrl: '/front/modules/webmaster/users/registered.html',
						controller: 'usersRegisteredController'
					})
				.state('roles', {
					url: '/roles',
					template: '<div class="cover" ui-view></div>'
				})
					.state('roles.manage', {
						url: '/manage',
						templateUrl: '/front/modules/webmaster/roles/manage.html',
						controller: 'rolesManageController'
					})
					.state('roles.platformsAccess', {
						url: '/platforms-access',
						templateUrl: '/front/modules/webmaster/roles/platforms-access.html',
						controller: 'rolesPlatformsAccessController'
					})


	});


})(angular)