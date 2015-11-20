/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 */

import gulp from 'gulp';

require('./gulp/build.js');
require('./gulp/watch.js');

// Default Task
gulp.task('default', ['concat']);