var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe($.inject(gulp.src(bowerFiles(), {
            read: false
        }), {
            name: 'bower'
        }))
        .pipe($.inject(gulp.src(['./src/**/*.module.js', './src/**/*.js', './lib/**/**/jasmine.js', './lib/**/**/jasmine-*.js','./lib/**/**/*.js'], {read: false}), {relative: true}))
        .pipe(gulp.dest('src'));
});