import AngularConstants from './helpers/AngularConstants';
import AngularHelper from './helpers/AngularHelper';
import WatchHelper from './helpers/WatchHelper';

// FileUploadHelper
import ImageUploadOption from './helpers/FileUploadHelpers/entities/ImageUploadOption';
import FileUploadHelper from './helpers/FileUploadHelpers/FileUploadHelper';


class ImageCompressionController {
	constructor ($scope, $http, $timeout, Upload) {        
		// Initialize
    	$scope.originalImageDetails = { 'width': 0, 'height': 0 };
    	$scope.scaleOptions = AngularConstants.generateScaleOptions();

    	$scope.imageQuality = 100;

    	$scope.filetypes = AngularConstants.generateFileTypes();
    	$scope.activeFileType = $scope.filetypes.first();

    	$scope.originalImage = new Image();
    	// Image files
    	$scope.images = AngularConstants.generateImages();
    	$scope.activeImage = $scope.images.first();

    	$scope.originalImage.updateLocation($scope);

    	// ng-file-upload
        const uploadOptions = ImageUploadOption.generateDefaultImageOptions('upload.php');
        new FileUploadHelper($scope, $timeout, Upload, uploadOptions);
    	
    	// Scope Watch
    	WatchHelper.addWatcherForOriginalImageDetails($scope);
    	
    	/*
    	 * When you call the $watch() method, AngularJS
         * returns an unbind function that will kill the
         * $watch() listener when its called.
         * Source: http://www.bennadel.com/blog/2480-unbinding-watch-listeners-in-angularjs.htm
         */
    	$scope.unbindWatcherScaleOptionDimension = {
    		'watcherEvent': null,
    		'key': null
    	};

    	// Scope Click Events
    	$scope.setNewFileType = () => {
    		$scope.activeFileType = $scope.filetype;
    		$scope.originalImage.updateLocation($scope);
    	};
    	
    	$scope.setNewImage = () => {
    		$scope.activeImage = $scope.image;
    		$scope.originalImage.updateLocation($scope);
    	};

    	// Create a new image with compression.
    	$scope.compressImage = () => {
    		const compressInformation = AngularHelper.generatePostObject($scope);
    		$http.post("compress.php", compressInformation).success(function (data, status, headers, config) {
    			AngularHelper.generateContainersWithImageInfoAndLoadImageWithCompression(data);
            }).error(function (error, status, headers, config) {
            	alert('Server Error');
            });
    	};
	}
}

ImageCompressionController.$inject = ['$scope', '$http', '$timeout', 'Upload'];

export default ImageCompressionController;