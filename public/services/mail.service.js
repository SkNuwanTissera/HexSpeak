'use strict';

angular.module('PharmacyApp').factory('MailService', ['$http',
    function ($http) {


        return {

            add: mail => $http.post('http://localhost:4500/email', mail).then(response => response.data),

        };
    }]);