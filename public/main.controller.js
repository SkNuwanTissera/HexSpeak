'use strict';

angular.module('PharmacyApp').controller('MainController', ['$scope', 'UserService','ItemService',
    function ($scope, UserService,ItemService ) {

        /*
        * GETTERS
        * */

        //1. Get Users
        function getusers() {

            UserService.get().then(users => {
                $scope.users = users;
            });
        }
        //invoking getUsers
        getusers();

        //2. Get Items
        function getitems() {

            ItemService.get().then(item => {
                $scope.items = items;
            });
        }
        //invoking getItems
        getitems();

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

        //2. SetItem
        $scope.addItem = (item) => {
            UserService.add(item).then(() => {
                getitems();
                item = {};
            });
        };


    }]);