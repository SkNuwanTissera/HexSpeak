'use strict';

angular.module('PharmacyApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/public/index.html',
            controller: 'UserController'
        }).when('/vendors', {
            templateUrl: 'vendor.html',
            controller: 'VendorController'
        }).otherwise({
            redirectTo: '/home'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);