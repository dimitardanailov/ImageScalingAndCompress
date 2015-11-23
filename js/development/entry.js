// Libraries
require('ng-file-upload');

// Entities
// Html Containers
require('./entities/htmlContainers/BaseContainer.js');
require('./entities/htmlContainers/ImageCompressionContainer.js');
require('./entities/htmlContainers/ImageCompressionStatistics.js');

// Angularjs 
require('./angular/app.module.js');

// Routes
require('./angular/routes/Configuration.js');
require('./angular/routes/app.routes.js');

// Home Controller - Helpers
require('./angular/controllers/home/helpers/AngularConstants.js');
require('./angular/controllers/home/helpers/AngularHelper.js');
require('./angular/controllers/home/helpers/FileUploadHelper.js');
require('./angular/controllers/home/helpers/WatchHelper.js');
// Home Controller
require('./angular/controllers/home/HomeController.js');
require('./angular/controllers/home/index.js');
