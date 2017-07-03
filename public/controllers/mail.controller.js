/**
 * Created by Sk on 6/26/2017.
 */
'use strict';

angular.module('PharmacyApp').controller('MailController',['$scope','MailService',
    function ($scope,MailService) {
        /*
         * GETTERS
         * */

        //1. Send MAils

            $scope.sendMail = function(mail) {

                MailService.add(mail).then(() => {
                    console.log('Mail Sending.....');
                    $scope.mail = mail;
                    setTimeout(function(){
                        swal("Email Was Send To '"+mail.email+"' !");
                    }, 3800);

                });

            };







    }]);