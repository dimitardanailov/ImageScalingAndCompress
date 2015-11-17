/**
 * Visualizes container who contains: compression image.
 *
 * @constructor
 * @param {string} parentElementId - Access to parent element.
 * @param {string} imageCompressionStatistics - Information for folder location and image name.
 */
var ImageCompressionContainer = function(parentElementId, imageCompressionDetails) {
	this.parentElement = document.getElementById(parentElementId);

	if (document.body.contains(this.parentElement)) {
		this.imageCompressionDetails = imageCompressionDetails;
		this.initialize();
	} else {
		throw 'Element not exist in DOM.';
	}
};

