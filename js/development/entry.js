// Libraries
// Angularjs 
require('angular');
require('angular-resource');
// Other
require('angular-ui-router');
require('ng-file-upload');

// Entities
// DOM
require('./entities/DOM/HTMLAttribute.js');
require('./entities/DOM/HTMLElement.js');
// Html Containers
require('./entities/htmlContainers/BaseContainer.js');
require('./entities/htmlContainers/ImageCompressionContainer.js');
require('./entities/htmlContainers/ImageCompressionStatistics.js');
// Javascript 
// Arrays
require('./entities/javascript/array/ApplicationArray.js');
// Map
require('./entities/javascript/map/ApplicationMap.js');
// Object 
require('./entities/javascript/object/ApplicationObject.js');
// String
require('./entities/javascript/string/ApplicationSting.js');

// Angularjs 
require('./angular/app.module.js');

// Routes
require('./angular/routes/Configuration.js');
require('./angular/routes/app.routes.js');


// Helpers
require('./angular/helpers/AttributeHelper.js');

// Directives
// ChangeImageDimensionDirective
require('./angular/directives/changeImageDimension/ChangeImageDimensionDirective.js');
require('./angular/directives/changeImageDimension/index.js');
// GetImageDetailsDirective
require('./angular/directives/getImageDetails/GetImageDetailsDirective.js');
require('./angular/directives/getImageDetails/index.js');
// ng-compression-file-upload
// NgFileUploadHelpers
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/entities/FileUploadOption.js'); 
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/entities/ImageUploadOption.js');
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/NgFileUploadElement.js');
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/NgFileUploadInfoElement.js');
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/NgFileUploadProgressBar.js')
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/FileUploadHelper.js');

// Controllers
require('./angular/directives/ng-compression-file-upload/controllers/CompressionFileUploadController.js');
require('./angular/directives/ng-compression-file-upload/CompressionFileUpload.js');
require('./angular/directives/ng-compression-file-upload/index.js');

// Image Compression Controller
// Helpers
require('./angular/controllers/imageCompression/helpers/AngularConstants.js');
require('./angular/controllers/imageCompression/helpers/AngularHelper.js');
require('./angular/controllers/imageCompression/helpers/WatchHelper.js');
// Controller
require('./angular/controllers/imageCompression/ImageCompressionController.js');
// Route
require('./angular/controllers/imageCompression/ImageCompression.Route.js');
require('./angular/controllers/imageCompression/ImageCompression.Module.js');
