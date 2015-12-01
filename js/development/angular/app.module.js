const moduleName = 'ImageScalingAndCompress';

angular
	.module(moduleName, [
		moduleName + '.imagecompression', 
		'ui.router'
	]);

export default moduleName;
