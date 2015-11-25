var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

gulp.task('build', ['less']);

gulp.task('less', function(){
    return gulp.src('./src/folderselect.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('less:watch', function(){
    gulp.watch(['./src/folderselect.less'], ['less']);
});
