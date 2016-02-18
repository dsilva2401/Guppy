(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Resources
			$resourcesProvider.init({
				resources: {

					Users: {
						route: '/api/v1/users/:userId?:query'
					},

					Logout: {
						route: '/auth/v1/logout'
					}
				}
			});			

		// Router
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('users', {
					url: '/users',
					template: '<div class="cover" ui-view></div>'
				})
					.state('users.registered', {
						url: '/registered',
						templateUrl: '/front/modules/app-admin/users/registered.html',
						controller: 'usersRegisteredController'
					})
				.state('surveys', {
					url: '/surveys',
					template: '<div class="cover" ui-view></div>'
				})
					.state('surveys.create', {
						url: '/create',
						templateUrl: '/front/modules/app-admin/surveys/create.html',
						controller: 'surveysCreateController'
					})


	});


})(angular)