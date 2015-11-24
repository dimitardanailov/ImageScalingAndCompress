import moduleName from './../../app.module';
import HomeController from './HomeController';

angular
	.module(moduleName)
	.controller("HomeCtrl", HomeController);

Image.prototype.updateLocation = function(scope) {
	this.src = `images/${scope.activeFileType.type}/${scope.activeImage.filename}${scope.activeFileType.extension}`;
};

Array.prototype.first = function() {
	if (this.length > 0) {
		return this[0];
	}
};
