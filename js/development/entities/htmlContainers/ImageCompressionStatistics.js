class ImageCompressionStatistics extends BaseContainer {
	/**
 	 * Represents a information for image (filesize, dimensions and etc.).
 	 *
 	 * @constructor
 	 * @param {string} parentElementId - Access to parent element.
 	 * @param {string} imageCompressionStatistics - Information from Backend.
 	 */
    constructor(parentElementId, imageCompressionStatistics) {
        super(parentElementId);

        // Constants
		this.labelsClassName = '';
		this.valuesClassName = '';

		this.imageCompressionStatistics = imageCompressionStatistics;

		this.initialize();
    }

	/**
 	* Create all elements and append these elements to parent node.
 	*/
	initialize() {
		// Main Node
		this.list = document.createElement('ul');

		// Filesize Node
		if (this.imageCompressionStatistics.hasOwnProperty('fileSize')) {
			this.listItemImageSize = this.createImageSizeInformation();	
		} else {
			throw 'Invalid object. Object should to have information for image fileSize.';
		}

		// Dimensions Information
		this.createImageDimensionsInformation();

		// Remove childs
		while (this.parentElement.firstChild) {
			this.parentElement.removeChild(this.parentElement.firstChild);
		}

		this.parentElement.appendChild(this.list);
	}

	/**
 	 * Create all elements and append these elements to parent node.
     * 
     */
	createImageSizeInformation() {
		const listItemImageSize = document.createElement('li');
		this.generateListItemChild(listItemImageSize, 'File size in kilobytes:', this.labelsClassName);
		this.generateListItemChild(listItemImageSize, this.imageCompressionStatistics.fileSize['kilobytes'], this.valuesClassName)

	    this.list.appendChild(listItemImageSize);
	}

	/**
 	 * Create list item for each dimension property.
     */
	createImageDimensionsInformation() {
		const dimensionsKeys = [
			{ 'keyName': 'width', 'labelName': 'Width:' }, 
			{ 'keyName': 'height', 'labelName': 'Height:' }
		];

		let listItemDimensionProperty = null, value;

		dimensionsKeys.forEach((dimensionsKey) => {
			listItemDimensionProperty = document.createElement('li');

			this.generateListItemChild(listItemDimensionProperty, dimensionsKey.labelName, this.labelsClassName);

			// Value
			const value = this.imageCompressionStatistics.dimensions[dimensionsKey.keyName];
			this.generateListItemChild(listItemDimensionProperty, value, this.valuesClassName);
			
			this.list.appendChild(listItemDimensionProperty);
		});
	}
}