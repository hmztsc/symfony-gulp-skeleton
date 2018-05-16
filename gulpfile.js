var gulp = require('gulp'),
    dest = require('gulp-dest'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/* if you want to run browser sync you must to create your project custom web alias */
gulp.task('browser-sync', function() {
    browserSync({
        proxy:"localhost:8000",
        ws:true,
    });
});

gulp.task('sass', function () {
    return gulp.src('web/sass/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('web/css'))
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("web/**/*.scss",['sass']);
    gulp.watch("web/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/**/*.twig").on('change', browserSync.reload);
    gulp.watch("src/**/*.php").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync','watch','sass']);