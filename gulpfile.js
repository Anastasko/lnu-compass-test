var gulp = require('gulp');
var Mocha = require('mocha');

gulp.task('test', function () {
    const mocha = new Mocha();
    mocha.addFile('app/app.js');
    mocha.run();
});
