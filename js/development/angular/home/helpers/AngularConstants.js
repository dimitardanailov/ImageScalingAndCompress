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
    		'proportionally' : true,
    		'progressiveImageRendering': false
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

export default AngularConstants;