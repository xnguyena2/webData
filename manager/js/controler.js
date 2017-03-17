addminapp.controller('AdminCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window ) {
        
        
        
        $scope.contacts = [];
        $scope.selectStatus = [];
        $scope.listIdUpdate = [];        
        
        
        

        $scope.isSelected = function ($index, id) {
            if ($scope.selectStatus[$index]) {
                $scope.listIdUpdate.push(id);
            } else {
                $scope.listIdUpdate.splice($scope.listIdUpdate.indexOf(id), 1);
            }
        };
        $scope.isSelectedAll = function(){
            if($scope.checkkAll.value){
                for (var i = 0; i < $scope.contacts.length; i++) {
                    $scope.selectStatus[i] = true;
                    $scope.listIdUpdate.push($scope.contacts[i]['ID']);                    
                }
            }else {
                for (var i = 0; i < $scope.selectStatus.length; i++) {
                    $scope.selectStatus[i] = false;
                    var remove = $scope.listIdUpdate.indexOf($scope.contacts[i]['ID']);
                    if(remove>-1)
                        $scope.listIdUpdate.splice(remove, 1);
                }
            }
        }
        
        $scope.banUser = function(){
            //console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    company: true,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/banuser.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getUserlist();
                    alert(response);
                }
            });
        }
        $scope.unbanUser = function(){
            //console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    company: true,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/unbanuser.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getUserlist();
                    alert(response);
                }
            });
        }
        
        $scope.companyUpdate = function(){
            //console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    company: true,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/confirmupdate.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getcompanyupdatelist();
                    alert(response);
                }
            });
        }
        
        $scope.deletecompanyUpdate = function(){
            //console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    company: true,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/deletecompanyupdate.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getcompanyupdatelist();
                    alert(response);
                }
            });
        }
        
        $scope.contactUpdate = function(){
            console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/confirmupdate.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getcontactupdatelist();
                    alert(response);
                }
            });
        }
        
        $scope.deletecontactUpdate = function(){
            console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/deletecontactupdate.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getcontactupdatelist();
                    alert(response);
                }
            });
        }
        
        $scope.adminLogin = function(){
            $.ajax({
                type: "POST",
                data: {
                    username: $('#username').val(),
                    password: CryptoJS.MD5($('#password').val()).toString(),
                    token: 0
                },
                url: rootUrl+"mysite/api/adminlogin.php",
                success: function (response) {
                    if (response !== '-1') {
                        console.log(response);
                        $.cookie('ADMINTOKEN', response, {expires: 1, path: '/'});
                        window.location.href = rootUrl+"mysite/manager/index.html";
                    }
                    else{
                        alert('incorrect user name or password!');
                    }
                }
            });
        }
        $scope.getcompanyupdatelist = function(){
            $.ajax({
                type: "POST",
                data: {
                    page: 0,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/getcompanyupdatelist.php",
                success: function (response) {
                    if (response !== '-1') {
                        console.log(response);
                        $scope.contacts = response;
                    }
                    else{
                    }
                    $scope.$apply();
                }
            });
        }
        $scope.getcontactupdatelist = function(){
            $.ajax({
                type: "POST",
                data: {
                    page: 0,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/getcontactupdatelist.php",
                success: function (response) {
                    if (response !== '-1') {
                        console.log(response);
                        $scope.contacts = response;
                    }
                    else{
                    }
                    $scope.$apply();
                }
            });
        }        
        
        $scope.getUserlist = function(){
            $.ajax({
                type: "POST",
                data: {
                    page: 0,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/getuserlist.php",
                success: function (response) {
                    if (response !== '-1') {
                        console.log(response);
                        $scope.contacts = response;
                    }
                    else{
                    }
                    $scope.$apply();
                }
            });
        }        
        
        $scope.deleteUser = function(){
            //console.log($scope.listIdUpdate);
            //console.log($.cookie('ADMINTOKEN'));
            $.ajax({
                type: "POST",
                data: {
                    arrayID: $scope.listIdUpdate,
                    company: true,
                    token: $.cookie('ADMINTOKEN')
                },
                url: rootUrl+"mysite/api/deleteuser.php",
                success: function (response) {
                    //console.log(response);
                    $scope.getUserlist();
                    alert(response);
                }
            });
        }   
        
        $scope.companyClick = function($name){
            window.location.href = rootUrl+"mysite/newguid/company/"+$name+".html";
        }
        
        $scope.gotologin = function(){
            window.location.href = rootUrl+"mysite/manager/login.html";
        }
        
        $scope.gotoimport = function(){
            window.location.href = rootUrl+"mysite/manager/import.html";
        }
        
        $scope.gotouser = function(){
            window.location.href = rootUrl+"mysite/manager/user.html";
        }
        
        $scope.gotocompany = function(){
            window.location.href = rootUrl+"mysite/manager/companyupdate.html";
        }
        
        $scope.gotocontact = function(){
            window.location.href = rootUrl+"mysite/manager/contactupdate.html";
        }
        
}]);