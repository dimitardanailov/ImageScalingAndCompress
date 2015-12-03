import ApplicationArray from 'entities/javascript/array/ApplicationArray';
import ApplicationObject from 'entities/javascript/object/ApplicationObject';

class NgFileUploadHelper {

	/**
	 * Function will generate object from ng-file-upload object
	 * 
	 * @property String elementType
	 * 
	 */
	constructor(elementType, attrs) {
		this.regExpPattern = 'ngcfuNgf';
		this.attributePatterName = 'ngf-';

		// Here we specify ng file attributes for our application and tracking map.
		this.attributesMap = {
			'accept': 'accept',
			'ngcfuFileUploadClassName': 'class',
			'ngModel': 'ng-model'
		};

		this.ngFileUploadElement = document.createElement(elementType);
		this.attrs = attrs;

		this.ngFileUploadHTMLAttributes = this.getNgFileUploadHTMLAttributes();
		this.addElementsAttributeInformation();
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
			_this.ngFileUploadElement.setAttribute(attributeName, value);
		});

		// Add other attributes
		let attributeName;
		Object.keys(this.attributesMap).forEach((key) => {
			if (_this.attrs.hasOwnProperty(key)) {
				attributeName = this.attributesMap[key];
				value = _this.attrs[key];
				_this.ngFileUploadElement.setAttribute(attributeName, value);
			}
		});
	}

	/**
	 * Function should to generate ng-file-upload-element.
	 * 
	 * @property String elementType. @example 'section', 'div'
	 * @property Object attrs is element attributes.
	 */
	static generateNgFileUploadElements(elementType, attrs) {
		const reference = new NgFileUploadHelper(elementType, attrs);
		
		return reference.ngFileUploadElement;
	}
}

export default NgFileUploadHelper;
	