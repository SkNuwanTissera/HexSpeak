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
            swal({
                    title: "Do You Really Want To Add This Vendor?",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showLoaderOnConfirm: true,
                },
                function(){
                    setTimeout(function(){
                        VendorService.add(vendor).then(() => {
                            //Update the table after adding new vendor
                            getVendors();
                            vendor = {};
                        });
                        swal("New Vendor Added Successfully!");
                    }, 1000);
                });
        };

        //Delete a Vendor
        $scope.deleteVendor = function(id) {
            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this vendor`s details!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function(){
                    swal("Deleted!", "The vendor has been deleted.", "success");
                    VendorService.delete(id).then(() => {
                        getVendors();
                    });
                });
        };

        //Edit Vendor
        $scope.editVendor = function(vendor,id) {
            swal({
                    title: "Do You Really Want To Save The Changes?",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showLoaderOnConfirm: true,
                },
                function(){
                    setTimeout(function(){
                        VendorService.put(vendor,id).then(() => {
                            getVendors();
                        });
                        swal("Vendor Details Saved!");
                    }, 1000);
                });

        };

        //Get a particular Vendor
        $scope.getVendorByID = function (id) {
            VendorService.getById(id).then(vendor => {
                $scope.vendor = vendor;
            });
        }

    }]);