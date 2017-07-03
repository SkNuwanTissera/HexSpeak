'use strict';

angular.module('PharmacyApp').controller('VendorController', ['$scope', 'VendorService',
    function ($scope, VendorService) {

        $scope.selectedDrugs;
        $scope.selectedDrugName;

        //Form Validation Function
        function validateForm () {
            var valid=true;
            var fName = document.getElementById('input1').value;
            var lName = document.getElementById('input2').value;
            var mobile = document.getElementById('input3').value;
            var address = document.getElementById('input4').value;
            var email = document.getElementById('input5').value;
            var company = document.getElementById('input6').value;

            //Check Empty Fields
            if(fName==""||lName==""||mobile==""||address==""||email==""||company==""){
                valid=false;
                swal({
                        title: "Some Required Fields Are Empty!",
                        text: "Except Selling Drugs All Other Fields are Required!",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Retry!",
                        closeOnConfirm: true
                    });
                return valid;
            }

            //Validate Mobile No
            if (/^\d{10}$/.test(mobile)==false) {
                valid=false;
                swal({
                    title: "Invalid Mobile No!",
                    text: "No should be like 0770011000",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }

            //Validate Email Address
            var tempEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (tempEmail.test(email) == false)
            {
                valid=false;
                swal({
                    title: "Invalid Email Address!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }

            return valid;

        }
        //Get All Vendors
        function getVendors() {
            VendorService.get().then(vendors => {
                $scope.vendors = vendors;
            });
        };

        //Invoking Get All Vendors function to load the table
        getVendors();

        //Get Drugs from DB
        function getDrugs() {
            VendorService.getDrugs().then(drugs => {
                $scope.drugs = drugs;
            });
        };

        getDrugs();

        //Add new Vendor
        $scope.addVendor = function(vendor) {
            if (validateForm()){
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
                        var index;
                        var dNames = [];
                        for (index = 0; index < $scope.selectedDrugs.length; index++) {
                            dNames.push($scope.selectedDrugs[index].drugName);
                        }
                        vendor.sellingDrugs = dNames;
                        // vendor.drugs = $scope.selectedDrugs;

                        VendorService.add(vendor).then(() => {
                            //Update the table after adding new vendor
                            getVendors();
                            vendor = {};
                        });
                        setTimeout(function(){
                            swal("New Vendor Added Successfully!");
                            setTimeout(function(){
                                window.location.href = './vendors';
                            },1800);
                        }, 1000);
                    });
            }
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
                    VendorService.delete(id).then(() => {
                        getVendors();
                    });
                    swal("Deleted!", "The vendor has been deleted.", "success");
                    setTimeout(function(){
                        window.location.href = './vendors';
                    },1800);
                });
        };

        //Edit Vendor
        $scope.editVendor = function(vendor,id) {
            if (validateForm()){
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
                        var index;
                        var dNames = [];
                        for (index = 0; index < $scope.selectedDrugs.length; index++) {
                            dNames.push($scope.selectedDrugs[index].drugName);
                        }
                        vendor.sellingDrugs = dNames;
                        // vendor.drugs = $scope.selectedDrugs;
                        VendorService.put(vendor,id).then(() => {
                            getVendors();
                        });
                        setTimeout(function(){
                            swal("Vendor Details Saved!",);
                            setTimeout(function(){
                                window.location.href = './vendors';
                            },1800);
                        }, 1000);
                    });
            }
        };

        //Get a particular Vendor
        $scope.getVendorByID = function (id) {
            VendorService.getById(id).then(vendor => {
                $scope.vendor = vendor;
            });
        }

        //Reset Vendor id before adding a new vendor
        $scope.resetVendor = function () {
            $scope.vendor=null;
            $scope.vendor.firstName="";
        }

    }]);