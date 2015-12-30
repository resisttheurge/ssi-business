var gulp         	= require('gulp');
var mkdirp          = require('mkdirp');
var del             = require('del');
var shell           = require('gulp-shell');
var jetpack      	= require('fs-jetpack');

var projectDir 		= jetpack; 
var distDir     	= projectDir.cwd('./dist');
var binDir    		= projectDir.cwd('./bin');
var resourceDir     = projectDir.cwd('./resources');

gulp.task('mkdirs', function(){
    mkdirp.sync('./dist/js', function (err) {
        if (err) console.error(err)
    });
    mkdirp.sync('./dist/style', function (err) {
        if (err) console.error(err)
    });
    mkdirp.sync('./bin/js', function (err) {
        if (err) console.error(err)
    });
    mkdirp.sync('./bin/style', function (err) {
        if (err) console.error(err)
    });
});

gulp.task('clean', function(){
    del(["./dist/**"]);
    del(["./bin/**"]);
});

gulp.task('compile',['mkdirs'], shell.task([
    //'node_modules/.bin/browserify resources/js/require.js -o resources/js/require.browser.js',
    'haxe build.hxml'
]));

gulp.task('make', shell.task([
    'gulp compile',
    'cd semantic && gulp build'
]));

gulp.task('assemble', function () {
    projectDir.copyAsync(resourceDir.path(), binDir.path(), {
        overwrite: true, matching: [
            './**/*'
        ]
    });
    projectDir.copyAsync(distDir.path(), binDir.path(), {
        overwrite: true, matching: [
            './**/*'
        ]
    });
});


gulp.task('build', shell.task([
    'gulp compile',
    'gulp assemble'
]));

gulp.task('prodbuild', shell.task([
    'gulp clean',
    'gulp make',
    'gulp assemble'
]));

gulp.task('electron', ['build'], shell.task([
    '"node_modules/electron-prebuilt/dist/electron.exe" bin'
]));