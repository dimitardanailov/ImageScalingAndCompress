const moduleName = 'ImageScalingAndCompress';

angular
	.module(moduleName, [
		moduleName + '.imagecompression', 
		'ui.router', 
		'ngFileUpload'
	]);

export default moduleName;
