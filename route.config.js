/**
 * Created by Sk on 6/27/2017.
 */
var mainApp = angular.module("PharmacyApp", ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/app/prescriptions', {
        templateUrl: 'public/prescription.html', controller: 'PrescriptionController'
    }).


    otherwise({
        redirectTo: '/login'
    });

}]);