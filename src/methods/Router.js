module.exports = function ($) {
	var Router = {};
	var db = $.methods.Database('main');
	
	Router.getRouters = function () {
		var _routers = {};
		var routers = {};
		$.app._router.stack.forEach(function (router) {
			if ( ( router.handle.stack || []).length ) {
				var cr = '';
				var rp = ''
				if ( router.regexp.fast_slash ) { cr = 'viewsRouter'; rp = ''; }
				if ( router.regexp.test('/auth/v1') && !cr ) { cr = 'authRouter'; rp = '/auth/v1'; }
				if ( router.regexp.test('/api/v1') && !cr ) { cr = 'apiRouter'; rp = '/api/v1'; }
				routers[cr] = {};
				routers[cr].regexp = router.regexp.source;
				routers[cr].routes = [];
				routers[cr].path = rp;
				router.handle.stack.forEach(function (r) {
					if (r.route.path == '/*') return;
					var fpath = router.regexp.source;
					fpath = fpath.substring( 0, fpath.indexOf('?')-2 );
					fpath = fpath+r.regexp.source.substring(1, r.regexp.source.length);
					routers[cr].routes.push({
						path: rp+r.route.path,
						method: Object.keys(r.route.methods)[0],
						regexp: fpath
					})
				})

			}
		});
		return routers;
	}
	
	return Router;
}