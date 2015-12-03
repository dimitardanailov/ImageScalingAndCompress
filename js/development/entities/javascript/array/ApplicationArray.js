class ApplicationArray extends Array {

	/**
	 * Function will extract from object, only keys who contains in regExpPattern
	 * 
	 * @description
	 * We will use MapReduce for matching and reduce valid attributes.
	 * @see http://jcla1.com/blog/javascript-mapreduce/ 
	 * 
	 * @property Object object
	 * @property String regExpPattern
	 * 
	 * @return
	 * @example: 
	 * object = { 'keyword1': 1, 'keyword2': 2, 'somethingelse': 3, 'anothervalue:' : 4 } 
	 * regExpPattern = 'keyword' 
	 * in this case output will be: ['keyword1', 'keyword2'] 
	 */
	static filterObjectKeys(object, regExpPattern) {	
		const objectKeys = Object.keys(object);	
		const objectKeyRegExp = new RegExp(regExpPattern);
		let matchResult = null;

		const validKeys = objectKeys.filter((objectKey) => {
			return objectKey.match(objectKeyRegExp) !== null;
		});

		return validKeys;
	}
}

export default ApplicationArray;