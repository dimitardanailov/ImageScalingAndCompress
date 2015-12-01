import ImageCompressionController from './ImageCompressionController';

/**
 * @ngdoc function
 * @description
 */
function ImageCompressionRouteConfiguration($stateProvider) {
	$stateProvider
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'homepage' within the parent 'app' state.
		.state('widgets.imagecompression', {
			url: '/widgets.imagecompression',
			templateUrl: 'js/development/angular/controllers/imageCompression/views/compressionForm.html',
			controller: ImageCompressionController,
			controllerAs: 'ImageCompressionController'
		});
};

ImageCompressionRouteConfiguration.$inject = ['$stateProvider'];

export default ImageCompressionRouteConfiguration;