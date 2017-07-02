'use strict';


angular.module('PharmacyApp').controller('DrugController', ['$scope', 'DrugService',
    function ($scope, DrugService) {
        $scope.drug = {};
        //var dateX = new Date("2016-06-21");
        //$scope.drug.dateManu=dateX;

        alertOnStock();
        alertOnExpiryDate();
        //Get All Drugs
        function getDrugs() {
            $scope.drugs = {};
            DrugService.get().then(drugs => {
                $scope.drugs = drugs;
                //$scope.drugs.dateOfManufacture =
            });
        };

        //Loading all the drugs to the table
        getDrugs();


        //Add new Drug
        $scope.addDrug = function (drug) {
            //$scope.updateBtnState = true;
            //$scope.addBtnState = false;
            console.log(drug);


            DrugService.add(drug).then(() => {
                //Update the table after adding new drug
                drug = {};
                getDrugs();
            });
			window.location.href = './drugs';
        };

        //Delete a Drug
        $scope.deleteDrug = function (id) {
            DrugService.delete(id).then(() => {
                getDrugs(); //regenerating the table after deleting
            });
        };

        //Edit Drugs
        $scope.editDrug = function (drug, id) {
            //$scope.updateBtnState = false;
            //$scope.addBtnState = true;
            DrugService.put(drug, id).then(() => {
                getDrugs();
            });
        };

        //Get a particular Drug

        $scope.getDrugUsingId = function (id) {
            DrugService.getById(id).then(drug => {


                $scope.drug.dateOfManufacture =formatDate(drug.dateOfManufacture);
                $scope.drug.dateOfExp = new Date(drug.dateOfExp);
                $scope.drug = drug;

            });
        }

        //Inform user about the stock situation

        function alertOnStock() {
            var names = [];
            var batch = [];
            var minQuantity = 20;
            //var namesWithLowQuantity = {};
            DrugService.get().then(data => {
                    data.forEach(dataVal => {
                        if (dataVal.quantity < minQuantity) {

                            names.push(dataVal.drugName);
                            batch.push(dataVal.batchNo);
                        }


                    });
                    alert(" Stocks are Low on the Drugs : " + names + "\n" + " Of Batches : " + batch);

                }
            )

        };

        function alertOnExpiryDate() {


            var today = new Date();
            var drugNames =[];
            var batchNums =[];



            DrugService.get().then(data => {
                    data.forEach(dataVal => {
                        var expdate = new Date(dataVal.dateOfExp);
                        if(today.getFullYear() >= expdate.getFullYear())
                        {
                            drugNames.push(dataVal.drugName);
                            batchNums.push(dataVal.batchNo);
                        }



                    })
                alert("The Drug Batches : " + batchNums+ "\n"+" Which Consists the Drugs : " +drugNames+"\n" + " has expired" );
                }
            )


        };

        // function setDateFormatt(unformattedDate) {
        //     var date = new Date(unformattedDate);
        //     var dd = date.getDate();
        //     var mm = date.getMonth();
        //     var yy = date.getFullYear();
        //     //console.log(dateOfExp);
        //     return dd + "-" + mm + "-" + yy;
        //
        //
        // };

        function formatDate(date) {

            var d = new Date(date);
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = d.getDate();
            var monthIndex = d.getMonth();
            var year = d.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }


    }]);