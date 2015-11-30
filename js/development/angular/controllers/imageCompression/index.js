import moduleName from './../../app.module';
import ImageCompressionController from './ImageCompressionController';

angular
	.module(moduleName)
	.controller("ImageCompressionController", ImageCompressionController);

Image.prototype.updateLocation = function(scope) {
	this.src = `images/${scope.activeFileType.type}/${scope.activeImage.filename}${scope.activeFileType.extension}`;
};

Array.prototype.first = function() {
	if (this.length > 0) {
		return this[0];
	}
};
