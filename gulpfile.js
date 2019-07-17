const gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  imageResize = require('gulp-image-resize'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  prettier = require('gulp-prettier'),
  gmWatch = true;

// Local Server
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});

// Sass|Scss Styles
gulp.task('styles', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('header', function () {
  return gulp.src('src/scss/header.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// JS scripts
gulp.task('scripts', function () {
  return gulp.src([
    'src/libs/jquery/dist/jquery.min.js',
    'src/libs/lazyload/lazyload.min.js',
    'src/libs/magnific/jquery.magnific-popup.min.js',
    'src/libs/slick/slick.min.js',
  ])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Mifify js (opt.)
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('prettier', function () {
  return gulp.src('src/js/index.js')
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('src/js'));
});

// HTML Live Reload
gulp.task('code', function () {
  return gulp.src('src/**/*.html')
    .pipe(browserSync.reload({ stream: true }));
});

// Images @x1 & @x2 + Compression | Required graphicsmagick (sudo apt update; sudo apt install graphicsmagick)
gulp.task('img1x', function () {
  return gulp.src('src/assets/_img/**/*.*')
    .pipe(imageResize({ width: '50%' }))
    .pipe(imagemin())
    .pipe(gulp.dest('src/img/@1x/'));
});
gulp.task('img2x', function () {
  return gulp.src('src/assets/_img/**/*.*')
    .pipe(imageResize({ width: '100%' }))
    .pipe(imagemin())
    .pipe(gulp.dest('src/img/@2x/'));
});

// Clean @*x IMG's
gulp.task('cleanimg', function () {
  return del(['app/img/@*'], { force: true });
});


// Img Processing Task for Gulp 4
gulp.task('img', gulp.parallel('img1x', 'img2x'));

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('styles', 'header'));
  gulp.watch('src/js/index.js', gulp.parallel('scripts'));
  gulp.watch('src/*.html', gulp.parallel('code'));
  gmWatch && gulp.watch('src/assets/_img/**/*', gulp.parallel('img'));
});

gmWatch ? gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'))
  : gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));



// gulp.task('scripts', function () {
//   return gulp.src('src/js/index.js')
//     .pipe(webpackStream({
//       output: {
//         filename: 'app.js',
//       },
//       module: {
//         rules: [
//           {
//             test: /\.scss$/,
//             loaders: ['style', 'css', 'sass']
//           },
//           {
//             test: /\.vue$/,
//             loader: 'vue-loader'
//           },
//           {
//             test: /\.(js)$/,
//             loader: 'babel-loader',
//             query: {
//               presets: ['env']
//             }
//           }
//         ]
//       }
//     }))
//     .pipe(gulp.dest('./app/bundle/'))
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('./app/bundle/'))
//     .pipe(browserSync.stream());
// });