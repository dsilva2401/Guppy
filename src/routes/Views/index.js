module.exports = function ($) {
	var r = {};

	r.webmaster = function (req, res) {
		if (!req.webmasterInSession) {
			res.sendFile(
				$.global.path.join(__dirname,'../../front/modules/webmaster-login/index.html')
			);
			return;
		}
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/webmaster/index.html')
		);
	}

	r.register = function (req, res) {
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/register/index.html')
		);
	}

	return r;
}