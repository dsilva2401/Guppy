(function (ang) {
	
	var app = ang.module('app');

	app.directive('appContainer', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/modules/console-seed/dev/app/app.html',
			controller: 'appController'
		}
	});

})(angular);