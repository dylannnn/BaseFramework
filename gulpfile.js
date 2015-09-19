// Include gulp and plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    //sass = require('gulp-sass'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    lessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new lessPluginCleanCSS({ advanced: true }),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new lessPluginAutoPrefix({ browsers: ["last 2 versions"] });

// Lint Task
gulp.task('lint', function() {
    return gulp.src('components/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Compile Less
gulp.task('less', function() {
    return gulp.src('components/less/*.less')
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('components/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('components/js/*.js', ['lint', 'scripts']);
    //gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('components/less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['lint', 'less', 'scripts', 'watch']);