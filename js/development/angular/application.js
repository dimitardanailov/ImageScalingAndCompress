(function () {

	'use strict';

	angular.module('ImageScalingAndCompress', ['ngResource', 'ngRoute'])
		.config(configuration)

		.directive('getImageDetails', function () { 
			return {
				restrict: 'A',
		    	link: function(scope, element, attrs) {
		    		element.bind('load', function() {
		    			
		    			// http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933
		    			var _this = this;
		    			scope.$apply(function() {
			    			scope[attrs.ngModel] = {
			    				'width': _this.width,
			    				'height': _this.height
			    			};
		    			});
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

	    	// $scope.originalImageDetails = {'width': 0, 'height': 0 };

	    	$scope.originalImage = new Image();

	    	// File types
	    	$scope.filetypes = [
	    		{ 'type': 'png', 'extension': '.png' },
	    		{ 'type': 'jpg', 'extension': '.jpg' }
	    	];
	    	$scope.activeFileType = $scope.filetypes.first();
	    	$scope.setNewFileType = function() {
	    		$scope.activeFileType = $scope.filetype;
	    		$scope.originalImage.updateLocation($scope);
	    	};

	    	// Image files
	    	$scope.images = [
	    		{ 'filename': 'bird', 'name': 'Bird' },
	    		{ 'filename': 'kid', 'name': 'Kid'},
	    		{ 'filename': 'low-contrast', 'name': 'Low Constrast Image'},
	    		{ 'filename': 'skyline', 'name': 'Skyline'}
	    	];	
	    	$scope.activeImage = $scope.images.first();
	    	$scope.setNewImage = function() {
	    		$scope.activeImage = $scope.image;
	    		$scope.originalImage.updateLocation($scope);
	    	};

	    	$scope.originalImage.updateLocation($scope);

	    	// Image quality
	    	$scope.imageQuality = 100;

	    	$scope.compressImage = function() {
	    		var compressInformation = {
	    			'quality': $scope.imageQuality,
	    			'image': $scope.activeImage.filename,
	    			'filetype': $scope.activeFileType
	    		};

	    		$http.post("compress.php", compressInformation).success(function (data, status, headers, config) {
	    			
	    			if (data.hasOwnProperty('response')) {
	    				var imageStatisticsContainers = generateImageStatisticsConstants();
	    				var BACKEND_KEYS = generateBackendCompressionAccessibleKeys();

	    				var statisticModule = null, 
	    					backendInformation;

	    				imageStatisticsContainers.forEach(function(imageStatisticsContainer) {
	    					backendInformation = data.response[imageStatisticsContainer.jsonKey];
	    					statisticModule = new ImageCompressionStatistics(imageStatisticsContainer.id, backendInformation);

	    					if (imageStatisticsContainer.jsonKey === BACKEND_KEYS.imageWithOptimizationKey) {
	    						console.log(backendInformation);
	    					}
	    				});
	    			}
                    // var imageWithOptimization = new Image();
                    // imageWithOptimization.src = data.imageWithOptimization.path + data.imageWithOptimization.name;

                    // container.appendChild(imageWithOptimization);

                }).error(function (error, status, headers, config) {
                    // alert('Server Error');
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

	    /**
		 * Every constant contains information for:
		 * - attribute id (We use this information to generate containers).
		 * - which back end record should to prepare for operations
		 */
	    function generateImageStatisticsConstants() {
	    	var BACKEND_KEYS = generateBackendCompressionAccessibleKeys();

	    	// Image info containers
	    	var imageStatisticsContainers = [
	    		{ 'id': 'js-container-statistics-currentImage', 'jsonKey': BACKEND_KEYS.currentImageKey },
	    		{ 'id': 'js-container-statistics-imageWithOptimization', 'jsonKey': BACKEND_KEYS.imageWithOptimizationKey }
	    	];

	    	return imageStatisticsContainers;
	    };

	    function generateBackendCompressionAccessibleKeys() {
	    	var BACKEND_KEYS = {
	    		'currentImageKey': 'currentImageDetails',
	    		'imageWithOptimizationKey': 'imageWithOptimizationDetails'
	    	};

	    	return BACKEND_KEYS;
	    };

	    Image.prototype.updateLocation = function($scope) {
	    	this.src = 'images/' + $scope.activeFileType.type + '/' + $scope.activeImage.filename + $scope.activeFileType.extension;
	    };

	    Array.prototype.first = function() {
	    	if (this.length > 0) {
	    		return this[0];
	    	}
	    };
})();