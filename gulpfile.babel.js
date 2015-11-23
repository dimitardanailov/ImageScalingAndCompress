/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 */

import gulp from 'gulp';

require('./gulp/build.js');
require('./gulp/watch.js');

gulp.task('default', ['concat']);

gulp.task('build', ['minify']);