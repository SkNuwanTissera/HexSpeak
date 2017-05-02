'use strict';

angular.module('PharmacyApp').factory('UserService', ['$http',
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
            get: () => $http.get('/users').then(response => response.data),
            add: user => $http.post('/users', user).then(response => response.data),
            getById: id => $http.get('/users/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/users/' + id + '/comments', comment).then(response => response.data),
        };
    }]);