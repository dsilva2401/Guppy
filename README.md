Guppy: A node js framework based on ExpressJS
-----------------------------------------------------

*Guppy is an open source NodeJS Framework based on ExpressJS,
the goal is to structure code and promote good programming practices providing a seed and some rules.*

## Requirements
- npm
- gulp
- bower
- postgres
- mongodb
- docker (optional: instead of all above)

## Seed structure

```bash
app.js 			# Main file
config.js 		# App configuration
bower.json 		# Front-end dependencies
package.json 	# Back-end dependencies
gulpfile.js 	# Gulp build system configuration file
Dockerfile		# Docker image configuration file
src/ 			# App source files
	init/..
	front/..
	global/..
	models/..
	routes/..
	methods/..
	settings/..
```

## Links
- http://sequelize.readthedocs.org/en/latest/
- http://www.ijitee.org/attachments/File/v3i2/B1010073213.pdf
- https://en.wikipedia.org/wiki/Software_framework
- https://www.nsa.gov/ia/_files/support/guidelines_implementation_rest.pdf