(function () {

		/*
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
		    		element.bind('focus', function(event) {
				      	WatchHelper.addWatcherForScaleOptionDimension(scope, attrs.dimensionKey);
					});
        		}
			}
		}) */
})();

const moduleName = 'ImageScalingAndCompress';

angular
	.module(moduleName, ['ngResource', 'ngRoute', 'ngFileUpload']);

export default moduleName;