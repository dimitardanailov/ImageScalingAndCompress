(function () {
	angular
		.module('ImageScalingAndCompress')
		.config(Configuration.create())

})();

class Configuration {

	const $inject = ['$routeProvider', '$locationProvider'];

	/**
     * @ngdoc overview
     * @name Angularjs::routes
     * @description
     * @param $routeProvider Used for configuring routes.
     * @param $locationProvider Use the $locationProvider to configure how the
     */
	constructor($routeProvider, $locationProvider) {
		// Configure the routes
    	$routeProvider

            // View your twitter newsletters
            .when('/', {
                controller: 'HomeCtrl',
                templateUrl: 'AngularTemplates/form.html'
            });

        // use the HTML5 History API
        // $locationProvider.html5Mode(true);
	}

	static create() {
		return new Configuration();
	}
}