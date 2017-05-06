'use strict';

angular.module('PharmacyApp').factory('PrescriptionService', ['$http',
    function ($http) {
        // const user = [{
        //     _id: 34627343243,
        //     firstName: 'John',
        //     lastName: 'Smith'
        //     // birthday: '2000-10-01',
        //     // ranking: 1,
        //
        // }, {
        //     _id: 67657546465,
        //     firstName: 'Mike',
        //     lastName: 'Black'
        //     // birthday: '2002-06-12',
        //     // ranking: 2,
        //
        // }];

        return {
            get: () => $http.get('/prescription').then(response => response.data),
            add: user => $http.post('/prescription', prescription).then(response => response.data),
            delete: id => $http.delete('/prescription/'+ id).then(response => response.data),
            put: (user,id) => $http.put('/prescription/'+id ,prescription).then(response => response.data),
            getById: id => $http.get('/prescription/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/prescription/' + id + '/comments', comment).then(response => response.data),
        };
    }]);