module.exports = function ($) {
	var c = {};

	c.Logs = require('./Logs')($);
	c.Users = require('./Users')($);
	c.Roles = require('./Roles')($);
	c.Platforms = require('./Platforms')($);

	return c;
}