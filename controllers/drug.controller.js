'use strict';

angular.module('PharmacyApp').controller('DrugController', ['$scope', 'DrugService',
    function ($scope, DrugService) {

        //Get All Drugs
        function getDrugs() {
            $scope.drugs={};
            DrugService.get().then(drugs => {
                $scope.drugs = drugs;
            });
        };

        //Loading all the drugs to the table
        getDrugs();

        //Add new Drug
        $scope.addDrug = function(drug) {
            DrugService.add(drug).then(() => {
                //Update the table after adding new drug
                drug = {};
                // getDrugs();
            });
            window.location.href = './drugs';
        };

        //Delete a Drug
        $scope.deleteDrug = function(id) {
            DrugService.delete(id).then(() => {
                getDrugs(); //regenerating the table after deleting
            });
        };

        //Edit Drugs
        $scope.editDrug = function(drug,id) {
            //$scope.updateBtnState = false;
            //$scope.addBtnState = true;
            DrugService.put(drug,id).then(() => {
                getDrugs();
            });
        };

        //Get a particular Drug

        $scope.getDrugUsingId = function (id) {
            DrugService.getById(id).then(drug => {
                $scope.drug = drug;
            });
        }

        //Inform user about the stock situation

        // $scope.informAboutStock = function (id) {
        //     DrugService.getById(id).then()
        // }



    }]);