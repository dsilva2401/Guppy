module.exports = function ($) {
	var Router = {};
	var db = $.methods.Database('main');
	
	Router.getRouters = function () {
		var routers = {};
		$.app._router.stack.forEach(function (router) {
			if ( ( router.handle.stack || []).length ) {
				if ( router.regexp.fast_slash ) {
					routers.viewsRouter = router;
				}
				if ( router.regexp.test('/auth/v1') ) {
					routers.authRouter = router;
				}
				if ( router.regexp.test('/api/v1') ) {
					routers.apiRouter = router;
				}
			}
		});
		return routers;
	}

	Router.getViewRoutes = function () {
		var viewsRouter = Router.getRouters().viewsRouter;
		console.log( viewsRouter.handle.stack )
	}

	return Router;
}