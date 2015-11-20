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
			'bestFit': scope.scaleOptions.proportionally,
			'interlaceSchemeIsEnable': scope.scaleOptions.progressiveImageRendering
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

export default AngularHelper;