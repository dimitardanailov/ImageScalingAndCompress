import NgFileUploadElement from 'angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/NgFileUploadElement';
import FileUploadHelper from 'angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelpers/FileUploadHelper';
import ApplicationObject from 'entities/javascript/object/ApplicationObject';
import AttributeHelper from 'angular/helpers/AttributeHelper';

/**
 * @ngdoc class
 * @name ImageScalingAndCompress:controller:CompressionFileUploadController
 * @description
 * Current Controller is give us option to $compile elements.
 * 
 * Get Idea from: 
 * @see http://stackoverflow.com/questions/16656735/insert-directive-programatically-angular
 * @see http://onehungrymind.com/angularjs-dynamic-templates/
 * @see https://thinkster.io/a-better-way-to-learn-angularjs/directive-to-directive-communication
 */
class CompressionFileUploadController {

	constructor ($scope, $compile, $http, $timeout, Upload) {
		this.scope = $scope;
		this.compile = $compile;
		this.http = $http;
		this.timeout = $timeout;
		this.Upload = Upload; 

		this.defaultNgFileUploadType = 'section';
		this.attributeMap = null;
	}

	/**
	 * Add $watcher for parent directive, when ng-model is changed. 
	 * 
	 * @property Object attrs is element attributes.
	 */
	addTrackingForFileUpload(ngFileUploadContainer) {
		if (ngFileUploadContainer.hasOwnProperty('0')) {
			const element = ngFileUploadContainer[0];
			this.attributeMap = AttributeHelper.getAttributesInformationByElementAndScope(element, this.scope);

			FileUploadHelper.createUploadReference(this.scope, this.timeout, this.Upload, this.attributeMap);
		}
	}

	/**
	 * @ngdoc class
	 * @description
	 * Current function: 
	 * 1) generate from attributes ng file upload 
	 * 2) Convert Dom Element to angular element
	 * 3) $compile element
	 *
	 * @property Object attrs is element attributes.
	 */
	compileNgFileUploadByAttributes(attrs) {
		// Generate ng-file-upload element. 
		const tempElement = NgFileUploadElement.generateNgFileUploadElement(this.defaultNgFileUploadType, attrs);
		const ngFileUploadContainer = angular.element(tempElement);

		const ngFileUploadContainerWithCompilation = this.compile(ngFileUploadContainer)(this.scope);

		return ngFileUploadContainerWithCompilation;
	}
}

CompressionFileUploadController.$inject = ['$scope', '$compile', '$http', '$timeout', 'Upload'];

export default CompressionFileUploadController;