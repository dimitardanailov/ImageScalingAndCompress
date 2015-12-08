import HTMLElement from 'entities/DOM/HTMLElement';
import ApplicationMap from 'entities/javascript/map/ApplicationMap';

/**
 * This html element is info element. 
 * Example information: Drop image here or click to browse.
 */
class NgFileUploadInfoElement {

	/**
	 * @property HTMLObject ngFileUploadElement parent element
	 * @property object attrs ng-compression-file-upload attributes
	 */
	constructor(ngFileUploadElement, attrs) {
		// Parent element
		this.ngFileUploadElement = ngFileUploadElement;
		
		// ng-compression-file-upload attributes
		this.attrs = attrs;

		this._infoElement = this.createInformationElement();

		// Create drop availabe element
		this._dropAvailableElement = this.createItemDropAvailableElement();
		
		// Create sub item element
		this._subItem = this.createItemSubItem();
	}

	/**
	 * @return HTMLObject
	 */
	get infoElement() {
		return this._infoElement;
	}

	/**
	 * @return mixed null or HTMLObject
	 */
	get dropAvailableElement() {
		return this._dropAvailableElement;
	}

	/**
	 * @return mixed null or HTMLObject
	 */
	get subItem() {
		return  this._subItem;
	}

	/**
	 * Function should to add a section element with information.
  	 * 
	 * @return HTMLObject
 	 */
	createInformationElement() {
		const element = document.createElement('div');

		// Set Class Name
		HTMLElement.setAttributeToElement(element, 'class', this.attrs, 'ngcfuFileUploadItemItemClassName');
		// Set innerHTML information
		HTMLElement.setInnerHTML(element, this.attrs, 'ngcfuFileUploadItemItemText');

		// Append item to parent
		this.ngFileUploadElement.appendChild(element);

		return element;
	}

	/**
	 * If ngcfuFileUploadItemTextDropAvailable and ngcfuNgfDropAvailable exists,
	 * function should to add a span element with drop available information.
	 *
	 * @return mixed null or HTMLObject
	 */
	createItemDropAvailableElement() {
		const ngcfuFileUploadItemItemDropAvailableIsCorrect = 
			(this.attrs.hasOwnProperty('ngcfuFileUploadItemItemDropAvailable') && this.attrs.ngcfuFileUploadItemItemDropAvailable);

		if (ngcfuFileUploadItemItemDropAvailableIsCorrect && this.attrs.hasOwnProperty('ngcfuNgfDropAvailable')) {
			const dropAvailableElement = document.createElement('span');

			// Set ng-show attribute
			HTMLElement.setAttributeToElement(dropAvailableElement, 'ng-show', this.attrs, 'ngcfuNgfDropAvailable');
			// Set Clas Name
			HTMLElement.setAttributeToElement(dropAvailableElement, 'class', this.attrs, 'ngcfuFileUploadItemItemDropAvailableClassName');
			// Set innerHTML information
			HTMLElement.setInnerHTML(dropAvailableElement, this.attrs, 'ngcfuFileUploadItemItemDropAvailableText');

			// Append item to parent
			this.infoElement.appendChild(dropAvailableElement);

			return dropAvailableElement;
		} else {
			return null;
		}
	}

	/**
	 * If ngcfuFileUploadItemItemSubItem exists, function should to add a span element with sub information.
	 * 
	 * @return mixed null or HTMLObject
	 */
	createItemSubItem() {
		const attributeMap = ApplicationMap.generateAttributeMap(
			'ngcfuFileUploadItemItemSubItem',
			'ngcfuFileUploadItemItemSubItemClassName',
			'ngcfuFileUploadItemItemSubItemText'
		);

		const subItem = HTMLElement.tryToCreateHTMLElement(
			this.attrs,
			'span',
			attributeMap
		);

		if (subItem !== null) {
			this.infoElement.appendChild(subItem);
		}

		return subItem;
	}
}

export default NgFileUploadInfoElement;