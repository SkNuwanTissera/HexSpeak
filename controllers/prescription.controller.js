'use strict';

angular.module('PharmacyApp').controller('PrescriptionController',['$scope','UserService',
    function ($scope,UserService) {
    /*
     * GETTERS
     * */

    //1. Get Prescriptions
    function getusers() {


        PrescriptionService.get().then(prescriptions => {
            $scope.prescriptions = prescriptions;
        });

    }
    //invoking getUsers
    getusers();


    /*
     * SETTERS
     * */

    //1. SetUser

        $scope.addUser = function(prescriptions) {
            UserService.add(prescription).then(() => {
                getusers();
                user = {};
            });
        };

        $scope.deleteUser = function(id) {
            UserService.delete(id).then(() => {
                getusers();
            });
        };


        $scope.editUser = function(user,id) {
            UserService.put(user,id).then(() => {
                getusers();
            });
        }

    $scope.test="Hello";


}]);