var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')
var changed = require('gulp-changed')
var cssnano = require('gulp-cssnano')
var del = require('del')
var gulp = require('gulp')
var gulpIf = require('gulp-if')
var imagemin = require('gulp-imagemin')
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var purifycss = require('gulp-purifycss');
var runSequence = require('run-sequence')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var useref = require('gulp-useref')
var wiredep = require('wiredep').stream

var devPaths = {
  bowerFolder: 'bower_components/',
  allCss: 'src/scss/bower.scss',
  scss: 'src/scss/',
  css: 'src/css/',
  scripts: 'src/js/',
  images: 'src/img/*',
  fonts: 'src/fonts/GT_Walsheim/',
  html: 'src/',
  footerFolder: 'src/',
  footerTpl: 'src/*.html'
}
var distPaths = {
  root: 'dist/',
  css: 'dist/css/',
  scripts: 'dist/js/',
  images: 'dist/img/',
  fonts: 'dist/fonts/GT_Walsheim/',
  html: 'dist/',
  footerFolder: 'dist/'
}
var flags = {
  production: false
}

// Development Tasks 
// -----------------
// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "src/",
      routes: {"/bower_components": "bower_components"}
    }
  })
})
// Sass convert
gulp.task('sass', function() {
  return gulp.src(devPaths.scss + '**/*.scss')
    .pipe(gulpIf(!flags.production, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: [
        'last 2 versions', 
        'android 4',
        'opera 15'] }))
    .pipe(gulpIf(!flags.production, sourcemaps.write()))
    // .pipe(gulpIf(flags.production, purifycss([devPaths.html + '**/*.html'])))
    .pipe(changed(devPaths.css, { hasChanged: changed.compareSha1Digest }))
    .pipe(gulp.dest(devPaths.css))
    .pipe(browserSync.reload({
      stream: true
    }))
})
// Automatically inject Less and Sass Bower dependencies
gulp.task('bowerStyles', function () {
  return gulp.src(devPaths.allCss)
    .pipe(wiredep())
    .pipe(gulp.dest(devPaths.scss))
})
// Automatically inject js
gulp.task('bowerScripts', function () {
  return gulp.src(devPaths.footerTpl)
    .pipe(wiredep())
    .pipe(gulp.dest(devPaths.footerFolder))
})
// Copy-paste fontawesome
gulp.task('fontAwesome', function() {
  return gulp.src(devPaths.bowerFolder + 'font-awesome/fonts/*.{woff,woff2}')
    .pipe(gulp.dest(devPaths.fonts))
})
// Bower tasks
gulp.task('bower', function(callback) {
  runSequence('bowerStyles', 'bowerScripts', 'fontAwesome',
    callback
  )
})
// Watchers
gulp.task('watch', function() {
  gulp.watch(devPaths.scss + '**/*.scss', ['sass'])
  gulp.watch(devPaths.scripts + '**/*.js', browserSync.reload)
  gulp.watch(devPaths.html + '**/*.html', browserSync.reload)
  gulp.watch(['bower.json'], ['bower'])
})


// Production Tasks
// -----------------
//Clean before production
gulp.task('clean:dist', function() {
  return del.sync(distPaths.root);
})
// Contcatenation scripts
gulp.task('useref', function() {
  return gulp.src(devPaths.footerTpl)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(distPaths.footerFolder));
})
// Optimizing Images 
gulp.task('images', function() {
  return gulp.src(devPaths.images + '*')
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminJpegRecompress({
        loops:4,
        min: 50,
        max: 95,
        quality:'high' 
      }),
      imagemin.optipng()
    ]))
    .pipe(gulp.dest(distPaths.images))
})
// Copy-paste fonts
gulp.task('fonts', function() {
  return gulp.src(devPaths.fonts + '*.{otf,woff,woff2}')
  .pipe(gulp.dest(distPaths.fonts))
})

gulp.task('move_css', function() {
  return gulp.src(devPaths.css + '*.css')
  .pipe(gulp.dest(distPaths.css))
})

//Default task - dev
gulp.task('default', function(callback) {
  runSequence(['bower', 'sass', 'browserSync'], 'watch',
    callback
  )
})
gulp.task('build', function(callback) {
  flags.production = true
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts', "move_css"],
    callback
  )
})