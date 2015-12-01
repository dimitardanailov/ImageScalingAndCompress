class CompressionFileUpload {

	constructor() {
		this.restrict = 'E';
		this.templateUrl = 'js/development/angular/directives/ng-compression-file-upload/template/ng-compression-file-upload.html';
	}

	link (scope, element, attrs) {
		console.log('loaded');
		console.log(element);
		console.log(scope);
		console.log(attrs);

		CompressionFileUpload.generateNgFileUploadElements(element, attrs);

		if (attrs.hasOwnProperty('ngcfuType')) {
		} else {
			throw 'element should to has ngcfuType attribute';
		}
	}

	/**
	 * Method should to generate ng-file-upload-element.
	 */
	static generateNgFileUploadElements(element, attrs) {
		const ngFileUploadContainer = document.createElement('section');

		// We should to extract ngcfu-ng-... attribute information
		const regExp = 'ngcfuNgf';
		const classPatterName = 'ngf';

		const attrKeys = Object.keys(attrs);

		const ngFileInformation = attrKeys.reduce(function(last, now) {
			console.log(last);
			// console.log(now);

			return now;
		});

		console.log(ngFileInformation);

		element.append(ngFileUploadContainer);
	}
}


export default CompressionFileUpload;