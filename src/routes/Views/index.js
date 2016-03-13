module.exports = function ($) {
	var envDir = ($.config.prod ? 'dist' : 'dev');
	var r = {};

	r.webmaster = function (req, res) {
		if (!req.webmasterInSession) {
			res.sendFile(
				$.global.path.join(__dirname,'../../front/modules/webmaster-login/'+envDir+'/index.html')
			);
			return;
		}
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/webmaster/'+envDir+'/index.html')
		);
	}

	r.register = function (req, res) {
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/register/'+envDir+'/index.html')
		);
	}

	r.login = function (req, res) {
		res.sendFile(
			$.global.path.join(__dirname,'../../front/modules/login/'+envDir+'/index.html')
		);
	}

	return r;
}