import ApplicationArray from 'entities/javascript/array/ApplicationArray';
import ApplicationObject from 'entities/javascript/object/ApplicationObject';
import HTMLAttribute from 'entities/DOM/HTMLAttribute';
import HTMLElement from 'entities/DOM/HTMLElement';

class ElementCreatorHelper {

	/**
	 * Function will generate object from ng-file-upload object
	 * 
	 * @property String elementType
	 */
	constructor(elementType, attrs) {
		this.regExpPattern = 'ngcfuNgf';
		this.attributePatterName = 'ngf-';

		// Here we specify ng file attributes for our application and tracking map.
		this.attributesMap = {
			'accept': 'accept',
			'ngcfuFileUploadClassName': 'class',
			'ngModel': 'ng-model',
			'ngcfuImageOptionUploadPath': 'upload-path'
		};

		this.ngFileUploadElement = document.createElement(elementType);
		this.attrs = attrs;

		// Create a new element with text info.
		this.createChildElement();

		this.ngFileUploadHTMLAttributes = this.getNgFileUploadHTMLAttributes();
		this.addElementsAttributeInformation();
	}

	/**
	 * If ngcfuFileUploadChildAvailable exist and ngcfuFileUploadChildAvailable is equal to true, 
	 * function should to add a div with text info.
 	 */
	createChildElement() {
		if (this.attrs.hasOwnProperty('ngcfuFileUploadChildItem') && this.attrs.ngcfuFileUploadChildItem) {
			const childElement = document.createElement('div');

			// Set Class Name
			HTMLElement.setAttributeToElement(childElement, 'class', this.attrs, 'ngcfuFileUploadChildItemClassName');
			// Set innerHTML information
			HTMLElement.setInnerHTML(childElement, this.attrs, 'ngcfuFileUploadChildItemText');

			// Create drop availabe element
			this.createChildDropAvailableElement(childElement);
			// Create sub item element
			this.createChildSubItem(childElement);

			this.ngFileUploadElement.appendChild(childElement);
		}
	}

	/**
	 * If ngcfuFileUploadChildTextDropAvailable and ngcfuNgfDropAvailable exists,
	 * function should to add a span element with drop available information.
	 *
	 * @property HTMLObject parentTextElement
	 */
	createChildDropAvailableElement(parentTextElement) {
		const ngcfuFileUploadChildItemDropAvailableIsCorrect = 
			(this.attrs.hasOwnProperty('ngcfuFileUploadChildItemDropAvailable') && this.attrs.ngcfuFileUploadChildItemDropAvailable);

		if (ngcfuFileUploadChildItemDropAvailableIsCorrect && this.attrs.hasOwnProperty('ngcfuNgfDropAvailable')) {
			const dropAvailableElement = document.createElement('span');

			// Set ng-show attribute
			HTMLElement.setAttributeToElement(dropAvailableElement, 'ng-show', this.attrs, 'ngcfuNgfDropAvailable');
			// Set Clas Name
			HTMLElement.setAttributeToElement(dropAvailableElement, 'class', this.attrs, 'ngcfuFileUploadChildItemDropAvailableClassName');
			// Set innerHTML information
			HTMLElement.setInnerHTML(dropAvailableElement, this.attrs, 'ngcfuFileUploadChildItemDropAvailableText');

			parentTextElement.appendChild(dropAvailableElement);
		}
	}

	/**
	 * If ngcfuFileUploadChildItemSubItem exists, function should to add a span element with sub information.
	 * 
	 * @property HTMLObject parentTextElement
	 */
	createChildSubItem(parentTextElement) {
		if (this.attrs.hasOwnProperty('ngcfuFileUploadChildItemSubItem')) {
			const subItem = document.createElement('span');

			// Set Class Name
			HTMLElement.setAttributeToElement(subItem, 'class', this.attrs, 'ngcfuFileUploadChildItemSubItemClassName');

			// Set innerHTML information
			HTMLElement.setInnerHTML(subItem, this.attrs, 'ngcfuFileUploadChildItemSubItemText');

			parentTextElement.appendChild(subItem);
		}
	}

	/**
	 * Convert ngcfu (@see CompressionFileUpload) attrbiutes to valid ng file upload attributes 
	 */
	getNgFileUploadHTMLAttributes() {
		// We should to extract ngcfu-ng-... attribute information
		const validKeys = ApplicationArray.filterObjectKeys(this.attrs, this.regExpPattern);
		
		// Get ng file upload values and create a new object
		let ngFileUploadAttributes = ApplicationObject.createNewObjectByMatchingKeys(this.attrs, validKeys);
		
		// Replace object keys name to match ng file upload requirements. 
		// Attribute name should to start with ngf
		ngFileUploadAttributes = ApplicationObject.replaceKeys(ngFileUploadAttributes, this.regExpPattern, this.attributePatterName);

		return ngFileUploadAttributes;
	}

	/**
	 * Add to this.ngFileUploadElement ng file attributes.
	 * 
	 */
	addElementsAttributeInformation() {
		const ngFileUploadAttributes = this.ngFileUploadHTMLAttributes;
		let value = null, _this = this;
		
		// Step 1
		// Add ngf attributes
		Object.keys(ngFileUploadAttributes).forEach((attributeName) => {
			value = ngFileUploadAttributes[attributeName];

			_this.updateElementWithHTMLAttributeInfo(attributeName, value);
		});

		// Step 2
		// Add other attributes
		let attributeName, tempHTMLAttribute = null;
		Object.keys(this.attributesMap).forEach((key) => {
			if (_this.attrs.hasOwnProperty(key)) {
				
				attributeName = this.attributesMap[key];
				value = _this.attrs[key];
				tempHTMLAttribute = HTMLAttribute.callBindAngularBracketsIfNecessary(key, value);
				_this.ngFileUploadElement.setAttribute(attributeName, tempHTMLAttribute.value);
			}
		});
	}

	/**
	 * if you is necessary we bind angularjs brackets for value and remove CompileBind from name of attribute
	 */
	updateElementWithHTMLAttributeInfo(attributeName, value) {
		const tempHTMLAttribute = HTMLAttribute.callBindAngularBracketsIfNecessary(attributeName, value);
		this.ngFileUploadElement.setAttribute(tempHTMLAttribute.name, tempHTMLAttribute.value);
	}

	/**
	 * Function should to generate ng-file-upload-element.
	 * 
	 * @property String elementType. @example 'section', 'div'
	 * @property Object attrs is element attributes.
	 */
	static generateNgFileUploadElements(elementType, attrs) {
		const reference = new ElementCreatorHelper(elementType, attrs);
		
		return reference.ngFileUploadElement;
	}
}

export default ElementCreatorHelper;