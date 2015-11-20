export class WatchHelper {
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

		if (scope.unbindWatcherScaleOptionDimension.watcherEvent != null && 
			scope.unbindWatcherScaleOptionDimension.key != scaleOptionDimensionKey) {

			// We need to kill previous watcher event.
			scope.unbindWatcherScaleOptionDimension.watcherEvent();
		}

		scope.unbindWatcherScaleOptionDimension.key = scaleOptionDimensionKey;

		scope.unbindWatcherScaleOptionDimension.watcherEvent = scope.$watch(`scaleOptions.dimensions.${scaleOptionDimensionKey}`, function() {
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