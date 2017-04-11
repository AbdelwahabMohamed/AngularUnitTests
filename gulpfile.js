var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe($.inject(gulp.src(['./src/**/*.module.js','./src/**/*.js','./lib/**/**/*.js'])))
        .pipe(gulp.dest('src'));
});