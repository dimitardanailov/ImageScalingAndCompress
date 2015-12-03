class HTMLAttribute {
	constructor(attributeName, attributeValue) {
		// If you element end with CompileBind you need to add to {{ value }}.
		// We need this, because we want to compile element with angularjs business logic.
		this.compileBindPattern = 'CompileBind';

		this.attribute = {
			'name': attributeName,
			'value': attributeValue
		}
	}

	/**
	 * Function will try to add {{ }} brackets to value and if you is necessary will remove 'CompileBind' from name of attribute.
	 * 
	 * @property Object object
	 * @property String regExpPattern
	 * 
	 * @return
	 * @example: 
	 * if you: attributeName is equal to 'ngModelCompileBind' and attributeValue is equal to 'modelName'
	 * in this case output will be: { 'ngModel' : '{{ modelName }}' }
	 */
	bindAngularBracketsIfNecessary() {
		const regExp = new RegExp(this.compileBindPattern);

		if (this.attribute.name.match(regExp) !== null) {
			this.attribute.name = this.attribute.name.replace(this.compileBindPattern, '');
			this.attribute.value = '{{ '  + this.attribute.value + ' }}';
		}

		return this.attribute;
	}

	static callBindAngularBracketsIfNecessary(attributeName, attributeValue) {
		const htmlAttribute = new HTMLAttribute(attributeName, attributeValue);

		return htmlAttribute.bindAngularBracketsIfNecessary();
	}
}

export default HTMLAttribute;