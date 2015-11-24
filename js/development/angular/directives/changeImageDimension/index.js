import moduleName from './../../app.module';
import ChangeImageDimensionDirective from './ChangeImageDimensionDirective';

// http://stackoverflow.com/questions/28620479/using-es6-classes-as-angular-1-x-directives

angular
	.module(moduleName)
	.directive('changeImageDimension', () => new ChangeImageDimensionDirective());