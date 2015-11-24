/**
 * Get Idea from: https://github.com/michaelbromley/angular-es6/blob/master/src/app/directives/item.js
 * 
 * Directive should to get image dimensions and return to main scope.
 */
class GetImageDetailsDirective {
	
	constructor() {
		this.restrict = 'A';
	}

	link (scope, element, attrs) {
		element.bind('load', function() {			
			// http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933
			const _this = this;
			scope.$apply(() => {
				scope[attrs.ngModel] = {
					'width': _this.width,
					'height': _this.height
				};
			});
		});
	}
}

export default GetImageDetailsDirective;