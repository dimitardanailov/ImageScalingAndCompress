import ApplicationSting from 'entities/javascript/string/ApplicationSting';
import ApplicationObject from 'entities/javascript/object/ApplicationObject';

class AttributeHelper {
	
	/**
	 * Function should to: 
	 * 1) Extraxt information from element attributes. 
	 * Some attributes need to compile and this case they have {{ angular brackets }}.
	 * 
	 * 2) 
	 * Second step will be getting angular attribute information from scope.
	 *
	 * @property HTMLOjbect element
	 * @property ScopeObject scope
	 * 
	 * @return Map
	 * key is attributeName
	 * value is attributeValue
	 */
	static getAttributesInformationByElementAndScope(element, scope) {
		let attributes = AttributeHelper.extractAttributes(element);
		const attributeMap = AttributeHelper.getScopeInformationFromAttributes(scope, attributes);

		return attributeMap;
	}

	/**
	 * Function will get information from scope. 
	 * This will be only value with flag isAngularVariable.
	 * 
	 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
 	 * 
	 * @return Map
	 * key is attributeName
	 * value is attributeValue
	 */
	static getScopeInformationFromAttributes(scope, attributes) {
		let attributeNames = Object.keys(attributes);
		let tempAttribute = null, tempValue = null;
		const attributeMap = new Map();

		attributeNames.forEach((attributeName) => {
			tempAttribute = attributes[attributeName];

			if (tempAttribute.hasOwnProperty('isAngularVariable') && tempAttribute.isAngularVariable) {
				// Get nested information
				tempValue = ApplicationObject.getNestedProperty(scope, tempAttribute['value']);
			} else {
				tempValue = tempAttribute['value'];
			}

			attributeMap.set(attributeName, tempValue);
		});

		return attributeMap;
	}

	static extractAttributes(element) {
		if (element !== null) {
			const elementAttributes = AttributeHelper.generateObjectFromAngularAttributes(element.attributes);

			return elementAttributes;
		} else {
			throw 'Invalid element';
		}
	}

	/**
	 * Function will extract attributes information from element.
	 * Variable can be: 
	 * Scope Variable in this case variable is look like: {{ angular.variable }}
	 * or normal value. 
	 * 
	 * @description
	 * @see http://stackoverflow.com/questions/828311/how-to-iterate-through-all-attributes-in-an-html-element
	 * 
	 * @property HTMLOjbect element
	 * 
	 * @return Object element Attributes
	 */
	static generateObjectFromAngularAttributes(attributes) {
		const elementAttributes = new Object();
		const angularBracketsExp = new RegExp('^{{([^}]+)}}');

		let attributeName = null,
			attributeAngularName = null, 
			attributeValue = null,
			isAngularVariable = false,
			regExpResponse = null;			

		for (let i = 0; i < attributes.length; i++) {
			attributeName = attributes[i].name;
			attributeValue = attributes[i].value;
			isAngularVariable = false;

			// Detect value have an angular brackets
			regExpResponse = angularBracketsExp.exec(attributeValue);
			if (regExpResponse !== null && regExpResponse.hasOwnProperty('1')) {
				attributeValue = regExpResponse[1].trim();
				isAngularVariable = true;
			}

			// Convert attribute name to Angular Syntax 
			// (If you attribute name is ng-model, we should to receive: ngModel).
			attributeAngularName = ApplicationSting.capitalizeAttributesAndRemoveDelimiter(attributeName);

			elementAttributes[attributeAngularName] = {
				'value': attributeValue,
				'isAngularVariable': isAngularVariable
			};
		}

		return elementAttributes;
	}
}

export default AttributeHelper;