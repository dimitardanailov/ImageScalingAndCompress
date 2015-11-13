(function () {

	'use strict';

	angular.module('ImageScalingAndCompress', ['ngResource', 'ngRoute'])
		.config(configuration)

		.directive('getImageDetails', function () { 
			return {
				restrict: 'A',
		    	link: function(scope, element, attrs) {
		    		element.bind('load', function() {
		    			/*
		    			scope[attrs.ngModel] = {
		    				'width': this.width,
		    				'height': this.height
		    			};

		    			if (typeof FileReader !== "undefined") {
		    				console.log(FileReader);
		    			}

		    			// var size = document.getElementById('myfile').files[0].size;
		    			console.log(document.getElementById('myfile').files);
		    			console.log(scope[attrs.ngModel]['height']);
		    			*/
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

	    	var container = document.getElementById('js-dynamic-image');

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
	    		// Remove childs
    			while (container.firstChild) {
					container.removeChild(container.firstChild);
				}

	    		var compressInformation = {
	    			'quality': $scope.imageQuality,
	    			'image': $scope.activeImage.filename,
	    			'filetype': $scope.activeFileType
	    		};

	    		$http.post("compress.php", compressInformation).success(function (data, status, headers, config) {
                    var imageWithOptimization = new Image();
                    imageWithOptimization.src = data.imageWithOptimization.path + data.imageWithOptimization.name;

                    container.appendChild(imageWithOptimization);

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
	    }

	    Image.prototype.updateLocation = function($scope) {
	    	this.src = 'images/' + $scope.activeFileType.type + '/' + $scope.activeImage.filename + $scope.activeFileType.extension;
	    };

	    Array.prototype.first = function() {
	    	if (this.length > 0) {
	    		return this[0];
	    	}
	    };
})();