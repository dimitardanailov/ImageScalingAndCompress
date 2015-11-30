import CompressionFormTemplate from './views/compressionForm.html';
import ImageCompressionController from './ImageCompressionController';

/**
 * @ngdoc function
 * @description
 */
function RouteConfiguration($stateProvider) {

	$stateProvider
		// Using a '.' within a state name declares a child within a parent.
		// So you have a new state 'homepage' within the parent 'app' state.
		.state('widgets.imagecompression', {
			url: '/',
			template: CompressionFormTemplate,
			controller: ImageCompressionController,
			controllerAs: 'ImageCompressionController'
		});
}

RouteConfiguration.$inject = ['$stateProvider'];

export default RouteConfiguration;