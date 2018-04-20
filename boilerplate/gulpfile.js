var gulp = require('gulp');
// Styles
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
// Tools
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var purgeSourcemaps = require('gulp-purge-sourcemaps');

const paths = {
  styles: {
    src: './app/src/styles/styles.scss',
    dest: './app/dist/'
  },
  scripts: {
    src: './app/src/styles/scripts.js',
    dest: './app/dist/'
  }
}

function serve() {

    browserSync.init({
        // server: {
        //     baseDir: "./app/"
        // }
        proxy: "static.test/boilerplate/app"
    });
}

function styles() {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];

  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(purgeSourcemaps())
    .pipe(postcss(plugins))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function watch() {
  // gulp.watch(paths.scripts.src, scripts);
  gulp.watch(["./app/src/styles/*.scss", "./app/src/styles/**/*.scss"], styles);
  gulp.watch(["./app/*.html", "./app/*.php"]).on('change', browserSync.reload);
}

gulp.task('default', gulp.parallel(serve, watch));
