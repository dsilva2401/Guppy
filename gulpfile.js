var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('build', function () {

	return gulp.src('./src/front/modules/angular-seed/dev/index.html')
      .pipe(usemin({
        js: [ngAnnotate(), uglify()],
        js1: [],
        assetsDir: 'src',
        outputRelativePath: '../../../../../src'
      }))
      .pipe(gulp.dest('src/front/modules/angular-seed/dist'));
})

gulp.task('default', function () {

});