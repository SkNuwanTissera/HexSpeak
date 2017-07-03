/**
 * Created by Sk on 7/1/2017.
 */

// const express = require('express'),
//     mongoose = require('mongoose');
//
// mongoose.set('debug', false);
//
// const UserModel = mongoose.model('User');
// var sum = UserModel.find().then(users=>{
//     users.filter(function(value){
//         return value.userType == "Patient";
//     }).length;
//     console.log(sum)
// });

$(document).ready(function() {


    var doughnutData = {
        labels: ["Patient","Doctors","Pharmacists" ],
        datasets: [{
            data: [520,50,10],
            backgroundColor: ["#a3e1d4","#dedede","#9CC3DA"]
        }]
    } ;


    var doughnutOptions = {
        responsive: true,

    };


    var ctx4 = document.getElementById("doughnutChart").getContext("2d");
    new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutOptions});

    var doughnutData = {
        labels: ["Patient","Doctors","Pharmacists" ],
        datasets: [{
            data: [70,27,85],
            backgroundColor: ["#a3e1d4","#dedede","#9CC3DA"]
        }]
    } ;


    var doughnutOptions = {
        responsive: false,
        legend: {
            display: false
        }
    };


    var ctx4 = document.getElementById("doughnutChart2").getContext("2d");
    new Chart(ctx4, {type: 'doughnut', data: doughnutData, options:doughnutOptions});

});

var lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [

        {
            label: "Doctor Channelling ",
            backgroundColor: 'rgba(26,179,148,0.5)',
            borderColor: "rgba(26,179,148,0.7)",
            pointBackgroundColor: "rgba(26,179,148,1)",
            pointBorderColor: "#fff",
            data: [50000, 48000, 62000, 65000, 49000, 63000, 67000]
        },{
            label: "Drug Sell Income",
            backgroundColor: 'rgba(220, 220, 220, 0.5)',
            pointBorderColor: "#fff",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

var lineOptions = {
    responsive: true
};


var ctx = document.getElementById("lineChart").getContext("2d");
new Chart(ctx, {type: 'line', data: lineData, options:lineOptions});
