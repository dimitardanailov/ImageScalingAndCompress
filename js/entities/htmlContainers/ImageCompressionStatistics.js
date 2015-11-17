/**
 * Represents a information for image (filesize, dimensions and etc.).
 *
 * @constructor
 * @param {string} parentElementId - Access to parent element.
 * @param {string} imageCompressionStatistics - Information from Backend.
 */
var ImageCompressionStatistics = function(parentElementId, imageCompressionStatistics) {
	// Constants
	this.labelsClassName = ''
	this.valuesClassName = '';

	this.parentElement = document.getElementById(parentElementId);

	if (document.body.contains(this.parentElement)) {
		this.imageCompressionStatistics = imageCompressionStatistics;
		this.initialize();
	} else {
		throw 'Element not exist in DOM.';
	}
};

/**
 * Create all elements and append these elements to parent node.
 */
ImageCompressionStatistics.prototype.initialize = function() {
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
};

/**
 * Create all elements and append these elements to parent node.
 * 
 */
ImageCompressionStatistics.prototype.createImageSizeInformation =  function() {
	var listItemImageSize = document.createElement('li');
	this.generateListItemChild(listItemImageSize, 'File size in kilobytes:', this.labelsClassName);
	this.generateListItemChild(listItemImageSize, this.imageCompressionStatistics.fileSize['kilobytes'], this.valuesClassName)

    this.list.appendChild(listItemImageSize);
};

/**
 * Create list item for each dimension property.
 */
ImageCompressionStatistics.prototype.createImageDimensionsInformation = function() {
	var dimensionsKeys = [
		{ 'keyName': 'width', 'labelName': 'Width:' }, 
		{ 'keyName': 'height', 'labelName': 'Height:' }
	];

	var listItemDimensionProperty = null, _this = this,  value;
	dimensionsKeys.forEach(function(dimensionsKey) {
		listItemDimensionProperty = document.createElement('li');
		// Label
		_this.generateListItemChild(listItemDimensionProperty, dimensionsKey.labelName, _this.labelsClassName);
		
		// Value
		var value = _this.imageCompressionStatistics.dimensions[dimensionsKey.keyName];
		_this.generateListItemChild(listItemDimensionProperty, value, _this.valuesClassName);
		
		_this.list.appendChild(listItemDimensionProperty);
	});
};

/**
 * Create a list item child (label or value).
 *
 * @param {object} parentElement - Access to parent list item element.
 * @param {string} innerHTML - Text message of span element.
 * @param {string} className
 */
ImageCompressionStatistics.prototype.generateListItemChild = function(parentElement, innerHTML, className) {
	// Label
	var label = document.createElement('span');
	label.innerHTML = innerHTML;
	label.setAttribute('class', className);

    parentElement.appendChild(label);
};