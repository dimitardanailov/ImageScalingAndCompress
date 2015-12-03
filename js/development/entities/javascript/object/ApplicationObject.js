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
}

export default ApplicationObject;