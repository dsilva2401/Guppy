module.exports = function ($) {
	var r = {};
	var Database = $.methods.Database;
	var Response = $.methods.Response;
	var Router = $.methods.Router;
	var db = $.methods.Database('main');

	r.getAll = function (req, res, next) {
		var viewsRouter = Router.getRouters().viewsRouter;
		Response.success(req, res, next)(viewsRouter.routes);
	}	

	return r;
}