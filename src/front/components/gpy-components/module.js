(function (ang) {
	
	var app = ang.module('gpyComponents', []);

	app.factory('gpyComponents', function () {
		return {};
	});

	// Main
	app.directive('gpyComponents', function () {
		return {
			restrict: 'EA',
			templateUrl: '/front/components/gpy-components/module.html',
			scope: {}
		}
	})

	// Loading
	app.directive('gpyLoading', function () {
		return {
			restrict: 'EA',
			template: '<button ng-if="loading" style="border:none;opacity:0.5;background:#eee;" class="gpy-cover"><img src="/front/components/gpy-components/loading.gif"></button>',
			scope: {},
			controller: function ($scope, gpyComponents) {
				gpyComponents.loading = {};
				gpyComponents.loading.start = function () {
					$scope.loading = true;
				}
				gpyComponents.loading.stop = function () {
					$scope.loading = false;
				}
			}
		}
	})


})(angular);