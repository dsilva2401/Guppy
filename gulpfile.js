var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var fs = require('fs');


// Build front task
  var buildTasks = [];
  fs.readdirSync('src/front/modules').forEach(function (frontModule) {
    var buildName = 'build-'+frontModule;
    buildTasks.push(buildName);
    gulp.task(buildName, function () {
      return gulp.src('./src/front/modules/'+frontModule+'/dev/index.html')
          .pipe(usemin({
            js: [ngAnnotate(), uglify()],
            js1: [],
            css: [],
            assetsDir: 'src',
            outputRelativePath: '../../../../../src'
          }))
          .pipe(gulp.dest('src/front/modules/'+frontModule+'/dist'));
    })  
  })
  gulp.task('build', buildTasks);


// Help
  gulp.task('help', function () {
    var tasks = [
      { name: 'build', description: 'Build all front modules' }
    ];
    console.log('-----------------------------------');
    console.log('\n');
    console.log('Tasks:\n');
    tasks.forEach(function (task) {
      console.log('gulp '+task.name, '('+task.description+')');
    })
    console.log('\n');
    console.log('-----------------------------------');
  });


// Default
  gulp.task('default', ['help']);