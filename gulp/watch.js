/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 */

import gulp from 'gulp';
import gutil from 'gulp-util';

// Tracking files changes
import watch from 'gulp-watch';

// Custom Modules
import gulpErrorHandling from './custom-modules/gulp-error-handling'

// Load Javascript Configurations
import js from './configurations/javascript'

/**
  * Watch Files For Changes
  */
gulp.task('watch', function() {
	// ** - If a "globstar" is alone in a path portion, then it matches zero or more directories and subdirectories searching for matches. 
	// It does not crawl symlinked directories.
	// Documentation: https://github.com/isaacs/node-glob
	const trackingFiles = js.configuration.folderStructure.baseDevelopment + '/**';

	// By default, errors during watch should not be fatal.
	gulpErrorHandling.fatalLevel = gulpErrorHandling.fatalLevel || 'off';
	gulp.watch(trackingFiles, ['concat']);
});