/*
 * Author: Dimitar Danailov
 * email: dimitar.danailov@mentormate.com
 */

import gulp from 'gulp';
import gutil from 'gulp-util';

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

// Minification
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';

//Custom Modules
import gulpErrorHandling from './gulp-error-handling'
import jsConfigurations from './gulp-configurations/javascript.js'

gulp.task('babel:entities', () => {
	return streamqueue({ objectMode: true },
		gulp.src(jsConfigurations.configuration.folderStructure.entities.htmlContainers + '/BaseContainer.js'),
		gulp.src(jsConfigurations.configuration.folderStructure.entities.htmlContainers + '/ImageCompressionContainer.js'),
		gulp.src(jsConfigurations.configuration.folderStructure.entities.htmlContainers + '/ImageCompressionStatistics.js')
	)
	.pipe(babel())
	.pipe(wrap('//<%= file.path %>\n<%= contents %>'))
	// We will use .min prefix, because we want do not have problems with html include.
	.pipe(concat('entities.min.js'))
	.pipe(gulp.dest(jsConfigurations.configuration.folderStructure.baseProduction))
	.on('error', gulpErrorHandling.onWarning);
});

/**
 * Imagemin is library for minify images
 */
gulp.task('imagemin:build', () => {
	return gulp.src('')
        .pipe(gulpimagemin({
            'progressive': true,
						// svgoPlugins - https://github.com/svg/svgo
            'svgoPlugins': [{ 'removeViewBox': false}],
            'use': [imageminpngquant()]
        }))
        .pipe(gulp.dest(''));
});

/**
 * Compile Our Sass
 */
gulp.task('sass', () => {
	return gulp.src('')
		.pipe(sass({ indentedSyntax: true })
			.on('error', gulperrorhandling.onError)
		)
		.pipe(gulp.dest('css'));
});