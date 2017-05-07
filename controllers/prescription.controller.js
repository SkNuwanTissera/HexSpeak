'use strict';

angular.module('PharmacyApp').controller('PrescriptionController',['$scope','PrescriptionService',
    function ($scope,PrescriptionService) {
    /*
     * GETTERS
     * */

    //1. Get Prescriptions
    function getprescription() {


        PrescriptionService.get().then(prescriptions => {
            $scope.prescriptions = prescriptions;
        });

    }
    //invoking getPrescription
    getprescription();


    /*
     * SETTERS
     * */

    //1. Set Prescription

        $scope.addPrescription = function(prescriptions) {
            PrescriptionService.add(prescription).then(() => {
                getprescription();
                prescriptions = {};
            });
        };

        $scope.deletePrescription = function(id) {
            PrescriptionService.delete(id).then(() => {
                getprescription();
            });
        };


        $scope.editPrescription = function(user,id) {
            PrescriptionService.put(user,id).then(() => {
                getprescription();
            });
        }



}]);