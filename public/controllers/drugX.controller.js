/**
 * Created by Sk on 7/1/2017.
 */
'use strict';

angular.module('PharmacyApp').controller('DrugXController',['$scope','DrugService',
    function ($scope,DrugService) {
        /*
         * GETTERS
         * */

        //1. Get Drugs
        function getDrugs() {

             const drugs=[{name:"ammoxilin 50mg"},{name:"panadol 500mg"},{name:"Allerid 25mg"},{name:"Oxcetol 300mg"},{name:"Cetrizin 25mg"},{name:"Conco 40mg"}];

            DrugService.get().then(drugs => {
                $scope.drugs = drugs;
        });

        }
        //invoking drugs
        getDrugs();


        /*
         * SETTERS
         * */



        $scope.addDrugs = function(drugs) {
            DrugService.add(drugs).then(() => {
                getDrugs();
                drugs = {};
        });
        };




    }]);