'use strict';

angular.module('PharmacyApp').controller('VendorController', ['$scope', 'VendorService',
    function ($scope, VendorService) {
        //Get All Vendors
        function getVendors() {
            VendorService.get().then(vendors => {
                $scope.vendors = vendors;
            });
        };

        //Invoking Get All Vendors functin to load the table
        getVendors();

        //Add new Vendor
        $scope.addVendor = function(vendor) {
            VendorService.add(vendor).then(() => {
                //Update the table after adding new vendor
                getVendors();
                vendor = {};
            });
        };

        //Delete a Vendor
        $scope.deleteVendor = function(id) {
            VendorService.delete(id).then(() => {
                getVendors();
            });
        };

        //Edit Vendor
        $scope.editVendor = function(vendor,id) {
            VendorService.put(vendor,id).then(() => {
                getVendors();
            });
        };

        //Get a particular Vendor
        $scope.getVendorByID = function (id) {
            VendorService.getById(id).then(vendor => {
                $scope.vendor = vendor;
            });
        }

    }]);