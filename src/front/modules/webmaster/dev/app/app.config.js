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
						templateUrl: '/front/modules/webmaster/dev/system-logs/general.html',
						controller:'systemLogsGeneralController'
					})
					.state('systemLogs.serverErrors', {
						url: '/server-errors',
						templateUrl: '/front/modules/webmaster/dev/system-logs/server-errors.html'
					})
					.state('systemLogs.clientErrors', {
						url: '/client-errors',
						templateUrl: '/front/modules/webmaster/dev/system-logs/client-errors.html'
					})
					.state('systemLogs.serverErrorDetails', {
						url: '/server-error-details/:errorId',
						templateUrl: '/front/modules/webmaster/dev/system-logs/server-error-details.html',
						controller: 'systemLogsServerErrorDetailsController'
					})
				.state('users', {
					url: '/users',
					template: '<div class="cover" ui-view></div>'
				})
					.state('users.registered', {
						url: '/registered',
						templateUrl: '/front/modules/webmaster/dev/users/registered.html',
						controller: 'usersRegisteredController'
					})


	});


})(angular);