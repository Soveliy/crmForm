let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    svg = require('gulp-svg-sprite'),
    plumber = require('gulp-plumber');
    rigger = require('gulp-rigger');


gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'assest/css/simple-scrollbar.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(rigger())
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    // 'node_modules/slick-carousel/slick/slick.js',
      'assest/js/simple-scrollbar.min.js',
      //   'node_modules/swiper/swiper-bundle.min.js',
        // 'node_modules/jquery-nice-select/js/jquery.nice-select.js',
        // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        // 'node_modules/fast-average-color/dist/index.min.js',
        // 'assest/js/simple-scrollbar.js',
        // 'assest/js/ion.rangeSlider.js',
        // 'assest/js/jquery.arcticmodal.js',
        // 'assest/js/jquery.mask.min.js',
        // 'assest/js/OverlayScrollbars.min.js',
        // 'assest/js/jquery.nice-select.min.js',
        // 'assest/js/filter-multi-select-bundle.min.js',
        
        
        // 'node_modules/overlayscrollbars/dist/overlayscrollbars.esm.js',
    // 'assest/js/aos.js',
    // 'assest/js/swiper.js',
        // 'node_modules/swiper/swiper-bundle.min.js',
    // 'assest/js/jquery.simplemarquee.js',
    // 'assest/js/mmenu.js',
    // 'assest/js/slick.js',
    // 'assest/js/dotdotdot.js',
    // 'assest/js/jquery.validate.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});



// gulp.task('svg', async function(){
//   config = {
//     shape: {
//       dimension: { // Set maximum dimensions
//         maxWidth: 100,
//         maxHeight: 100
//       },
//       spacing: { // Add padding
//         padding: 0
//       },
      
      
//     },
//     mode: {
     
//       symbol: true // Activate the «symbol» mode
//     }
//   };
 
// gulp.src('**/*.svg', { cwd: 'app/images' })
//   .pipe(plumber())
//   .pipe(svg(config))
//   .on('error', function(error) {
//     /* Do some awesome error handling ... */
//   })
//   .pipe(gulp.dest('app/images'));
// });

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));   
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel( 'css' ,'js' ,'scss', 'browser-sync', 'watch'));
// gulp.task('default', gulp.parallel( 'css' ,'scss', 'browser-sync', 'watch'));