const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const rename      = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        host: "192.168.1.62",
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", gulp.parallel("styles"));
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));