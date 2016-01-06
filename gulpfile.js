var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('serve', function () {
  var started = false;

  return $.nodemon({
    script: 'app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    port: 7000
  });
});

// Compiles the SASS files and moves them into the 'assets/stylesheets' directory
gulp.task('styles', function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src('src/sass/**/*.scss')
    .pipe($.sass({outputStyle: 'compressed'}))
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer('last 2 versions', { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest('public/stylesheets/'))
    // Outputs the size of the CSS file
    .pipe($.size({title: 'styles'}))
});

// For images, get a key from https://tinypng.com/developers
gulp.task('images', function () {
  gulp.src('src/images/**/*.{png,jpg,jpeg}')
  .pipe($.tinypng({
      key: '[YOUR_KEY]',
      sigFile: 'public/images/.tinypng-sigs',
      log: true
  }))
  .pipe(gulp.dest('public/images'));
});

gulp.task('watch', function () {
  gulp.watch(['src/sass/**/*.scss'], ['styles', 'browser-sync-reload']);
  gulp.watch(['src/images/**/*.{png,jpg,jpeg}'], ['images', 'browser-sync-reload']);
  gulp.watch('views/**/*').on("change", browserSync.reload);
  gulp.watch('app.js').on("change", browserSync.reload);
});

gulp.task('browser-sync-reload', function() {
  browserSync.reload;
});

/*
TODO:
  * Running tests
  * Linting / uglifying local JS
*/

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['serve', 'browser-sync', 'images', 'styles', 'watch']);
