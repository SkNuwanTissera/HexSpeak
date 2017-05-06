'use strict';

angular.module('PharmacyApp').factory('PrescriptionService', ['$http',
    function ($http) {
        return {
            get: () => $http.get('/prescriptions').then(response => response.data),
            add: user => $http.post('/prescriptions', prescription).then(response => response.data),
            delete: id => $http.delete('/prescriptions/'+ id).then(response => response.data),
            put: (user,id) => $http.put('/prescriptions/'+id ,prescription).then(response => response.data),
            getById: id => $http.get('/prescriptions/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/prescriptions/' + id + '/comments', comment).then(response => response.data),
        };
    }]);