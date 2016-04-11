/*global require*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    opn = require('opn'),
    spawn = require('spawn-cmd').spawn;

var paths = {
    sassSource: 'css/scss/*.scss',
    sassDest: 'css'
};

var server = {
  host: 'localhost',
  port: '6001',
  baseurl: '/demos/'
}

// Sass & PostCSS autoprefixer
gulp.task('sass', function() {
  gulp.src(paths.sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sassDest));
});

// local server with livereload
gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

// open it
gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port + server.baseurl);
});

function runCommand(command, commandArgs, commandOpts, cb) {
  // http://stackoverflow.com/a/10232330 but using https://www.npmjs.com/package/spawn-cmd
  var childProcess = spawn(command, commandArgs, commandOpts);

  childProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  childProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  childProcess.on('exit', function (code) {
    console.log('Running ' + command +
      ' with arguments ' + commandArgs.join(' ') +
      ' in ' + commandOpts.cwd +
      ' exited with code ' + code);

    cb();
    process.exit(code);
  });
}

gulp.task('test', ['sass', 'webserver'], function(cb) {
  runCommand('npm', ['run', 'test'], { cwd: 'node_modules/backstopjs' }, function() {
   var msg = 'View test output in the browser with: npm run test-view';
   var dashes = '-'.repeat(msg.length);

   console.log('\n' + dashes);
   console.log(msg);
   console.log(dashes + '\n');

   cb();

  });
});

gulp.task('test-update', ['sass', 'webserver'], function(cb) {
  runCommand('npm', ['run', 'reference'], { cwd: 'node_modules/backstopjs' }, cb);
});

gulp.task('test-view', ['sass', 'webserver'], function(cb) {
  runCommand('npm', ['run', 'openReport'], { cwd: 'node_modules/backstopjs' }, cb);
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sassSource, ['sass']);
});

// Default Task
gulp.task('default', ['webserver', 'openbrowser', 'sass', 'watch']);
