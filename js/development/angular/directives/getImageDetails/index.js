import moduleName from './../../app.module';
import GetImageDetailsDirective from './GetImageDetailsDirective';

// We need to use function instead of class
// Source: http://stackoverflow.com/questions/28620479/using-es6-classes-as-angular-1-x-directives

angular
	.module(moduleName)
	.directive('getImageDetails', () => new GetImageDetailsDirective());