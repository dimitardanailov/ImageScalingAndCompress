

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