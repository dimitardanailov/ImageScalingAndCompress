// Libraries
// Angularjs 
require('angular');
require('angular-resource');
// Other
require('angular-ui-router');
require('ng-file-upload');

// Entities
// Html Containers
require('./entities/htmlContainers/BaseContainer.js');
require('./entities/htmlContainers/ImageCompressionContainer.js');
require('./entities/htmlContainers/ImageCompressionStatistics.js');
// Javascript 
// Arrays
require('./entities/javascript/array/ApplicationArray.js');
// Object 
require('./entities/javascript/object/ApplicationObject.js');
// String
require('./entities/javascript/string/ApplicationSting.js');

// Angularjs 
require('./angular/app.module.js');

// Routes
require('./angular/routes/Configuration.js');
require('./angular/routes/app.routes.js');

// Directives
// ChangeImageDimensionDirective
require('./angular/directives/changeImageDimension/ChangeImageDimensionDirective.js');
require('./angular/directives/changeImageDimension/index.js');
// GetImageDetailsDirective
require('./angular/directives/getImageDetails/GetImageDetailsDirective.js');
require('./angular/directives/getImageDetails/index.js');
// ng-compression-file-upload
require('./angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelper.js');
require('./angular/directives/ng-compression-file-upload/controllers/CompressionFileUploadController.js');
require('./angular/directives/ng-compression-file-upload/CompressionFileUpload.js');
require('./angular/directives/ng-compression-file-upload/index.js');

// Image Compression Controller
// Helpers
require('./angular/controllers/imageCompression/helpers/AngularConstants.js');
require('./angular/controllers/imageCompression/helpers/AngularHelper.js');
require('./angular/controllers/imageCompression/helpers/WatchHelper.js');
// FileUploadHelper
require('./angular/controllers/imageCompression/helpers/FileUploadHelpers/entities/FileUploadOption.js');
require('./angular/controllers/imageCompression/helpers/FileUploadHelpers/entities/ImageUploadOption.js');
require('./angular/controllers/imageCompression/helpers/FileUploadHelpers/FileUploadHelper.js');

require('./angular/controllers/imageCompression/ImageCompressionController.js');
require('./angular/controllers/imageCompression/ImageCompression.Route.js');
require('./angular/controllers/imageCompression/ImageCompression.Module.js');
