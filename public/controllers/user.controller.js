'use strict';

angular.module('PharmacyApp').controller('UserController',['$scope','UserService',
    function ($scope,UserService) {
    /*
     * GETTERS
     * */

        $scope.query = {}
        $scope.queryBy = '$'
        $scope.orderProp="name";
         const Currentuser={};
    //1. Get Users
    function getusers() {
        UserService.get().then(users => {
            $scope.users = users;
        });

    }
    //invoking getUsers
    getusers();


    /*
     * SETTERS
     * */

    //1. SetUser

        $scope.addUser = function(user) {
            UserService.add(user).then(() => {
                getusers();
                user = {};
            });
        };

        $scope.searchUser = function() {
            user = {};
            getusers();
        };

        $scope.deleteUser = function(id) {
            UserService.delete(id).then(() => {
                getusers();
            });
        };

        $scope.setObject = function(user) {
            $scope.cuser=user;
        };


        $scope.editUser = function(user,id) {
            UserService.put(user,id).then(() => {
                getusers();
            });
        }

        $scope.setCurrentUser = function(user) {
            UserService.setCuser(user).then(currentUser=>{
               alert(currentUser);
            });

        }

        $scope.getCurrentUser = function () {
            UserService.getCuser().then(currentUser=>{
                $scope.currentUser=currentUser;
                alert(currentUser.firstName);
            })
        }



    $scope.test="Hello";


}]);