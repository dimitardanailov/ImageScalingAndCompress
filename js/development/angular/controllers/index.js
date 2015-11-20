import HomeController from 'HomeController';

(function () {

    angular
        .module("ImageScalingAndCompress")
        .controller("HomeCtrl", HomeController);

    Image.prototype.updateLocation = function(scope) {
        this.src = `images/${scope.activeFileType.type}/${scope.activeImage.filename}${scope.activeFileType.extension}`;
    };

    Array.prototype.first = function() {
        if (this.length > 0) {
            return this[0];
        }
    };
})();