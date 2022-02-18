const {src, dest, watch, series} = require('gulp');
const gulpSass = require("gulp-sass")(require("node-sass"));
const uglifyCss = require('gulp-uglifycss');
const minifyHtml = require('gulp-htmlmin');
const uglifyJs = require('gulp-terser');
const minifyImage = require('gulp-imagemin');

function sass(){
    return src(['./src/style.scss'])
    .pipe(gulpSass())
    .pipe(uglifyCss())
    .pipe(dest('./dist'))
}

function html(){
    return src('./src/**/*.html')
    .pipe(minifyHtml({collapseWhitespace: true}))
    .pipe(dest('./dist'))
}

function js(){
    return src('./src/**/*.js')
    .pipe(uglifyJs())
    .pipe(dest('./dist'))
}

function imgMinify() {
    return gulp.src("src/img/**/*")
    .pipe(img())
    .pipe(gulp.dest("dist/images"));
  }

exports.build = series(sass, html, js, img)
exports.default = function(){
    watch('./src/**/*.scss', sass);
    watch('./src/**/*.html', html);
    watch('./src/**/*.js', js)
}