class HTMLElement {
	
	/**
	 * If you objectPropertyName exist in attributes list, 
	 * we need to create a new attribute with this information.
	 * 
	 * @property HTMLObject htmlElement
	 * @property String attributeName
	 * @property Object attributes
	 * @property Object objectPropertyName
	 */
	static setAttributeToElement(htmlElement, attributeName, attributes, objectPropertyName) {
		if (attributes.hasOwnProperty(objectPropertyName)) {
			htmlElement.setAttribute(attributeName, attributes[objectPropertyName]);
		}
	}	

	/**
 	 * If you objectPropertyName exist in attributes list, 
	 * we need to change innerHTML information.
	 * 
	 * @property HTMLObject htmlElement
	 * @property String attributeName
	 * @property Object attributes
	 * @property Object objectPropertyName
	 */
	static setInnerHTML(htmlElement, attributes, objectPropertyName) {
		if (attributes.hasOwnProperty(objectPropertyName)) {
			htmlElement.innerHTML = attributes[objectPropertyName];
		}
	}
}

export default HTMLElement;