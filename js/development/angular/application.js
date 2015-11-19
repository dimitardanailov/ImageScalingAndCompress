(function () {

	angular.module('ImageScalingAndCompress', ['ngResource', 'ngRoute'])
		.config(configuration)

		.directive('getImageDetails', function () { 
			return {
				restrict: 'A',
		    	link: function(scope, element, attrs) {
		    		element.bind('load', function() {
		    				
		    			// http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933
		    			const _this = this;
		    			scope.$apply(() => {
			    			scope[attrs.ngModel] = {
			    				'width': _this.width,
			    				'height': _this.height
			    			};
		    			});
		    		});
        		}
   			}
		})

		.directive('changeImageDimension', function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
		    		element.bind('blur', function(event) {
				      console.log('blur');
    				});
        		}
			}
		})

		/**
	     * @ngdoc overview
	     * @name ImageScalingAndCompress:controller:TwitterBackupCtrl
	     * @description
	     * 
	     * Main controller of the application.
	     */
	    .controller('HomeCtrl', ['$scope', '$http', '$resource', function ($scope, $http, $resource) {

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

	    	// Scope Watch
	    	WatchHelper.addWatcherForOriginalImageDetails($scope);
	    	WatchHelper.addWatcherForScaleOptionDimension($scope, 'width');
	    	WatchHelper.addWatcherForScaleOptionDimension($scope, 'height');
	    	
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
	    	
	    }]); // End HomeCtrl


	    configuration.$inject = ['$routeProvider', '$locationProvider'];
	    
		/**
	    * @ngdoc overview
	    * @name Angularjs::routes configuration
	    * @description
	    * @param $routeProvider Used for configuring routes.
	    * @param $locationProvider Use the $locationProvider to configure how the
	    */
	    function configuration($routeProvider, $locationProvider) {
	    	// Configure the routes
	    	$routeProvider

	            // View your twitter newsletters
	            .when('/', {
	                controller: 'HomeCtrl',
	                templateUrl: 'AngularTemplates/form.html'
	            });

	        // use the HTML5 History API
	        // $locationProvider.html5Mode(true);
	    };

	    Image.prototype.updateLocation = function(scope) {
	    	this.src = `images/${scope.activeFileType.type}/${scope.activeImage.filename}${scope.activeFileType.extension}`;
	    };

	    Array.prototype.first = function() {
	    	if (this.length > 0) {
	    		return this[0];
	    	}
	    };

	    /*** Class Helpers ***/
	    class AngularConstants {
	    	/**
			 * Every constant contains information for:
			 * - attribute id (We use this information to generate containers).
			 * - which back end record should to prepare for operations
			 */
		    static generateImageStatisticsConstants() {
		    	const BACKEND_KEYS = AngularConstants.generateBackendCompressionAccessibleKeys();

		    	// Image info containers
		    	var imageStatisticsContainers = [
		    		{ 'id': 'js-container-statistics-currentImage', 'jsonKey': BACKEND_KEYS.currentImageKey },
		    		{ 'id': 'js-container-statistics-imageWithOptimization', 'jsonKey': BACKEND_KEYS.imageWithOptimizationKey }
		    	];

		    	return imageStatisticsContainers;
		    };

		    static generateBackendCompressionAccessibleKeys() {
		    	return {
		    		'currentImageKey': 'currentImageDetails',
		    		'imageWithOptimizationKey': 'imageWithOptimizationDetails'
		    	};
		    };

		    static generateScaleOptions() {
		    	return { 
		    		'dimensions' : { 
		    			'width': 0, 
		    			'height': 0
		    		}, 
		    		'proportionally' : true 
	    		};
		    }

		    static generateFileTypes() {
		    	return [
	    			{ 'type': 'png', 'extension': '.png' },
	    			{ 'type': 'jpg', 'extension': '.jpg' }
	    		];
		    }

		    static generateImages() {
		    	return [
		    		{ 'filename': 'bird', 'name': 'Bird' },
		    		{ 'filename': 'kid', 'name': 'Kid'},
		    		{ 'filename': 'low-contrast', 'name': 'Low Constrast Image'},
		    		{ 'filename': 'skyline', 'name': 'Skyline'}
	    		];	
		    }
	    }

	    class AngularHelper {
		    /**
		     * Generate information for backend compression.
		     */
		    static generatePostObject(scope) {
		    	return {
	    			'quality': scope.imageQuality,
	    			'image': scope.activeImage.filename,
	    			'filetype': scope.activeFileType,
	    			'dimensions': scope.scaleOptions.dimensions,
	    			'bestFit': scope.scaleOptions.proportionally
	    		};
		    }

		    /**
		     * 1) 
		     * Generate containers with image information:
		     * 	- File size in kilobytes
			 * 	- Image Width
			 * 	- Image Height
			 * 2)
			 * Visualizes container who contains: compression image.
		     */		    
		    static generateContainersWithImageInfoAndLoadImageWithCompression(data) {
	    		if (data.hasOwnProperty('response')) {
    				const imageStatisticsContainers = AngularConstants.generateImageStatisticsConstants();
    				const BACKEND_KEYS = AngularConstants.generateBackendCompressionAccessibleKeys();

    				let statisticModule = null, 
    					backendInformation;

    				imageStatisticsContainers.forEach(function(imageStatisticsContainer) {
    					backendInformation = data.response[imageStatisticsContainer.jsonKey];
    					ImageCompressionStatistics.createAndInitialize(imageStatisticsContainer.id, backendInformation);

    					if (imageStatisticsContainer.jsonKey === BACKEND_KEYS.imageWithOptimizationKey) {
    						if (backendInformation.hasOwnProperty('filePath')) {
    							ImageCompressionContainer.createAndInitialize(imageStatisticsContainer.id, backendInformation.filePath);
    						}
    					}
    				});
    			}
		    }
	    }

	    class WatchHelper {
	    	/**
	    	 * Add watcher: 
	    	 * When image is loaded we update $scope.originalImageDetails details. 
	    	 * After that we need to update $scope.scaleOptions.dimensions
	    	 */
	    	static addWatcherForOriginalImageDetails(scope) {
	    		const scaleOptionsKeys = ['width', 'height'];
	    		scaleOptionsKeys.forEach(function(scaleOptionsKey) {
		    		scope.$watch('originalImageDetails.' + scaleOptionsKey, function() {
		    			scope.scaleOptions.dimensions[scaleOptionsKey] = this.last;

		    			const imageDimensionsAreLoaded = (scope.originalImageDetails.width > 0) && (scope.originalImageDetails.height > 0);
		    			// Update ratio information
		    			if (imageDimensionsAreLoaded && !scope.scaleOptions.dimensions.hasOwnProperty('ratio')) {
		    				scope.scaleOptions.dimensions.ratio = scope.originalImageDetails.width / scope.originalImageDetails.height;
		    			}
		    		});
	    		});
	    	}

	    	/**
	    	 * Add watcher:
	    	 * We added a watcher, when want to change width or height of image.
	    	 * If you scope.scaleOptions.proportionally is turn on we need to update another dimension value.
	    	 */
	    	static addWatcherForScaleOptionDimension(scope, scaleOptionDimensionKey) {
	    		let scaleOptionDimensionUpdateKey, mathematicalOperation;
	    		if (scaleOptionDimensionKey === 'width') {
	    			scaleOptionDimensionUpdateKey = 'height';
	    			mathematicalOperation = 'division';
	    		} else {
	    			scaleOptionDimensionUpdateKey = 'width';
	    			mathematicalOperation = 'multiplication';
	    		}

	    		scope.$watch(`scaleOptions.dimensions.${scaleOptionDimensionKey}`, function() {
	    			const propertiesAreCorrect = scope.scaleOptions.proportionally 
	    				&& this.last > 0 
	    				&& scope.scaleOptions.dimensions.hasOwnProperty('ratio');

		    		if (propertiesAreCorrect) {
			    		let tempVariable;
		    			switch (mathematicalOperation) {
		    				case 'division':
		    					tempVariable = Math.floor((this.last / scope.scaleOptions.dimensions.ratio));
		    					break;
		    				case 'multiplication':
		    					tempVariable = Math.floor((this.last * scope.scaleOptions.dimensions.ratio));
		    					break;
		    			}

		    			if (tempVariable > 0) scope.scaleOptions.dimensions[scaleOptionDimensionUpdateKey] = tempVariable;
		    		}	
	    		});
	    	}
	    }
})();