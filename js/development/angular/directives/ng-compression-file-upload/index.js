import moduleName from 'angular/app.module';
import CompressionFileUpload from './CompressionFileUpload';

// We need to use function instead of class
// Source: http://stackoverflow.com/questions/28620479/using-es6-classes-as-angular-1-x-directives

angular
	.module(moduleName)
	.directive('ngCompressionFileUpload', () => new CompressionFileUpload());