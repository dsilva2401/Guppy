module.exports = function ($) {
	var c = {};

	c.Logs = require('./Logs')($);
	c.Users = require('./Users')($);

	return c;
}