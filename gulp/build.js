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

/**
 * Task will delete application production files.
 */
gulp.task('contact:clear-main-files', () => {
	const javascriptMainFile = `${js.configuration.folderStructure.baseProduction}/${js.configuration.concatenationLocations.mainfile}`;
	const sourceMap = javascriptMainFile + '.map';

	del([
		javascriptMainFile,
		sourceMap
	]);
});

gulp.task('browserify-transform', ['contact:clear-main-files'], () => {
 	return GulpHelper.browserifyTransform(false);
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
gulp.task('minify:javascript', ['contact:clear-main-files'], function() {
	return GulpHelper.browserifyTransform(true);
});

/**
  * This will run in this order:
  * 1) minify:javascript and minify:styles - in parallel
  * 2) Finally call the callback function
  */
gulp.task('minify', function(callback) {
	runSequence(['minify:javascript', 'minify:styles'], callback);
});

class GulpHelper {

	/**
 	 * Browserify has become an important and indispensable tool but requires being wrapped before working well with gulp. 
     * Below is a simple recipe for using Browserify with transforms.
     * See also: the Combining Streams to Handle Errors recipe for handling errors with browserify or uglify in your stream.
     * 
     * Source: https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md
     */
	static browserifyTransform(uglifyIsEnable) {
		// set up the browserify instance on a task basis
		const browserifyStream = browserify({
	    	entries: `${js.configuration.folderStructure.baseDevelopment}/entry.js` ,
	    	debug: true,
	    	// defining transforms here will avoid crashing your stream
	    	transform: [babelify]
	  	});

	  	const tempConfiguration = browserifyStream.bundle()
		    	.pipe(source(js.configuration.concatenationLocations.mainfile))
		    	.pipe(buffer())
		    	.pipe(sourcemaps.init({ loadMaps: true }))

		if (uglifyIsEnable) {
			tempConfiguration
				// Add transformation tasks to the pipeline here.
				.pipe(uglify())
				.on('error', gulpErrorHandling.onError);
		}

		return tempConfiguration
			.pipe(sourcemaps.write('/', { addComment: false }))
		    .pipe(gulp.dest(js.configuration.folderStructure.baseProduction));
	}
}