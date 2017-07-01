'use strict';

angular.module('PharmacyApp').factory('UserService', ['$http',
    function ($http) {

    var currentUser ;




        return {
            get: () => $http.get('/users').then(response => response.data),
            add: user => $http.post('/users', user).then(response => response.data),
            delete: id => $http.delete('/users/'+ id).then(response => response.data),
            put: (user,id) => $http.put('/users/'+id ,user).then(response => response.data),
            getById: id => $http.get('/users/' + id).then(response => response.data),
            addComment: (id, comment) => $http.post('/users/' + id + '/comments', comment).then(response => response.data),
            setCuser: user => {
                currentUser=user;
            },
            getCuser:()=>{
                return currentUser;
            }
        };
    }]);