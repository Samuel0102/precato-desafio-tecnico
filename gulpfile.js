const {src, dest, watch, series} = require('gulp');
const gulpSass = require("gulp-sass")(require("node-sass"));
const uglifyCss = require('gulp-uglifycss');
const minifyHtml = require('gulp-htmlmin');

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

exports.build = series(sass, html)
exports.default = function(){
    watch('./src/**/*.scss', sass);
    watch('./src/**/*.html', html);
}