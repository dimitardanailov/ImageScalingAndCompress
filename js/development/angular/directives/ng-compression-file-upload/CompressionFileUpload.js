import CompressionFileUploadController from 'angular/directives/ng-compression-file-upload/controllers/CompressionFileUploadController';


/**
 * @ngdoc directive
 * @name ImageScalingAndCompress:directive:CompressionFileUpload
 * @description
 * CompressionFileUpload is directive, which should to load our custom widget for file upload and compresion.
 * We we will use for file upload: ng-file-upload @see https://github.com/danialfarid/ng-file-upload
 * Now compression is available only for png and jpeg images.
 * Current we not support we not any compression of audio or video.
 * 
 * http://onehungrymind.com/angularjs-dynamic-templates/
 */
class CompressionFileUpload {

	constructor() {
		this.restrict = 'E';
		this.controller = CompressionFileUploadController;
		this.templateUrl = 'js/development/angular/directives/ng-compression-file-upload/template/ng-compression-file-upload.html';
	}

	link (scope, element, attrs, CompressionFileUpload) {
		
		console.log(element);
		console.log(scope);
		console.log(attrs);

		// $compile instance
		const compile = CompressionFileUpload.getCompile();

		if (attrs.hasOwnProperty('ngcfuType')) {
			const ngFileUploadContainer = CompressionFileUpload.compileNgFileUploadByAttributes(attrs);
			element.append(ngFileUploadContainer);
		} else {
			throw 'element should to has ngcfuType attribute';
		}
	}
}

export default CompressionFileUpload;