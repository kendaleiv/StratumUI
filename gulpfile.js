/*global require*/

var gulp = require("gulp"),
    sass = require("gulp-sass");

var paths = {
    sassSource: "css/scss/*.scss",
    sassDest: "css"
};

// Compile & minify Sass
gulp.task("sass", function() {
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(gulp.dest(paths.sassDest));
});

// Watch Files For Changes
gulp.task("watch", function() {
  gulp.watch(paths.sassSource, ["sass"]);
});

// Default Task
gulp.task("default", ["sass", "watch"]);
