'use strict';

angular.module('PharmacyApp').factory('DrugService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/drugs').then(response => response.data),
            add: drug => $http.post('/drugs', drug).then(response => response.data)
        };
    }]);