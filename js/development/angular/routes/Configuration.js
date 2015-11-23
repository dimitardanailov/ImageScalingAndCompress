/**
* @ngdoc overview
* @name Angularjs::routes Configuration
* @description
* @param $routeProvider Used for configuring routes.
* @param $locationProvider Use the $locationProvider to configure how the
*/
function Configuration($routeProvider, $locationProvider) {
    // Configure the routes
    $routeProvider

        // View your twitter newsletters
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'AngularTemplates/form.html'
        });

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
};

Configuration.$inject = ['$routeProvider', '$locationProvider'];

export default Configuration;