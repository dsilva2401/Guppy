(function (ang) {
	
	var app = ang.module('app');

	app.directive('appContainer', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/modules/app-admin/dev/app/app.html',
			controller: 'appController'
		}
	});

})(angular);