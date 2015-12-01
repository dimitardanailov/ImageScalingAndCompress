import moduleName from 'angular/app.module';
import ImageCompressionRouteConfiguration from './ImageCompression.Route.js';

angular
	.module(moduleName + '.imagecompression', [
		'ui.router', 
		'ngFileUpload'
	])
	.config(ImageCompressionRouteConfiguration);

Image.prototype.updateLocation = function(scope) {
	this.src = `images/${scope.activeFileType.type}/${scope.activeImage.filename}${scope.activeFileType.extension}`;
};

Array.prototype.first = function() {
	if (this.length > 0) {
		return this[0];
	}
};
