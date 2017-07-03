'use strict';

angular.module('PharmacyApp').controller('OrderMailController', ['$scope', 'VendorService',
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

        //Form Validation Function
        function validateForm (){
            var valid=true;
            if(document.getElementById("input1").selectedIndex <1){
                valid=false;
                swal({
                    title: "Please Select a Drug!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }
            if(document.getElementById("input2").selectedIndex <1){
                valid=false;
                swal({
                    title: "Please Select a Vendor!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }
            if(document.getElementById('input5').value==""){
                valid=false;
                swal({
                    title: "Description Field is Empty!",
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
        };

        $scope.sendMail = function () {
            if(validateForm()){
                swal({
                        title: "Do You Really Want To Place This Order?",
                        text: "",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        showLoaderOnConfirm: true,
                    },
                    function(){

                        var date = document.getElementById('input6').value;
                        var order={"drug":$scope.selectedDrug.drugName,"vendor":$scope.selectedVendor.firstName,"vendorEmail":$scope.selectedVendorEmail,"qty":$scope.quantity,"note":$scope.description,"orderDate":date,"status":"Pending","receivedDate":"-"};
                        VendorService.addOrder(order);

                        var email={"drug":$scope.selectedDrug.drugName,"vendor":$scope.selectedVendor.firstName,"qty":$scope.quantity,"note":$scope.description,"date":date,"email":$scope.selectedVendorEmail};
                        VendorService.sendMail(email);

                        setTimeout(function(){
                            swal("Order Was Placed!",);
                            setTimeout(function(){
                                window.location.href = './orders';
                            },3200);
                        }, 2500);
                    });
            }
        };

    }]);