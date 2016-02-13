module.exports = function ($) {
	var c = {};

	c.WebmasterAccess = require('./WebmasterAccess')($);
	c.Access = require('./Access')($);

	return c;
}