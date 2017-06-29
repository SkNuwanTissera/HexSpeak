'use strict';

angular.module('PharmacyApp').factory('VendorService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/vendors').then(response => response.data),
            add: vendor => $http.post('/vendors', vendor).then(response => response.data),
            delete: id => $http.delete('/vendors/'+ id).then(response => response.data),
            put: (vendor,id) => $http.put('/vendors/'+id ,vendor).then(response => response.data),
            getById: id => $http.get('/vendors/' + id).then(response => response.data)
        };
    }]);