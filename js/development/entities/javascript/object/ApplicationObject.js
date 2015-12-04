import ApplicationSting from 'entities/javascript/string/ApplicationSting';

class ApplicationObject extends Object {

	/**
	 * Function will replace object keys with new Patter Name.
	 *
	 * @property Object object
	 * @property String currentPatterName
	 * @proprty String newPatternName
	 * 
	 * @return
	 * @example 
	 * @example: 
	 * object = { 'oldname_something_else1': 1, 'oldname_something_else2': 2, 'oldname_something_else3': 3 } 
	 * currentPatterName = 'oldname'
	 * newPatternName = 'newname'
	 * in this case output will be: { 'newname_something_else1': 1, 'newname_something_else2': 2, 'newname_something_else3': 3 } 
	 */
	static replaceKeys(object, currentPatterName, newPatternName) {
		const objectKeys = Object.keys(object);	
		let newKeyName = null;
		const newObject = new ApplicationObject();
		const objectKeyRegExp = new RegExp(currentPatterName);
		
		objectKeys.forEach((key) => {
			if (key.match(objectKeyRegExp)) {
				newKeyName = key.replace(currentPatterName, newPatternName);
				newObject[newKeyName] = object[key];
			}
		});

		return newObject;
	}

	/**
	 * Function will create a new object from keys matches.
	 * 
	 * @description
	 * 
	 * @property Object object
	 * @property Array keys
	 * 
	 * @return
	 * @example: 
	 * object = { 'keyword1': 1, 'keyword2': 2, 'somethingelse': 3, 'anothervalue:' : 4 } 
	 * keys = ['keyword1', 'keyword2'] 
	 * in this case output will be: { 'keyword1' : 1, 'keyword2': 2 } 
	 */
	static createNewObjectByMatchingKeys(object, keys) {
		const filteredObject = new ApplicationObject();
		keys.forEach((key) => {
			if (object.hasOwnProperty(key)) {
				return filteredObject[key] = object[key];
			}
		});

		return filteredObject;
	}

	/**
	 * Get information from nested object by string key.
	 * 
	 * @property Object object
	 * @property String propertyKey
	 *	
	 * @see http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
	 */
	static getNestedProperty(object, propertyKey) {
		const propertyIsNested = ApplicationSting.isNestedProperty(propertyKey);

		if (propertyIsNested) {
			// We have nested property
			const properties = propertyKey.split('.');

			if (Array.isArray(properties)) {
				let tempValue = null, tempObject = object;

				properties.forEach((property) => {
					if (typeof tempObject[property] !== 'undefined') {
						tempValue = tempObject[property];
						tempObject = tempValue;
					}
				});

				return tempValue;
			} else {
				throw `Property: ${propertyKey} is not valid. Should to have dot for delimiter`;
			}
		} else {
			if (object.hasOwnProperty(propertyKey)) {
				return object[propertyKey];
			}
		}
	}

	/**
 	 * @property Object object
	 * @property String propertyKey
	 * @newValue mixed newValue
	 */
	static updateNestedObject(object, propertyKey, newValue) {
		const propertyIsNested = ApplicationSting.isNestedProperty(propertyKey);

		if (propertyIsNested) {
			// We have nested property
			const properties = propertyKey.split('.');

			if (Array.isArray(properties)) {
				const nestedMap = ApplicationObject.getPopertyNestedMap(object, properties, newValue);
				let tempObject = null,
					parentObject = null;

				nestedMap.forEach(function(value, key) {
					if (tempObject == null) {
						tempObject = new Object();
					} else {
						tempObject = parentObject;
					}
					
					tempObject[key] = value;

					// Save parent object
					parentObject = tempObject[key];
				});

				console.log('objectPointer', tempObject);

				// shift

			} else {
				throw `Property: ${propertyKey} is not valid. Should to have dot for delimiter`;
			}
		} else {
			if (object.hasOwnProperty(propertyKey)) {
				object[propertyKey] = newValue; 
			}
		}

		return object;
	}

	/* 
	 * If you we have nested property like this:
	 * node.subnode.subsubnode
	 * Map should to store every option. We will have these map keys:
	 * 1) node
	 * 2) subnode
	 * 3) subsubnode
	 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
	 * 
	 * @property Object object
	 * @property Array properties
	 * @property mixed newValue
	 */ 
	static getPopertyNestedMap(object, properties, newValue) {
		// size of nested properties
		const size = (properties.length - 1);

		const nestedMap = new Map();
		let tempValue = null;

		properties.forEach((property, i) => {
			if (i < size) {
				tempValue = ApplicationObject.getNestedProperty(object, property);
				nestedMap.set(property, tempValue);
			} else {
				nestedMap.set(property, newValue);
			}
		});

		return nestedMap;
	}
}

export default ApplicationObject;