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
};