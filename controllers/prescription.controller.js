'use strict';

angular.module('PharmacyApp').controller('PrescriptionController',['$scope','PrescriptionService',
    function ($scope,PrescriptionService) {
    /*
     * GETTERS
     * */

    //1. Get Prescriptions
    function getprescription() {


        var prescriptions=[{
            firstName:"Nuwan",
            lastName:"Tissera",
            age:"21",
            gender:"male",
            height:"186",
            weight:"75",
            bloodGroup:"O+",
            address:"20/21,Nugegoda",
            contactNo:"0758585463",
            email:"nuwan@gmai.com",
            customerType:"registered",
            doctor:"Dr.Vinu Jethaka",
           //medicine:"",
            dateOfIssue:"12/04/2017",
            dateOfExpire:"12/09/2017",
            description:"fever"
        }];

        // PrescriptionService.get().then(prescriptions => {
        //     $scope.prescriptions = prescriptions;
        // });

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