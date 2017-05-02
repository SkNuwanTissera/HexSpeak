'use strict';

angular.module('PharmacyApp').controller('UserController',['UserService','$scope',
    function ($scope,UserService) {
    /*
     * GETTERS
     * */

    //1. Get Users
    function getusers() {
        // $scope.users = [
        //     {
        //         firstName:"SK",
        //         lastName:"Tissera"
        //     },
        //     {
        //         firstName:"Nimansa",
        //         lastName:"Athukoraala"
        //     }
        // ];

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
    $scope.addUser = (user) => {
        UserService.add(user).then(() => {
            getusers();
            user = {};
        });
    };

}]);