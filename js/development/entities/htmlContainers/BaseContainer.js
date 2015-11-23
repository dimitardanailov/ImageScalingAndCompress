/**
 * @constructor
 * @param {string} parentElementId - Access to parent element.
 */
class BaseContainer {
	constructor(parentElementId) {
		this.parentElement = document.getElementById(parentElementId);

		if (!document.body.contains(this.parentElement)) {
			throw 'Element not exist in DOM. Element id: ' + parentElementId;
		}
	}

	/**
	 * Create a list item child (label or value).
	 *
	 * @param {object} parentElement - Access to parent list item element.
	 * @param {string} innerHTML - Text message of span element.
	 * @param {string} className
	 */
	generateListItemChild(parentElement, innerHTML, className) {
		// Label
		const label = document.createElement('span');
		label.innerHTML = innerHTML;
		label.setAttribute('class', className);

	    parentElement.appendChild(label);
	};

	removeParentNodeChildren() {
		while (this.parentElement.firstChild) {
			this.parentElement.removeChild(this.parentElement.firstChild);
		}
	}
};

export default BaseContainer;