(function(ang) {
	var app = ang.module('app');

	app.directive('appContent', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/modules/admin/app/main.html',
			controller: 'appController'
		}
	})

})(angular)