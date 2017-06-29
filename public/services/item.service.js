'use strict';

angular.module('PharmacyApp').factory('ItemService', ['$http',
    function ($http) {
        const item = [{
            _id: 34627343243,
            itemName:"Ammoxilin",
            description:"Its a generic drug"

        }, {
            _id: 67657546465,
            itemName:"Panadol",
            description:"Its 500mg . White color"


        }];



        return {
            get: () => $http.get('/items').then(response => response.data),
            add: item => $http.post('/items', item).then(response => response.data),
            getById: id => $http.get('/items/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/items/' + id + '/comments', comment).then(response => response.data),
        };
    }]);