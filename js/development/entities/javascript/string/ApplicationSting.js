class ApplicationSting {

	/**
	 * Function will remove attribute delimiter and every words except fist word. 
	 * 
	 * @property String attributeName
	 * @property String delimiter Default value is '-'
	 *
	 * @return String element Attributes
	 * @example: 
	 * Input: 'ngf-select'
	 * Ouput: ngfSelect
	 */
	static capitalizeAttributesAndRemoveDelimiter(attributeName, delimiter = '-') {
		let words = attributeName.split(delimiter);
		
		if (Array.isArray(words)) {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
			// The shift() method removes the first element from an array and returns that element. This method changes the length of the array.
			let angularAttributeName = words.shift();	

			words.map((word) => {
				angularAttributeName += ApplicationSting.capitalizeFirstLetter(word);
			});

			return angularAttributeName;
		} else {
			throw `${delimiter} not exist in ${attribute} name.`;
		}
	}

	/**
	 * Capitalize first letter.
	 * @see http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
	 */
	static capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * We have nested javascript property, when dot exist in property.
	 * 
	 * @property String property
	 *
	 * @return boolean
	 */
	static isNestedProperty(property) {
		const regExpNestedProperty = new RegExp('\.');

		if (property.match(regExpNestedProperty)) {
			return true;
		} else {
			return false;
		}
	}
}

export default ApplicationSting;