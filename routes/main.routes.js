'use strict';

angular.module('PharmacyApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/public/index.html',
            controller: 'UserController'
        }).when('/comments/:id', {
            templateUrl: 'comments.list.html',
            controller: 'CommentsController'
        }).otherwise({
            redirectTo: '/home'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);