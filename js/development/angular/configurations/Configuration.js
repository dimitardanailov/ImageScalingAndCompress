class Configuration {

	/**
     * @ngdoc overview
     * @name Angularjs::routes
     * @description
     * @param $routeProvider Used for configuring routes.
     * @param $locationProvider Use the $locationProvider to configure how the
     */
	constructor($routeProvider, $locationProvider) {
        console.log($routeProvider);
        console.log('loaded - configurations');
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
}

Configuration.$inject = ['$routeProvider', '$locationProvider'];

export default Configuration;