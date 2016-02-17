module.exports = function ($) {
	var c = {};

	c.Logs = require('./Logs')($);
	c.Users = require('./Users')($);
	c.Roles = require('./Roles')($);

	return c;
}