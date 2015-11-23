/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 */

import gulp from 'gulp';

// Babel
import babel from 'gulp-babel';

//Imagemin
import gulpimagemin from 'gulp-imagemin';
import imageminpngquant from 'imagemin-pngquant';

// Contact and ordering
import concat from 'gulp-concat';
import order from 'gulp-order';
import wrap from 'gulp-wrap';
import streamqueue from 'streamqueue';
import runSequence from 'run-sequence';

// Cleaning filesystem
import del from 'del';

// Minification Javascript and Browserify
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import babelify from 'babelify';

// Minification CSS
import minifyCss from 'gulp-minify-css';

// Custom Modules
import gulpErrorHandling from './custom-modules/gulp-error-handling'

// Load Javascript Configurations
import js from './configurations/javascript'

gulp.task('babel:entities', () => {
	const streamqueueFiles = streamqueue
		(
			{ objectMode: true },
			gulp.src(js.configuration.folderStructure.entities.htmlContainers + '/BaseContainer.js'),
			gulp.src(js.configuration.folderStructure.entities.htmlContainers + '/ImageCompressionContainer.js'),
			gulp.src(js.configuration.folderStructure.entities.htmlContainers + '/ImageCompressionStatistics.js')
		);

	return GulpHelper.transformFilesToEcmaScriptSixAndConcat(streamqueueFiles, js.configuration.concatenationLocations.temp.entities);
});

gulp.task('babel:angularjs', () => {
	const streamqueueFiles = streamqueue
		(
			{ objectMode: true },
			gulp.src(js.configuration.folderStructure.angular.base + '/app.module.js'),

			// Routes
			gulp.src(js.configuration.folderStructure.angular.base + '/configurations/Configuration.js'),
			gulp.src(js.configuration.folderStructure.angular.base + '/app.routes.js'),

			// Home Controller - Helpers
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/helpers/AngularConstants.js'),
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/helpers/AngularHelper.js'),
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/helpers/FileUploadHelper.js'),
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/helpers/WatchHelper.js'),

			// Home Controller
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/index.js'),
			gulp.src(js.configuration.folderStructure.angular.base + '/controllers/home/HomeController.js')
		);

	return GulpHelper.transformFilesToEcmaScriptSixAndConcat(streamqueueFiles, js.configuration.concatenationLocations.temp.angular);
});

gulp.task('concat:javascript-libraries', function() {
	return streamqueue
		(
			{ objectMode: true },

			// ng - file - upload
			gulp.src('./node_modules/ng-file-upload/dist/ng-file-upload-shim.js'),
			gulp.src('./node_modules/ng-file-upload/dist/ng-file-upload.js')
	)
	.pipe(wrap('//<%= file.path %>\n<%= contents %>'))
	// We will use .min prefix, because we want do not have problems with html include.
	.pipe(concat(js.configuration.concatenationLocations.base.libraries))
	.pipe(gulp.dest(js.configuration.folderStructure.baseProduction))
	.on('error', gulpErrorHandling.onWarning);
});

/**
 * Task will contact all javascript project files.
 */
gulp.task('concat:javascript-project-files', ['babel:entities', 'babel:angularjs'], () => {
	return gulp.src(js.configuration.folderStructure.baseProduction + '/*.js')
		.pipe(order(js.configuration.tempFiles, { base: './' }))
		// We will use .min prefix, because we want do not have problems with html include.
		.pipe(concat(js.configuration.concatenationLocations.base.projectfiles))
		.pipe(gulp.dest(js.configuration.folderStructure.baseProduction))
		.on('error', gulpErrorHandling.onWarning);
});

/**
 * Task will execute
 * - first concatenation of javascript libraries
 * - and after that we will append project styles
 * - the last step: Merge libraries concatenation and project files.
 */
gulp.task('concat:javascript', ['concat:javascript-project-files'], () => {
	return streamqueue({ objectMode: true },
			gulp.src(js.configuration.minifyLocations.libraries),
			gulp.src(js.configuration.minifyLocations.projectfiles)
		)
		// We will use .min prefix, because we want do not have problems with html include.
		.pipe(concat(js.configuration.concatenationLocations.mainfile))
		.pipe(gulp.dest(js.configuration.folderStructure.baseProduction))
		.on('error', gulpErrorHandling.onWarning);
});

/**
 * Browserify has become an important and indispensable tool but requires being wrapped before working well with gulp. 
 * Below is a simple recipe for using Browserify with transforms.
 * See also: the Combining Streams to Handle Errors recipe for handling errors with browserify or uglify in your stream.
 * 
 * Source: https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md
 */
gulp.task('browserify-transform', () => {
	
  	// set up the browserify instance on a task basis
	const b = browserify({
    	entries: `${js.configuration.folderStructure.baseDevelopment}/entry.js` ,
    	debug: true,
    	// defining transforms here will avoid crashing your stream
    	transform: [babelify]
  	});

	return b.bundle()
	    .pipe(source('browserify.js'))
	    .pipe(buffer())
	    .pipe(gulp.dest(js.configuration.folderStructure.baseProduction));

});

/**
 * Task will delete application production files.
 */
gulp.task('contact:clear-main-files', () => {
	const javascriptMainFile = `${js.configuration.folderStructure.baseProduction}/${js.configuration.concatenationLocations.mainfile}`;

	del([
		javascriptMainFile
	]);
});

/**
  * Task will delete concatenation temp files.
  */
gulp.task('concat:clean-temp-javascript-files', () => {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
	let javascriptFiles = js.configuration.baseFiles;
	javascriptFiles.push(...js.configuration.tempFiles);

	del(javascriptFiles, (error, paths) => {
	});
});

gulp.task('concat:styling');

/**
  * This will run in this order:
  * 1) contact:clear-main-files - Will prepare production directory
  * 2) concat:styling and concat:javascript - in parallel
  * 3) concat:clean-temp-javascript-files
  * 4) browserify-transform
  * 5) Finally call the callback function
  */
gulp.task('concat', (callback) => {
	runSequence(
		'contact:clear-main-files',
		['concat:styling', 'concat:javascript'],
		'browserify-transform',
		'concat:clean-temp-javascript-files',
		callback
	);
});

/**
 * Minify application styling file.
 * This task will be used only in production.
 */
gulp.task('minify:styles', function() {
});


/**
 * Minify application javascript file.
 * This task will be used only in production.
 */
gulp.task('minify:javascript', function() {
	const locationOfApplicationFile = js.configuration.folderStructure.baseProduction + '/' + js.configuration.concatenationLocations.mainfile;

    return gulp.src(locationOfApplicationFile)
    	.pipe(sourcemaps.init())
        	.pipe(uglify())
        .pipe(sourcemaps.write('/', { addComment: false }))
        .pipe(gulp.dest(js.configuration.folderStructure.baseProduction))
		.on('error', gulpErrorHandling.onWarning);
});

/**
  * This will run in this order:
  * 1) concat
  * 2) minify:javascript and minify:styles - in parallel
  * 3) Finally call the callback function
  */
gulp.task('minify', function(callback) {
	runSequence('concat',
				['minify:javascript', 'minify:styles'],
				callback);
});

class GulpHelper {

	/**
	 * Method receive pipe with files (streamqueueFiles). 
	 * Babel create pipe: In this pipe we store transformation from EcmaScript 2015 to EcmaScript 5.
	 * Final step of concatenation these files.
	 *
	 * @param {object} streamqueueFiles
	 * @param {string} fileConcatenationName 
	 */
	static transformFilesToEcmaScriptSixAndConcat(streamqueueFiles, fileConcatenationName) {
		return streamqueueFiles
			.pipe(babel())
			.pipe(wrap('//<%= file.path %>\n<%= contents %>'))
			// We will use .min prefix, because we want do not have problems with html include.
			.pipe(concat(fileConcatenationName))
			.pipe(gulp.dest(js.configuration.folderStructure.baseProduction))
			.on('error', gulpErrorHandling.onWarning);
	}
}