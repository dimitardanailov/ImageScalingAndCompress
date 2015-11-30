/** 
 * @ngdoc overview
 * @name Angularjs::routes Configuration
 * @description
 * @property $urlRouterProvider
 * # AngularUI Router is a routing framework for AngularJS, which allows you to organize the parts of your interface into a state machine.
 * # @link https://github.com/angular-ui/ui-router
 * @property $locationProvider Use the $locationProvider to configure how the application deep linking paths are stored.
 * @property $httpProvider Use $httpProvider to change the default behavior of the $http service.
 * @property $stateProvider $state service is responsible for representing states as well as transitioning between them. It also provides interfaces to ask for current state or even states you're coming from.
 */
function Configuration($urlRouterProvider, $locationProvider, $httpProvider, $stateProvider, $sceDelegateProvider) {
	
	console.log($urlRouterProvider);

	const defaultPage = 'widgets.imagecompression';    	

	// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
	$urlRouterProvider
		// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
		.otherwise(defaultPage);

	// Use $stateProvider to configure your states.
	$stateProvider
		.state('widgets', {
			// With abstract set to true, that means this state can not be explicitly activated.
			// It can only be implicitly activated by activating one of its children.
			abstract: true,
			template: '<section ui-view></section>'
		});
};

Configuration.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$stateProvider', '$sceDelegateProvider'];

export default Configuration;