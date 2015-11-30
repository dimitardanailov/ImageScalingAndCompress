import BaseContainer from './BaseContainer';

class ImageCompressionContainer extends BaseContainer {
	/**
	 * Visualizes container who contains: compression image.
	 *
	 * @constructor
	 * @param {string} parentElementId - Access to parent element.
	 * @param {object} imageCompressionStatistics - Information for folder location and image name.
	 */
    constructor(parentElementId, imageCompressionStatistics) {
        super(parentElementId);

        this.imageCompressionStatistics = imageCompressionStatistics;

        this.imageFrameClassName = 'image-preview-frame';

        // Wrappers
		this.mainWrapper = document.createElement('section');
		this.imageFrameWrapper = document.createElement('div');
    }

    /**
 	* Create all elements and append these elements to parent node.
 	*/
	initialize() {
		this.createImage();
		this.parentElement.appendChild(this.mainWrapper);
	}

	/**
	 * Create new Image and append this image to main wrapper.
	 */
	createImage() {
		const imageWithOptimization = new Image();
		imageWithOptimization.src = this.imageCompressionStatistics.browserPath + this.imageCompressionStatistics.filename;

		this.imageFrameWrapper.setAttribute('class', this.imageFrameClassName);
		this.imageFrameWrapper.appendChild(imageWithOptimization);

		this.mainWrapper.appendChild(this.imageFrameWrapper);
	}

	static createAndInitialize(parentElementId, imageCompressionStatistics) {
		const reference = new ImageCompressionContainer(parentElementId, imageCompressionStatistics);
		reference.initialize();
	}
}

export default ImageCompressionContainer;
