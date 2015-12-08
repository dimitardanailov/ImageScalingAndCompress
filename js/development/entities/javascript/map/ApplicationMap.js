class ApplicationMap {

	/**
	 * Function should to create a map for accessing an element attribute information.
	 * 
	 * @example:
	 * If you have an object with follow keys:  
	 * First key: ngcfuFileUploadItemItemSubItem: "true"
	 * Second key: ngcfuFileUploadItemItemSubItemClassName: "display-block"
	 * Third key: ngcfuFileUploadItemItemSubItemText: "Click to browse"
	 * 
	 * In this case we will have follow properties:
	 * @property attributeElementShouldToCreated = 'ngcfuFileUploadItemItemSubItem'
	 * @property attributeClassName attributeClassName = 'ngcfuFileUploadItemItemSubItemClassName'
	 * @property attributeInnerHTML = 'ngcfuFileUploadItemItemSubItemText'
	 * 
	 * @see HTMLElement::tryToCreateHTMLElement
	 */
	static generateAttributeMap(attributeElementShouldToCreated, attributeClassName, attributeInnerHTML) {
		const attributeMap = new Map();

		attributeMap.set('attributeElementShouldToCreated', attributeElementShouldToCreated);
		attributeMap.set('attributeClassName', attributeClassName);
		attributeMap.set('attributeInnerHTML', attributeInnerHTML);

		return attributeMap;
	}
} 

export default ApplicationMap;