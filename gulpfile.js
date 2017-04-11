var gulp = require('gulp');
var config = require('./gulp.config')();
var bowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('inject', function () {
    log("starting inject");
    return gulp.src(config.index)
        .pipe($.inject(gulp.src(bowerFiles(), {
            read: false
        }), {
            name: 'bower'
        }))
        .pipe($.inject(gulp.src(config.js, {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest(config.src));
});

gulp.task('lint', function () {
    log('Linting the code');
    return gulp.src(config.js)
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));

});
////////////////////
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}