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
    }

    /**
 	* Create all elements and append these elements to parent node.
 	*/
	initialize() {
		// Main Wrapper
		this.mainWrapper = document.createElement('div');
		this.mainWrapper.setAttribute('class', this.imageFrameClassName);

		this.createImage();
		this.parentElement.appendChild(this.mainWrapper);
	}

	/**
	 * Create new Image and append this image to main wrapper.
	 */
	createImage() {
		const imageWithOptimization = new Image();
		imageWithOptimization.src = this.imageCompressionStatistics.path + this.imageCompressionStatistics.filename;

		this.mainWrapper.appendChild(imageWithOptimization);
	}

	static createAndInitialize(parentElementId, imageCompressionStatistics) {
		const reference = new ImageCompressionContainer(parentElementId, imageCompressionStatistics);
		reference.initialize();
	}
}

