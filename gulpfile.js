var gulp         = require('gulp');
var sass         = require('gulp-sass');
var nodemon      = require('nodemon');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['sass', 'scripts', 'imgs', 'browserSync'], function(){});

gulp.task('sass', function(){
  return gulp.src('./src/sass/main.sass')
            .pipe(sass())
            .pipe(plumber())
            .pipe(autoprefixer({
              browser: ['last 2 versions'],
              cascade: false
            }))
            .pipe(gulp.dest('./public/css/'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function(){
  return gulp.src('./src/js/functions.js')
              .pipe(uglify())
              .pipe(plumber())
              .pipe(gulp.dest('./public/min-js/'))
              .pipe(browserSync.reload({stream: true}));
});

gulp.task('imgs', function(){
  return gulp.src('./src/imgs/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/imgs/'));
});

gulp.task('browserSync', ['nodemon'], function(){
  browserSync.init(null, {
    proxy: 'http://localhost:6000',
    files: ['view/index.pug'],
    browser: 'google chrome',
    port: 7000
  });

  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./**/*.pug').on('change', browserSync.reload);
});

gulp.task('nodemon', function(cb) {
  var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {

		if (!started) {
			cb();
			started = true;
		}
	});
})
