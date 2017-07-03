'use strict';

angular.module('PharmacyApp').controller('OrderController', ['$scope', 'VendorService',
    function ($scope, VendorService) {

        //Get All Orders
        function getOrders() {
            VendorService.getOrder().then(orders => {
                $scope.orders = orders;
            });
        };

        //Invoking Get All Orders function to load the table
        getOrders();

        //Get a particular Vendor
        $scope.getOrderByID = function (id) {
            VendorService.getOrderById(id).then(order => {
                $scope.order = order;
            });
        }

    }]);