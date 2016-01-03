var app = angular.module('myApp', []);
app.controller('PeopleCtrl', function ($scope, $http) {
    $scope.selectStatus = [];
    $scope.addedInfomation = [];
    var numeroPerguntas = 50;
    for (var i = 0; i < numeroPerguntas; i++) {
        $scope.selectStatus.push(false);
    }
    $scope.page = 0;
    $scope.selectedObject = [];
    $scope.loadPeople = function () {

        $http.get("/mysite/getresult.php",
                {params: {name: $scope.id, password: $scope.password, page: $scope.page, industries: $scope.industries}})
                .success(function (response) {
                    if (response !== -1)
                        $scope.people = response;
                    var arrayLength = response.length;
                    for (var i = 0; i < arrayLength; i++) {
                        $scope.selectStatus[i] = (response[i].EMAIL.indexOf('xxxxxxx') < 0);
                    }
                });
    };

    $scope.showCompany = function ($name) {
        $http.get("/mysite/company.php",
                {params: {name: $name}})
                .success(function (response) {
                    console.log(response);
                });
    }

    $scope.showEmailAndPhone = function () {
        if (confirm("You will pay for this!") == true) {
            $.ajax({
                type: "POST",
                data: {arrayCredit:$scope.addedInfomation,name:$scope.id},
                url: "/mysite/addinfomation.php",
                success: function(msg){
                    //$('.answer').html(msg);
                    if(msg === '0')
                        alert("You dont have engouth credit, get out from my site!!");
                    else {
                        alert("You was used "+msg+" credit!");
                    }
                    $scope.addedInfomation.splice(0 , $scope.addedInfomation.length);
                }
            });
        }
    }

    $scope.saveCSV = function () {
        $.ajax({
            type: "POST",
            data: {arrayCredit: $scope.addedInfomation, name: $scope.id},
            url: "/mysite/addinfomation.php",
            success: function (msg) {
                //$('.answer').html(msg);
                alert(msg);
            }
        });
        //JSONToCSVConvertor(angular.copy($scope.selectedObject), "Export Imfomation From Web", true);
    };

    $scope.isSelected = function ($status, $index) {
        if ($status) {
            $scope.addedInfomation.push($index);
        } else {
            $scope.addedInfomation.splice($scope.addedInfomation.indexOf($index), 1);
        }
    };
}
);
/*
 $(document).ready(function() {
 $('button').click(function() {
 var data = $('#txt').val();
 if (data == '')
 return;
 
 JSONToCSVConvertor(data, "Vehicle Report", true);
 });
 });*/


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;


    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}