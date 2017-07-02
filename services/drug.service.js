'use strict';

angular.module('PharmacyApp').factory('DrugService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/drugs').then(response => response.data),
            add: drug => $http.post('/drugs', drug).then(response => response.data),
            delete: id => $http.delete('/drugs/'+ id).then(response => response.data),
            put: (drug,id) => $http.put('/drugs/'+id ,drug).then(response => response.data),
            getById: id => $http.get('/drugs/' + id).then(response => response.data)
        };
    }]);

