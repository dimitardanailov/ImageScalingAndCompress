/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 *
 * Source and idea: https://gist.github.com/noahmiller/61699ad1b0a7cc65ae2d
 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import yargs from 'yargs';

// Command line option:
// --fatal=[warning|error|off]
const fatalLevel = yargs.argv.fatal;
exports.fatalLevel = fatalLevel;

const ERROR_LEVELS = ['error', 'warning'];

/**
 * Return true if the given level is equal to or more severe than
 * the configured fatality error level.
 * If the fatalLevel is 'off', then this will always return false.
 * Defaults the fatalLevel to 'error'.
 */
function isFatal(level) {
	return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

/**
 * Handle an error based on its severity level.
 * Log all levels, and exit the process for fatal levels.
 */
function handleError(level, error) {
	const gutilError = new gutil.PluginError({
		'plugin': error.plugin,
		'level': level,
		'message': error,
		'showStack': true
	});
	notify.onError({
		'message': "Plugin error: <%= error.plugin %>",
		'sound': true
	})(gutilError);

	if (isFatal(level)) {
		process.exit(1);
	}
}

/**
 * Convenience handler for error-level errors.
 */
exports.onError = function onError(error) {
	handleError.call(this, 'error', error);
};

/**
 * Convenience handler for warning-level errors.
 */
exports.onWarning = function(error) {
	handleError.call(this, 'warning', error);
};