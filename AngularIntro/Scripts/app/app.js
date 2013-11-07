// Main configuration file. Sets up AngularJS module and routes and any other config objects

//Define the main module for the application
//The first parameter (main) is the name of the module, while the parameters inside the [] are the other modules it depends upon.
//In general, most larger applications will have multiple modules. At minimum, you'll see a separate module for services, for directives, and for filters
var appRoot = angular.module('main', ['ngRoute', 'ngGrid', 'ngResource', 'angularStart.services', 'angularStart.directives','angularStart.filters']);

//set up the configuration for this module
appRoot
    .config(['$routeProvider', function ($routeProvider) {
        //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (Razor .cshtml view)
        $routeProvider
            .when('/home', { templateUrl: '/home/main' })
            .when('/angular', { templateUrl: '/home/angular' })
            .when('/samples', { templateUrl: 'home/samples', controller: 'SampleController' })
            .otherwise({ redirectTo: '/home' });
    }])
    .controller('RootController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $scope.activeViewPath = $location.path();
        });
    }]);
