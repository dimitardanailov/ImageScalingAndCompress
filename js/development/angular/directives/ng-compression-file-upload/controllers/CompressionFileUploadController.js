import NgFileUploadHelper from 'angular/directives/ng-compression-file-upload/helpers/NgFileUploadHelper';

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

	constructor ($scope, $compile) {
		this.scope = $scope;
		this.compile = $compile;
		this.defaultNgFileUploadType = 'section';
	}

	getCompile() {
		return this.compile;
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
		const tempElement = NgFileUploadHelper.generateNgFileUploadElements(this.defaultNgFileUploadType, attrs);
		const ngFileUploadContainer = angular.element(tempElement);

		const ngFileUploadContainerWithCompilation = this.compile(ngFileUploadContainer)(this.scope);

		return ngFileUploadContainerWithCompilation;
	}
}

CompressionFileUploadController.$inject = ['$scope', '$compile'];

export default CompressionFileUploadController;