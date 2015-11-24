import WatchHelper from './../../controllers/home/helpers/WatchHelper'

/**
 * We need to change dimensions simultaneously, when width or height is changed.
 */
class ChangeImageDimensionDirective {

	constructor() {
		this.restrict = 'A';
	}

	link (scope, element, attrs) {
		element.bind('focus', function() {
			WatchHelper.addWatcherForScaleOptionDimension(scope, attrs.dimensionKey);
		});
	}
}

export default ChangeImageDimensionDirective;
