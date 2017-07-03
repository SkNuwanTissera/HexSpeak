'use strict';

angular.module('PharmacyApp').controller('UserController',['$scope','UserService','MailService',
    function ($scope,UserService,MailService) {
    /*
     * GETTERS
     * */

        //Form Validation Function
        function validateForm () {
            var valid=true;
            var fName = document.getElementById('fname').value;
            var lName = document.getElementById('lname').value;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var cpassword = document.getElementById('cpassword').value;
            var mobile = document.getElementById('mobile').value;
            var email = document.getElementById('email').value;


            //Check Empty Fields
            if(fName==""||lName==""||mobile==""||email==""||password==""||cpassword==""||username==""){
                valid=false;
                swal({
                    title: "Some Required Fields Are Empty?",
                    text: "Check With Username, FirstName, LastName, Passwords Fields are Required!",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }


                if(password != cpassword) {
                    valid=false;
                  swal({
                      title:"Passwords Do not Match",
                      text : "Check Password with Confirm Password",
                      type: "warning",
                      showCancelButton: false,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Re-Enter!",
                      closeOnConfirm: true

                  });
                    return valid;
                }



            //Validate Mobile No
            if (/^\d{10}$/.test(mobile)==false) {
                valid=false;
                swal({
                    title: "Invalid Mobile No!",
                    text: "Number should be like 077 585 6964",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }

            //validate passwords


            //Validate Email Address
            var tempEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (tempEmail.test(email) == false)
            {
                valid=false;
                swal({
                    title: "Invalid Email Address!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Retry!",
                    closeOnConfirm: true
                });
                return valid;
            }

            return valid;

        }

        $scope.query = {}
        $scope.querySort = {}
        $scope.queryBy = '$'
        $scope.sort = '$'
        $scope.utype = '$'
        $scope.orderProp="name";
         const Currentuser={};


    //1. Get Users
    function getusers() {
        UserService.get().then(users => {
                $scope.users = users;
                $scope.userCount = users.length;
        });

    }
    //invoking getUsers
    getusers();


    /*
     * SETTERS
     * */

    //1. SetUser

        $scope.addUser = function(user) {

            if (validateForm()){

                swal({
                        title: "Do You Really Want To Add This ?",
                        text: "",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        showLoaderOnConfirm: true,
                    },
                    function(){

                        UserService.add(user).then((x) => {

                            MailService.add(x).then(() => {
                                console.log('Mail Sending.....');
                                setTimeout(function(){
                                    swal("Email Was Send To '"+x.email+"' !");
                                }, 3800);

                            });
                            //Update the table after adding new user
                            getusers();
                            user = {}

                        });
                        setTimeout(function(){
                            swal("New User Added Successfully!");
                            setTimeout(function(){
                                window.location.href = './users';
                            },4800);
                        }, 4800);
                    });
            }
        };

        $scope.searchUser = function() {
            user = {};
            getusers();
        };

        $scope.deleteUser = function(id) {
            swal({
                    title: "Are you sure?",
                    text: "This User Will Be Terminated Only!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Terminate it!",
                    closeOnConfirm: false
                },
                function(){
                    UserService.delete(id).then(() => {
                        getusers();
                    });
                    swal("Terminated!", "The User is Terminated.", "success");
                    setTimeout(function(){
                        window.location.href = './users';
                    },1800);
                });
        };

        $scope.setObject = function(Temp) {
            $scope.Temp=Temp;
        };


        $scope.editUser = function(user,id) {

            if (true){
                swal({
                        title: "Do You Really Want To Save The Changes?",
                        text: "",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        showLoaderOnConfirm: true,
                    },
                    function(){

                        UserService.put(user,id).then(() => {
                            getusers();
                        });

                        setTimeout(function(){
                            swal("User Details Updated!",);
                            setTimeout(function(){
                                window.location.href = './users';
                            },1800);
                        }, 1000);
                    });
            }
        }

        $scope.setCurrentUser = function(user) {
            UserService.setCuser(user).then(currentUser=>{
               alert(currentUser);
            });

        }

        $scope.getCurrentUser = function () {
            UserService.getCuser().then(currentUser=>{
                $scope.currentUser=currentUser;
                alert(currentUser.firstName);
            })
        }

        function setUserForPrescription(user) {
            $scope.x=user;
        }



    $scope.test="Hello";


}]);