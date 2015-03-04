var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  path = require('path')
  fs = require('fs');

var paths = {
  src: "assets",
  tmp: ".tmp",
  dst: "build"
}

gulp.task('ejs', function() {
  return gulp.src([
      paths.src + '/**/*.ejs',
      '!' + paths.src + '/**/_*.ejs'
    ])
    .pipe($.foreach(function(stream, file) {
      var dir = path.dirname(file.path),
        filename = path.basename(file.path),
        ext = path.extname(file.path),
        jsonPath = dir + '/' + filename.replace(ext, '') + '/index.json',
        json = JSON.parse(fs.readFileSync(jsonPath));

      return stream
        .pipe(gulp.src(dir + '/' + filename))
        .pipe($.ejs(json));
    }))
    .pipe(gulp.dest(paths.tmp));
});