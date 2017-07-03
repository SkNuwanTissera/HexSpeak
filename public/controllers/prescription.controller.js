'use strict';

angular.module('PharmacyApp').controller('PrescriptionController',['$scope','PrescriptionService',
    function ($scope,PrescriptionService) {

    $scope.Pquery={}
    $scope.PqueryBy='$'
    $scope.orderProp="name"
    /*
     * GETTERS
     * */

    //1. Get Prescriptions
    function getprescription() {


        PrescriptionService.get().then(prescriptions => {
            $scope.prescriptions = prescriptions;
            $scope.prescriptionCount = prescriptions.length;
        });

    }
    //invoking getPrescription
    getprescription();


    /*
     * SETTERS
     * */

    //1. Set Prescription

        $scope.addPrescription = function(prescription) {
            PrescriptionService.add(prescription).then(() => {
                getprescription();
                prescription = {};
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

        $scope.viewPrescription = function (prescription) {
            $scope.prescription=prescription;
        }



}]);