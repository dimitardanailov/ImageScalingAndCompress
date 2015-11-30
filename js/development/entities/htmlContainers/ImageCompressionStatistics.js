import BaseContainer from './BaseContainer';

class ImageCompressionStatistics extends BaseContainer {

	/**
 	 * Represents a information for image (filesize, dimensions and etc.).
 	 *
 	 * @constructor
 	 * @param {string} parentElementId - Access to parent element.
 	 * @param {object} imageCompressionStatistics - Information from Backend.
 	 */
    constructor(parentElementId, imageCompressionStatistics) {
        super(parentElementId);

        // Constants
        this.listClassName = 'image-compression-statistics-list reset-list';
		this.labelsClassName = '';
		this.valuesClassName = 'image-compression-statistics-list-item-value';

		this.imageCompressionStatistics = imageCompressionStatistics;

		this.removeParentNodeChildren();

		// Main Node
		this.list = document.createElement('ul');
		this.list.setAttribute('class', this.listClassName);
    }

	/**
 	* Create all elements and append these elements to parent node.
 	*/
	initialize() {		
		// Filesize Node
		if (this.imageCompressionStatistics.hasOwnProperty('fileSize')) {
			this.createImageSizeInformation();	
		} else {
			throw 'Invalid object. Object should to have information for image fileSize.';
		}

		// Dimensions Information
		this.createImageDimensionsInformation();

		this.parentElement.appendChild(this.list);
	}

	/**
 	 * Create all elements and append these elements to parent node.
     * 
     */
	createImageSizeInformation() {
		const listItem = document.createElement('li');
		this.generateListItemChild(listItem, 'File size in kilobytes:', this.labelsClassName);
		this.generateListItemChild(listItem, this.imageCompressionStatistics.fileSize['kilobytes'], this.valuesClassName)

	    this.list.appendChild(listItem);
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

	static createAndInitialize(parentElementId, imageCompressionStatistics) {
		const reference = new ImageCompressionStatistics(parentElementId, imageCompressionStatistics);
		reference.initialize();
	}
}

export default ImageCompressionStatistics;