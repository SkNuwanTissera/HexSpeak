/**
 * Created by Sk on 6/27/2017.
 */
var app = angular.module("PharmacyApp");
app.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl : "public/login.ejs",
            controller : "UserController"
        }).when("/test", {
        templateUrl : "test.html",
        controller : "testController"
    });
});
app.controller("testController", function ($scope) {
    $scope.msg = "ng-view is working fine";
});
/*
* <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
*
* */