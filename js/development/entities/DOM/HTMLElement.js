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

	/**
	 * Function create a HTMLObject element, only if attributeElementShouldToCreated exist in attributes.
	 * The Function will added if possible class name and InnerHTML
	 * 
	 * @property String attributeName
	 * @property String elementType Can be span, div, etc.
	 * @property Map attributeMap contains map with three keys: attributeElementShouldToCreated, attributeClassName, attributeInnerHTML
	 *
	 * @see ApplicationMap::generateAttributeMap
	 * @see ApplicationMap::setAttributeToElement
	 * @see ApplicationMap::setInnerHTML
	 */
	static tryToCreateHTMLElement(attributes, elementType, attributeMap) {
		const attributeElementShouldToCreated = attributeMap.get('attributeElementShouldToCreated');

		if (attributes.hasOwnProperty(attributeElementShouldToCreated)) {
			const item = document.createElement(elementType);

			// Set Class Name
			HTMLElement.setAttributeToElement(item, 'class', attributes, attributeMap.get('attributeClassName'));

			// Set innerHTML information
			HTMLElement.setInnerHTML(item, attributes, attributeMap.get('attributeInnerHTML'));

			return item;
		} else {
			return null;
		}
	}

	/**
	 * Function will create a HTMLObject element and append this element to parent HTMLObject element.
	 * If is possible we should to add a class name to this property.
	 * 
	 * @property String elementType Can be span, div, etc.
	 * @property Object attributes
	 * @property String attributeClassName
	 * @property HTMLObject parentElement
	 * 
	 * @see ApplicationMap::setAttributeToElement
	 * @see ApplicationMap::setInnerHTML
	 */
	static createHTMLElementAppendToParrentElement(elementType, attributes, attributeClassName, parentElement) {
		const element = document.createElement(elementType);

		// Set Class Name
		HTMLElement.setAttributeToElement(element, 'class', attributes, attributeClassName);

		// Append item to parent
		parentElement.appendChild(element);

		return element;
	}
}

export default HTMLElement;