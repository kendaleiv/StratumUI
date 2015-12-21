/*eslint strict: [2, "global"]*/
/*global require*/

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    debug = require("gulp-debug");

var paths = {
    sassSource: "css/scss/*.scss",
    sassDest: "css"
};

// Compile & minify Sass
gulp.task("sass", function() {
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(debug())
    .pipe(gulp.dest(paths.sassDest));
});

// Watch Files For Changes
gulp.task("watch", function() {
  gulp.watch(paths.sassSource, ["sass"]);
});

// Default Task
gulp.task("default", ["sass", "watch"]);
