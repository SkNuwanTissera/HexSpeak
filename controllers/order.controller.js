'use strict';

angular.module('PharmacyApp').controller('OrderController', ['$scope', 'VendorService',
    function ($scope, VendorService) {

        $scope.selectedDrug;
        $scope.selectedVendor;
        $scope.selectedVendorEmail;
        $scope.quantity=1;
        $scope.description;
        $scope.date = new Date();

        $scope.getVendorsBySellingDrug = function() {
            VendorService.getVendorsByDrugs($scope.selectedDrug.drugName).then(vendor => {
                $scope.vendorByDrug = vendor;
                $scope.selectedVendorEmail="";
            });
        };

        $scope.getVendorEmail = function () {
            $scope.selectedVendorEmail=$scope.selectedVendor.email;
        };

        //Get Drugs from DB
        function getDrugs() {
            VendorService.getDrugs().then(drugs => {
                $scope.drugs = drugs;
            });
        };

        getDrugs();

    }]);