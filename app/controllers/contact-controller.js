myapp.controller('ContactCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window ) {
        $scope.data = {
            title: 'hello',
            website: 'cloudats.net'
        };

        $scope.checkboxModel = {
            all_value: false,
            level1: false,
            level2: false,
            level3: false,
            level4: false,
            level5: false
        };
        
        $scope.showNext = [true,true,true,true,true,true,true];
        
        $scope.dropDownValue = [
            {id:'10', value:10},
            {id:'25', value:25},
            {id:'50', value:50},
            {id:'75', value:75},
            {id:'100', value:100}
        ];
        $scope.Mainmenu = ['Solutions','Products','Company','Contact'];
                
        $scope.resultSearchFliter = '';
        $scope.jobTitleFliter = '';
        $scope.location_code = '';
        $scope.companyFliter = '';
        
        $scope.errorUserNameOrPassword = false;
        $scope.userName = "Sign in";
        $scope.selectStatus = [];
        $scope.selectHistoryArray = [];
        $scope.checkkAll = {value: false};
        $scope.addedInfomation = [];
        $scope.userID = 'xnguyena@gmail.com';
        var numeroPerguntas = 25;
        for (var i = 0; i < numeroPerguntas; i++) {
            $scope.selectStatus.push(false);
        }
        
        $scope.userNamer = '';
        $scope.availableCredit = 0;
        $scope.credit = 0;
        $scope.isLogin = false;
        $scope.currentPlan = '';
        $scope.scribOn = '';       
        
        $scope.rootUrl = rootUrl;
        $scope.leftPanel = rootUrl+'mysite/app/views/leftpanel.tpl.html';
        $scope.updateContactForm = rootUrl+'mysite/app/views/contactupdateform.html';
        $scope.updateCompanyForm = rootUrl+'mysite/app/views/companyupdateform.html';
        $scope.paypalSubcription = rootUrl+'mysite/app/views/paypalsubcrision.html';
        $scope.paypalCalcleSubcription = rootUrl+'mysite/app/views/paypalcancelsubcrision.html';
        
        $scope.token = $.cookie("TOKEN");
        if ($scope.token !== 'undefined' && $scope.token !== null) {
            $.ajax({
                type: "POST",
                data: {
                    username: $('#username').val(),
                    password: CryptoJS.MD5($('#password').val()).toString(),
                    token: $scope.token
                },
                url: rootUrl+"mysite/api/login.php",
                success: function (response) {
                    if (response !== '-1') {
                        //console.log(response);
                        if(response['ACTIVITY']){
                            $scope.isLogin = true;
                            $.cookie('TOKEN', response['TOKEN'], {expires: 7, path: '/'});
                            $scope.userID = response['ID'];
                            $scope.availableCredit = response['CREDIT'];
                            $scope.userName = response['NAME'];
                            $scope.currentPlan = response['PLAN'];
                            $scope.scribOn = response['DATE'];
                            $scope.token = response['TOKEN'];
                            $scope.userNamer = response['NAME'];
                            $scope.credit = parseInt(response['CREDIT']);
                            $scope.getFolderInfomation();
                            $scope.$apply();
                        }else {
                            $scope.dropDownValue = [
                                {id:'25', value:25}
                            ];
                            alert('you have to vertify your email first!');
                        }
                    }
                    else{
                        $scope.dropDownValue = [
                            {id:'25', value:25}
                        ];
                    }
                }
            });
        }
        
        $scope.isSelectedAll = function(){
            if($scope.checkkAll.value){
                for (var i = 0; i < $scope.contacts.length; i++) {
                    $scope.selectStatus[i] = true;
                    if(($scope.contacts[i]['EMAIL'].indexOf('xxxxxxx') >= 0)){
                        $scope.addedInfomation.push($scope.contacts[i]['ID']);
                    }
                }
            }else {
                for (var i = 0; i < $scope.selectStatus.length; i++) {
                    $scope.selectStatus[i] = false;
                    remove = $scope.addedInfomation.indexOf($scope.contacts[i]['ID']);
                    if(remove>-1)
                        $scope.addedInfomation.splice(remove, 1);
                }
            }
        }
        
        $scope.contactClick = function($index){
            //window.location.href = rootUrl+"mysite/app/contact/"+$scope.token+"_"+$scope.contacts[$index]['ID']+".html";
            window.location.href = rootUrl+"mysite/testguid/contact/"+$scope.token+"_"+$scope.contacts[$index]['ID']+".html";
        }
        
        $scope.logOut = function(){
            $.removeCookie('TOKEN', { path: '/' });
            window.location.reload();
        }
        
        $scope.showLoginForm = function () {
            window.location.href = rootUrl+"mysite/testguid/login/login.html";            
        }
        
        $scope.showSignUpForm = function () {            
            window.location.href = rootUrl+"mysite/testguid/login/signup.html";            
        }

        $scope.checkboxSize = {
            all_size: false,
            size1: false,
            size2: false,
            size3: false,
            size4: false,
            size5: false
        };
        $scope.currentIndex = 1;
        $scope.minPage = 1;
        $scope.maxPage = 20;
        $scope.pagingBar = true;
        $scope.previousPaging = 'disabled';
        $scope.nextPaging = '';
        $scope.acctive = ['active','','','','','disabled',''];
        $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
        $scope.textResults = "0 contacts found for your advanced search!";
        
        $scope.updatePagging = function(){
            if($scope.currentIndex === 1){
                //console.log('1');               
                $scope.previousPaging = 'disabled';
                $scope.nextPaging = '';
                $scope.acctive = ['active','','','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if($scope.currentIndex === 2){
                //console.log('2');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','active','','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if($scope.currentIndex === 3){
                //console.log('3');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','','active','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if(($scope.currentIndex === $scope.maxPage && $scope.maxPage > 6) || ($scope.currentIndex === 4 && $scope.maxPage < 7)){
                //console.log('4');
                $scope.previousPaging = '';
                $scope.nextPaging = 'disabled';
                if($scope.maxPage > 6){
                    $scope.acctive = ['','disabled','','','','','active'];
                    $scope.textpage = ['1','...',$scope.currentIndex-4,$scope.currentIndex-3,$scope.currentIndex-2,$scope.currentIndex-1,$scope.maxPage];
                }else if($scope.maxPage === 6 && $scope.currentIndex > 5){
                    $scope.acctive = ['','','','','','active',''];
                    $scope.textpage = ['1','2','3','4','5','6','7'];
                }else {
                    $scope.acctive = ['','','','active','','',''];
                    if($scope.currentIndex === 4){
                        $scope.nextPaging = '';                        
                    }
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }
            }else if(($scope.currentIndex === $scope.maxPage - 1 && $scope.maxPage > 4) || $scope.maxPage === 5){
                //console.log('5');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                if($scope.maxPage === 6 || $scope.maxPage === 5){
                    $scope.acctive = ['','','','','active','',''];
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }else{
                    $scope.acctive = ['','disabled','','','','active',''];
                    $scope.textpage = ['1','...',$scope.currentIndex-3,$scope.currentIndex-2,$scope.currentIndex-1,$scope.currentIndex,$scope.maxPage];
                }
            }else if(($scope.currentIndex === $scope.maxPage - 2 && $scope.maxPage > 6)  || $scope.maxPage === 6){ 
                //console.log('6');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                if($scope.maxPage === 6){
                    $scope.acctive = ['','','','','','active',''];
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }else 
                {
                    $scope.acctive = ['','disabled','','','active','',''];
                    $scope.textpage = ['1','...',$scope.currentIndex-2,$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,$scope.maxPage];                    
                }
            }else if($scope.currentIndex === $scope.maxPage - 3 && $scope.maxPage > 6){                
                //console.log('7');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','disabled','','active','','',''];
                $scope.textpage = ['1','...',$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,$scope.currentIndex+2,$scope.maxPage];
            }else if($scope.maxPage > 6){          
                //console.log('8');                     
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','disabled','','active','','disabled',''];
                $scope.textpage = ['1','...',$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,'...',$scope.maxPage];
            }
        }
        
        $scope.pagingClick = function (page){
            if(!$scope.searchAtBegin){
                $scope.selectHistoryArray[($scope.currentIndex - 1)] = $scope.selectStatus.slice();
                //console.log($scope.selectHistoryArray);
            }
            $scope.currentIndex = parseInt(page);
            //console.log('page:'+$scope.currentIndex+', '+$scope.maxPage);
            if($scope.currentIndex === 1){
                //console.log('1');               
                $scope.previousPaging = 'disabled';
                $scope.nextPaging = '';
                $scope.acctive = ['active','','','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if($scope.currentIndex === 2){
                //console.log('2');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','active','','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if($scope.currentIndex === 3){
                //console.log('3');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','','active','','','disabled',''];
                $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
            }else if(($scope.currentIndex === $scope.maxPage && $scope.maxPage > 6) || ($scope.currentIndex === 4 && $scope.maxPage < 7)){
                //console.log('4');
                $scope.previousPaging = '';
                $scope.nextPaging = 'disabled';
                if($scope.maxPage > 6){
                    $scope.acctive = ['','disabled','','','','','active'];
                    $scope.textpage = ['1','...',$scope.currentIndex-4,$scope.currentIndex-3,$scope.currentIndex-2,$scope.currentIndex-1,$scope.maxPage];
                }else if($scope.maxPage === 6 && $scope.currentIndex > 5){
                    $scope.acctive = ['','','','','','active',''];
                    $scope.textpage = ['1','2','3','4','5','6','7'];
                }else {
                    $scope.acctive = ['','','','active','','',''];
                    if($scope.currentIndex === 4){
                        $scope.nextPaging = '';                        
                    }
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }
            }else if(($scope.currentIndex === $scope.maxPage - 1 && $scope.maxPage > 4) || $scope.maxPage === 5){
                //console.log('5');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                if($scope.maxPage === 6 || $scope.maxPage === 5){
                    $scope.acctive = ['','','','','active','',''];
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }else{
                    $scope.acctive = ['','disabled','','','','active',''];
                    $scope.textpage = ['1','...',$scope.currentIndex-3,$scope.currentIndex-2,$scope.currentIndex-1,$scope.currentIndex,$scope.maxPage];
                }
            }else if(($scope.currentIndex === $scope.maxPage - 2 && $scope.maxPage > 6)  || $scope.maxPage === 6){ 
                //console.log('6');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                if($scope.maxPage === 6){
                    $scope.acctive = ['','','','','','active',''];
                    $scope.textpage = ['1','2','3','4','5','6',$scope.maxPage];
                }else 
                {
                    $scope.acctive = ['','disabled','','','active','',''];
                    $scope.textpage = ['1','...',$scope.currentIndex-2,$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,$scope.maxPage];                    
                }
            }else if($scope.currentIndex === $scope.maxPage - 3 && $scope.maxPage > 6){                
                //console.log('7');               
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','disabled','','active','','',''];
                $scope.textpage = ['1','...',$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,$scope.currentIndex+2,$scope.maxPage];
            }else if($scope.maxPage > 6){          
                //console.log('8');                     
                $scope.previousPaging = '';
                $scope.nextPaging = '';
                $scope.acctive = ['','disabled','','active','','disabled',''];
                $scope.textpage = ['1','...',$scope.currentIndex-1,$scope.currentIndex,$scope.currentIndex+1,'...',$scope.maxPage];
            }
            //$scope.$apply();
            if(!$scope.showInBarSearch){
                //console.log("ddddddddddddddd");
                $scope.getCVSFile($scope.currentFolder,$scope.currentCount,$scope.currentIndex-1,false);
            }else {                
                if($scope.isSearchAdvance)
                    $scope.searchPress($scope.currentIndex-1, false);
                else $scope.searchPress($scope.currentIndex-1, false, $('#searchTextInput').val());
            }        
        }
        
        $scope.company = {
            ADDRESS: "4302 Price St",
            CITY: "Los Angeles",
            COUNTRY: "United States",
            INDUSTRIES: "Retail, Clothing and Shoes StoresManufacturing, Textiles, Apparel and Accessories",
            NAME: "[bump] babies, inc",
            OWNERSHIP: "Privately Held",
            PHONE: "+1.323.664.8244",
            REVENUE: "$0 - 1M",
            SIZE: "0 - 25",
            STATE: "CA",
            URL: "www.cumpcscies.com",
            ZIP: "20023-2815"
        };

        $scope.contact = {
            name: 'Erin Ellison',
            rank: 'Event Sales Manager',
            info: 'info@10pinbowlinglounge.com'
        };

        $scope.collapse_menu = true;
        $scope.collapse_menu_industry = true;
        $scope.collapse_menu_revenue = true;
        $scope.collapse_menu_company_size = true;
        $scope.collapse_menu_location = true;

        $scope.open_close_location = function (collapse) {
            $scope.collapse_menu_location = !collapse;
        }
        $scope.open_close_company_size = function (collapse) {
            $scope.collapse_menu_company_size = !collapse;
        }
        $scope.open_close = function (collapse) {
            $scope.collapse_menu = !collapse;
        }
        $scope.open_close_industry = function (collapse) {
            $scope.collapse_menu_industry = !collapse;
        }
        $scope.open_close_revenue = function (collapse) {
            $scope.collapse_menu_revenue = !collapse;
        }

        $scope.$watch('checkboxModel.all_value', function (newValue) {
            if (newValue !== undefined) {
                if (newValue === true) {
                    $scope.checkboxModel = {
                        all_value: true,
                        level1: true,
                        level2: true,
                        level3: true,
                        level4: true,
                        level5: true
                    };
                }

            }
        });

        $scope.$watch('checkboxSize.all_size', function (newValue) {
            if (newValue !== undefined) {
                if (newValue === true) {
                    $scope.checkboxSize = {
                        all_size: true,
                        size1: true,
                        size2: true,
                        size3: true,
                        size4: true,
                        size5: true
                    };
                }

            }
        });
        
        $scope.$watch('companyInfomation', function (newValue) {
            //console.log(decodeURIComponent(newValue));
            $scope.rootUrl = rootUrl;
            if (newValue !== undefined) {
                $http.get(rootUrl+"mysite/api/company.php",
                {
                    params: {name: decodeURIComponent(newValue)}
                })
                .success(function (response) {
                    console.log(response);
                    if(response.length>0){
                        $scope.company = response[0];
                        $scope.companyName = $scope.company['NAME'];
                        $scope.companyPhone = $scope.company['PHONE'];
                        $scope.companyAddress = $scope.company['ADDRESS'];
                        $scope.companyCity = $scope.company['CITY'];
                        $scope.companyZip = $scope.company['ZIP'];
                        $scope.companyWebsite = $scope.company['URL'];
                        $scope.mainContain = rootUrl+"mysite/app/views/testcompany.html";
                    }
                });
            }
        });
        
        $scope.$watch('contactInfomation', function (newValue) {
            //console.log(newValue);
            $scope.rootUrl = rootUrl;
            if (newValue !== undefined) {
                $http.get(rootUrl+"mysite/api/contactinfo.php",
                {
                    params: {info: decodeURIComponent(newValue)}
                })
                .success(function (response) {
                    console.log(response);
                    $scope.contacts = response;
                    $scope.showContactInfomation(0);
                });
            }
        });
        
        $scope.$watch('thankUpdate', function (newValue) {
            //console.log(newValue);
            if (newValue !== undefined) {
                $scope.mainContain = rootUrl+"mysite/app/views/thank.html";         
            }
        });
        
        $scope.checkedJobLevel = function () {
            var count_checked = $('[name="role_level"]:checked').length;
            if (count_checked == $scope.job_role_levels.length) {
                $scope.all_levels.value = true;
            } else {
                $scope.all_levels.value = false;
            }
        };

        $scope.checkedJobDepart = function () {
            var count_checked = $('[name="role_depart"]:checked').length;
            if (count_checked == $scope.job_role_departments.length) {
                $scope.all_departs.value = true;
            } else {
                $scope.all_departs.value = false;
            }
        };

        $scope.all_levels = {
            _id: 'job1',
            level: 'All levels',
            value: false
        };

        $scope.all_departs = {
            _id: 'depart1',
            depart: 'All Departments',
            value: false
        };

        $scope.job_role_levels = [
            {
                _id: 'job2',
                level: 'C-Level',
                value: false
            },
            {
                _id: 'job3',
                level: 'VP',
                value: false
            },
            {
                _id: 'job4',
                level: 'Director',
                value: false
            },
            {
                _id: 'job5',
                level: 'Manager',
                value: false
            },
            {
                _id: 'job6',
                level: 'Staff',
                value: false
            }];

        $scope.job_role_departments = [
            {
                _id: 'depart2',
                depart: 'Sales',
                value: false
            },
            {
                _id: 'depart3',
                depart: 'Marketing',
                value: false
            },
            {
                _id: 'depart4',
                depart: 'Finance & Administration',
                value: false
            },
            {
                _id: 'depart5',
                depart: 'Human Resources',
                value: false
            },
            {
                _id: 'depart6',
                depart: 'Support',
                value: false
            },
            {
                _id: 'depart7',
                depart: 'Engineering & Research',
                value: false
            },
            {
                _id: 'depart8',
                depart: 'Operations',
                value: false
            },
            {
                _id: 'depart9',
                depart: 'IT & IS',
                value: false
            },
            {
                _id: 'depart10',
                depart: 'Other',
                value: false
            }];

        $scope.mainContain = rootUrl+"mysite/app/views/list-contact.tpl.html";
        $scope.industriesParameter = [];
        $scope.revenueParameter = [];
        $scope.sizeParameter = [];
        $scope.jobTitleLevel = [];
        $scope.departments = [];
        $scope.postionLocation = [];
        $scope.contacts = [];
        $scope.folders = [];
        $scope.showInBarSearch = true;
        $scope.contactInfo = {
            ID: '',
            FIRSTNAME: '',
            LASTNAME: '',
            TITLE: '',
            EMAIL: '',
            PROFILECITY: '',
            PROFILESTATE: '',
            PROFILECOUNTRY:''
        };
        
        $scope.goBackToResult = function(){
            $scope.mainContain = rootUrl+"mysite/app/views/list-contact.tpl.html";
            //$window.history.back();
        }
        $scope.firstLoadFolder = true;
               
        $scope.getFolderInfomation = function(){
            $.ajax({
                    type: "POST",
                    data: {
                        token: $scope.token
                    },
                    url: rootUrl+"mysite/api/folderInfo.php",
                    success: function (response) {
                        //console.log(response);
                        if(response !== '-1'){
                            $scope.folders = response;
                        }
                        if(!$scope.firstLoadFolder)
                            $scope.mainContain = rootUrl+"mysite/app/views/addToFolder.html";
                        $scope.firstLoadFolder = false;
                        $scope.$apply();
                    }
                });
        }

        $scope.showContactInfomation = function ($name) {
            $scope.contactInfo = {
                ID: $scope.contacts[$name]['ID'],
                FIRSTNAME: $scope.contacts[$name]['FIRSTNAME'],
                LASTNAME: $scope.contacts[$name]['LASTNAME'],
                TITLE: $scope.contacts[$name]['TITLE'],
                EMAIL: $scope.contacts[$name]['EMAIL'],
                PROFILECITY: $scope.contacts[$name]['PROFILECITY'],
                PROFILECOUNTRY: $scope.contacts[$name]['PROFILECOUNTRY'],
                PROFILESTATE: $scope.contacts[$name]['PROFILESTATE'],
                JOBTITLE: $scope.contacts[$name]['JOBTITLE'],
                DEPARTMENT: $scope.contacts[$name]['DEPARTMENT']
            };
            if($scope.contactInfo['DEPARTMENT']==='')
                $scope.contactInfo['DEPARTMENT']='Undefined';
            if($scope.contactInfo['JOBTITLE']==='')
                $scope.contactInfo['JOBTITLE']='Undefined';
            if($scope.contactInfo['PROFILECOUNTRY']==='')
                $scope.contactInfo['PROFILECOUNTRY']='Undefined';
            $scope.company = {
                ADDRESS: $scope.contacts[$name]['ADDRESS'],
                CITY: $scope.contacts[$name]['CITY'],
                COUNTRY: $scope.contacts[$name]['COUNTRY'],
                INDUSTRIES: $scope.contacts[$name]['INDUSTRIES'],
                NAME: $scope.contacts[$name]['COMPANY'],
                OWNERSHIP: $scope.contacts[$name]['OWNERSHIP'],
                PHONE: $scope.contacts[$name]['PHONE'],
                REVENUE: $scope.contacts[$name]['REVENUE'],
                SIZE: $scope.contacts[$name]['SIZE'],
                STATE: $scope.contacts[$name]['STATE'],
                URL: $scope.contacts[$name]['URL'],
                ZIP: $scope.contacts[$name]['ZIP']
            };
            $scope.mainContain = rootUrl+"mysite/app/views/contact-info.tpl.html";
        }
        
        $scope.companyClick = function($name){
            //window.location.href = rootUrl+"mysite/app/company/"+$name+".html";
            window.location.href = rootUrl+"mysite/testguid/company/"+$name+".html";
        }

        $scope.showCompany = function ($name) {
            $scope.company = {
                ADDRESS: $scope.contacts[$name]['ADDRESS'],
                CITY: $scope.contacts[$name]['CITY'],
                COUNTRY: $scope.contacts[$name]['COUNTRY'],
                INDUSTRIES: $scope.contacts[$name]['INDUSTRIES'],
                NAME: $scope.contacts[$name]['COMPANY'],
                OWNERSHIP: $scope.contacts[$name]['OWNERSHIP'],
                PHONE: $scope.contacts[$name]['PHONE'],
                REVENUE: $scope.contacts[$name]['REVENUE'],
                SIZE: $scope.contacts[$name]['SIZE'],
                STATE: $scope.contacts[$name]['STATE'],
                URL: $scope.contacts[$name]['URL'],
                ZIP: $scope.contacts[$name]['ZIP']
            };
            $scope.mainContain = rootUrl+"mysite/app/views/company-page.tpl.html";
        }
        
        $scope.getJobLevel = function(){
            $scope.jobTitleLevel.splice(0, $scope.jobTitleLevel.length);
            $scope.job_role_levels.forEach(function(subItem){
                if(subItem.value){
                    $scope.jobTitleLevel.push(subItem.level);
                }
            });
            if($scope.job_role_levels.length === $scope.jobTitleLevel.length || $scope.all_levels.value)
                $scope.jobTitleLevel.splice(0, $scope.jobTitleLevel.length);
            //console.log($scope.jobTitleLevel);
            
        }
        
        $scope.getDepartment = function(){
            $scope.departments.splice(0, $scope.departments.length);
            $scope.job_role_departments.forEach(function(subItem){
                if(subItem.value){
                    $scope.departments.push(subItem.depart);
                }
            });
            if($scope.job_role_departments.length === $scope.departments.length || $scope.all_departs.value)
                $scope.departments.splice(0, $scope.departments.length);
            //console.log($scope.departments);
        }
        
        $scope.getLocation = function(){
            $scope.postionLocation.splice(0, $scope.postionLocation.length);
            $scope.countries.forEach(function(country){
                if(country.parent.value){
                    $scope.postionLocation.push(country.parent.category);                    
                }else 
                {
                    var stateArray = [];
                    country.subItem.forEach(function(location){
                        if(location.value){
                            stateArray.push(location.key);                           
                        }
                    });
                    if(stateArray.length > 0){
                        stateArray.push(country.parent.category);
                        $scope.postionLocation.push(stateArray.reverse());
                    }
                }                
            });
            if($scope.countries.length === $scope.postionLocation.length || $scope.all_countries.value)
                $scope.postionLocation.splice(0, $scope.postionLocation.length);
            //console.log($scope.postionLocation);
        }
        
        $scope.dropDownModel = $scope.dropDownValue[1];
        $scope.isSearchPress = false;
                
        $scope.resetAllSelect = function(){
            $scope.job_role_levels.forEach(function(item){
               item.value = false; 
            });
            $scope.job_role_departments.forEach(function(item){
               item.value = false; 
            });
            $scope.countries.forEach(function(country){
                country.parent.value = false;
                country.subItem.forEach(function(state){
                    state.value = false;
                });
            });
            $scope.industries.forEach(function(country){
                country.parent.value = false;
                country.subItem.forEach(function(state){
                    state.value = false;
                });
            });
            $scope.checkboxModel.all_value = false;
            $scope.checkboxModel.level1 = false;
            $scope.checkboxModel.level2 = false;
            $scope.checkboxModel.level3 = false;
            $scope.checkboxModel.level4 = false;
            $scope.checkboxModel.level5 = false;
            $scope.checkboxSize.all_size = false;
            $scope.checkboxSize.size1 = false;
            $scope.checkboxSize.size2 = false;
            $scope.checkboxSize.size3 = false;
            $scope.checkboxSize.size4 = false;
            $scope.checkboxSize.size5 = false;
            $scope.jobTitleFliter = '';
            $scope.companyFliter = '';
            $scope.location_code = '';
            //$scope.$apply();
        }
        $scope.enterPress = function(event){
            if(event.which === 13){
                $scope.searchPress(0,true);
            }
        }
        
        $scope.dropDownChange = function(){
            //console.log('change');
            if($scope.isSearchPress)
                $scope.searchPress(0,true);
        }
        
        
        $scope.searchOnTablePress = function(){
            $scope.isSearchAdvance = false;
            $scope.searchPress(0,true,$('#searchTextInput').val());
        }
        
        $scope.searchResultEnter = function(event) {
            if(event.which === 13){
                $scope.isSearchAdvance = false;
                $scope.searchPress(0,true,$('#searchTextInput').val());
            }
        }
        
        $scope.isSearchAdvance = false;
        
        $scope.advanceSearchPress = function(pages, isReset){
            $scope.isSearchAdvance = true;
           $scope.searchPress(pages,isReset);
        }

        $scope.searchPress = function (pages, isReset, searchName) {
            
            var resultOnPage = $('#selectNumberDropDown :selected').text();
            if($scope.searchAtBegin){
                resultOnPage = $scope.contactShowOnPage;
            }
            if(searchName === '')
                searchName = undefined;
            if(pages<0)
                pages = 0;
            if($scope.location_code === '')
                $scope.location_code = undefined;
            if($scope.jobTitleFliter === '')
                $scope.jobTitleFliter = undefined;
            if($scope.companyFliter === '')
                $scope.companyFliter = undefined;
            
            $scope.checkkAll.value = false;
            $scope.showInBarSearch = true;
            $scope.isSearchPress = true;
            if(isReset || $scope.searchAtBegin){
                if(!$scope.searchAtBegin){
                    $scope.getJobLevel();
                    $scope.getLocation();
                    $scope.getDepartment();
                
                    if (!($scope.checkboxSize.all_size)) {
                        $scope.addSize($scope.checkboxSize.size1, '0 - 25');
                        $scope.addSize($scope.checkboxSize.size2, '25 - 100');
                        $scope.addSize($scope.checkboxSize.size3, '100 - 250');
                        $scope.addSize($scope.checkboxSize.size4, '250 - 1000');
                        $scope.addSize($scope.checkboxSize.size5, '1k - 10k');
                    }
                    if (!($scope.checkboxModel.all_value)) {
                        $scope.addRevenue($scope.checkboxModel.level1, '$0 - 1M');
                        $scope.addRevenue($scope.checkboxModel.level2, '$1 - 10M');
                        $scope.addRevenue($scope.checkboxModel.level3, '$10 - 50M');
                        $scope.addRevenue($scope.checkboxModel.level4, '$50 - 100M');
                        $scope.addRevenue($scope.checkboxModel.level5, '$100 - 250M');
                    }
                }
                $.ajax({
                    type: "POST",
                    data: {
                        sizeParameter: $scope.sizeParameter,
                        industriesParameter: $scope.industriesParameter,
                        revenueParameter: $scope.revenueParameter,
                        location_code: $scope.location_code,
                        getmax: 0,
                        locationParameter: $scope.postionLocation,
                        levelParameter: $scope.jobTitleLevel,
                        departmentParameter: $scope.departments,
                        resultOnPage: resultOnPage,
                        searchName: searchName,
                        jobTitle: $scope.jobTitleFliter,
                        companyName: $scope.companyFliter
                    },
                    url: rootUrl+"mysite/api/search.php",
                    success: function (response) {
                        //console.log(response);
                        $scope.textResults = response['total'].toLocaleString()+" contacts found for your advanced search!";
                        $scope.maxPage = parseInt(response['pages'])+1;
                        for(var i = 0;i < 7;i++){
                            if(i>$scope.maxPage - 1)
                                $scope.showNext[i] = false;
                            else $scope.showNext[i] = true;
                        }
                        if($scope.searchAtBegin){
                            $scope.updatePagging();
                            $scope.searchAtBegin = false;
                        }
                        $scope.$apply();
                    }
                });
            }
            $.ajax({
                type: "POST",
                data: {
                    sizeParameter: $scope.sizeParameter,
                    industriesParameter: $scope.industriesParameter,
                    revenueParameter: $scope.revenueParameter,
                    location_code: $scope.location_code,
                    token: $scope.token,
                    locationParameter: $scope.postionLocation,
                    levelParameter: $scope.jobTitleLevel,
                    departmentParameter: $scope.departments,
                    page: pages,
                    resultOnPage: resultOnPage,
                    searchName: searchName,
                    jobTitle: $scope.jobTitleFliter,
                    companyName: $scope.companyFliter
                },
                url: rootUrl+"mysite/api/search.php",
                success: function (response) {
                    //console.log(pages);
                    //console.log(response);
                    if(response !== '-1' ){
                        $scope.contacts = response;
                        var arrayLength = response.length;
                        //console.log('pages:'+pages);
                        if($scope.selectHistoryArray[pages])
                        {
                            $scope.selectStatus = $scope.selectHistoryArray[pages];
                        }
                        else {
                            for (var i = 0; i < arrayLength; i++) {
                                //$scope.selectStatus[i] = (response[i].EMAIL.indexOf('xxxxxxx') < 0);
                                $scope.selectStatus[i] = false;
                            }
                        }
                        $scope.mainContain = rootUrl+"mysite/app/views/list-contact.tpl.html";
                        //$('#tableExample').DataTable();
                        if(isReset){
                            $scope.previousPaging = 'disabled';
                            $scope.nextPaging = '';
                            $scope.acctive = ['active','','','','','disabled',''];
                            $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
                            $scope.checkkAll.value = false;
                            //$scope.saveState(pages);
                            //$scope.loadState();
                            //console.log($scope.postionLocation);
                            //console.log(JSON.parse(JSON.stringify($scope.postionLocation)));
                        }
                        //if(!$scope.searchAtBegin)
                        {
                            $scope.saveState(pages,searchName);
                        }
                        if($scope.searchAtBegin){
                            $scope.resetState();
                        }
                    }
                    else {
                        $scope.contacts = [];
                        console.log(response);
                        alert('SignUp to search more!!');
                    }
                    $scope.$apply();
                }
            });
        };
        
        $scope.saveState = function(pages,searchName){
            $.cookie('sizeParameter', JSON.stringify($scope.sizeParameter), {expires: 7, path: '/'});
            $.cookie('industriesParameter', JSON.stringify($scope.industriesParameter), {expires: 7, path: '/'});
            $.cookie('revenueParameter', JSON.stringify($scope.revenueParameter), {expires: 7, path: '/'});
            $.cookie('location_code', JSON.stringify($scope.location_code), {expires: 7, path: '/'});            
            $.cookie('locationParameter', JSON.stringify($scope.postionLocation), {expires: 7, path: '/'});
            $.cookie('levelParameter', JSON.stringify($scope.jobTitleLevel), {expires: 7, path: '/'});
            $.cookie('departmentParameter', JSON.stringify($scope.departments), {expires: 7, path: '/'});
            $.cookie('page', JSON.stringify(pages), {expires: 7, path: '/'});
            $.cookie('resultOnPage', JSON.stringify($('#selectNumberDropDown :selected').text()), {expires: 7, path: '/'});            
            $.cookie('searchName', JSON.stringify(searchName), {expires: 7, path: '/'});
            $.cookie('jobTitle', JSON.stringify($scope.jobTitleFliter), {expires: 7, path: '/'});
            $.cookie('companyName', JSON.stringify($scope.companyFliter), {expires: 7, path: '/'});
            $.cookie('canback', JSON.stringify(1), {expires: 7, path: '/'});
        }
        
        $scope.resetState = function(){
            $scope.sizeParameter = [];
            $scope.industriesParameter = [];
            $scope.revenueParameter = [];
            $scope.location_code = '';
            $scope.postionLocation = [];
            $scope.jobTitleLevel = [];
            $scope.departments = [];
            $scope.currentPages = 0;
            $scope.resultSearchFliter = '';
            $scope.jobTitleFliter = '';
            $scope.companyFliter = '';
        }
        $scope.contactShowOnPage = 25;
        $scope.currentPages = 0;
        $scope.loadState = function(){
            var canback = $.cookie('canback');
            //if(canback === '1')
            {

                $scope.sizeParameter = $.cookie('sizeParameter');
                if($scope.sizeParameter){
                    $scope.sizeParameter = JSON.parse($scope.sizeParameter);
                }else $scope.sizeParameter = [];

                $scope.industriesParameter = $.cookie('industriesParameter');            
                if($scope.industriesParameter)
                    $scope.industriesParameter = JSON.parse($scope.industriesParameter);
                else $scope.industriesParameter = [];

                $scope.revenueParameter = $.cookie('revenueParameter');
                if($scope.revenueParameter)
                    $scope.revenueParameter = JSON.parse($scope.revenueParameter);
                else $scope.revenueParameter = [];

                $scope.location_code = $.cookie('location_code');
                if($scope.location_code){
                    if($scope.location_code !== 'undefined'){
                        $scope.location_code = JSON.parse($scope.location_code);
                    }else $scope.location_code = '';
                }else $scope.location_code = '';

                $scope.postionLocation = $.cookie('locationParameter');
                if($scope.postionLocation)
                    $scope.postionLocation = JSON.parse($scope.postionLocation);
                else $scope.postionLocation = [];

                $scope.jobTitleLevel = $.cookie('levelParameter');
                if($scope.jobTitleLevel)
                    $scope.jobTitleLevel = JSON.parse($scope.jobTitleLevel);
                else $scope.jobTitleLevel = [];

                $scope.departments = $.cookie('departmentParameter');
                if($scope.departments)
                    $scope.departments = JSON.parse($scope.departments);
                else $scope.departments = [];

                $scope.currentPages = $.cookie('page');
                if($scope.currentPages)
                    if($scope.currentPages !== 'undefined')
                        $scope.currentPages = JSON.parse($scope.currentPages);
                    else $scope.currentPages = 0;
                else $scope.currentPages = 0;

                $scope.contactShowOnPage = $.cookie('resultOnPage');
                var indexOfPage = 0;
                if($scope.contactShowOnPage)
                    if($scope.contactShowOnPage !== 'undefined')
                        $scope.contactShowOnPage = JSON.parse($scope.contactShowOnPage);
                if($scope.contactShowOnPage === '10'){
                    indexOfPage = 0;
                }else if($scope.contactShowOnPage === '25'){
                    indexOfPage = 1;
                }else if($scope.contactShowOnPage === '50'){
                    indexOfPage = 2;
                }else if($scope.contactShowOnPage === '75'){
                    indexOfPage = 3;
                }else if($scope.contactShowOnPage === '100'){
                    indexOfPage = 4;
                }else {
                    $scope.contactShowOnPage = 25;
                    indexOfPage = 1;
                }
                $scope.dropDownModel = $scope.dropDownValue[indexOfPage];

                $scope.resultSearchFliter = $.cookie('searchName');                        
                if($scope.resultSearchFliter){
                    if($scope.resultSearchFliter !== 'undefined'){
                        $scope.resultSearchFliter = JSON.parse($scope.resultSearchFliter);
                    }else $scope.resultSearchFliter = '';
                }else $scope.resultSearchFliter = '';

                $scope.jobTitleFliter = $.cookie('jobTitle');
                if($scope.jobTitleFliter){
                    if($scope.jobTitleFliter !== 'undefined'){
                        $scope.jobTitleFliter = JSON.parse($scope.jobTitleFliter);
                    }else $scope.jobTitleFliter = '';
                }else $scope.jobTitleFliter = '';

                $scope.companyFliter = $.cookie('companyName');
                if($scope.companyFliter){
                    if($scope.companyFliter !== 'undefined'){
                        $scope.companyFliter = JSON.parse($scope.companyFliter);
                    }else $scope.companyFliter = '';
                }else $scope.companyFliter = '';

                $scope.currentIndex = $scope.currentPages;
                
                /*console.log($scope.sizeParameter);
                console.log($scope.industriesParameter);
                console.log($scope.revenueParameter);
                console.log($scope.location_code);
                console.log($scope.postionLocation);
                console.log($scope.jobTitleLevel);
                console.log($scope.departments);
                console.log($scope.currentPages);
                console.log($scope.dropDownModel);
                console.log($scope.resultSearchFliter);
                console.log($scope.jobTitleFliter);
                console.log($scope.companyFliter);*/
                
                $scope.searchAtBegin = true;
                $scope.pagingClick($scope.currentIndex+1);
                /*if($scope.resultSearchFliter !== ''){
                    $scope.searchPress($scope.currentPages,true,$scope.resultSearchFliter);
                }else {
                    $scope.searchPress($scope.currentPages,true);
                }*/
                
                $.cookie('canback', JSON.stringify(0), {expires: 7, path: '/'});
            }
        }
        
        $scope.getContactSelected = function(){
            var arrayLength = $scope.contacts.length;
            for (var i = 0; i < arrayLength; i++) {
                if($scope.selectStatus[i] && ($scope.contacts[i]['EMAIL'].indexOf('xxxxxxx') >= 0)){
                    $scope.addedInfomation.push($scope.contacts[i]['ID']);
                }
            }
        }

        $scope.showEmailAndPhone = function (folder) {
            $scope.getContactSelected();
            $scope.addedInfomation = $.unique($scope.addedInfomation);
            //console.log($scope.addedInfomation);
            var isRefresh = false;
            if(folder === null){
                folder = $('#newFolderName').val();
                isRefresh = true;
            }
            if($scope.addedInfomation.length === 0){
                alert("You have to select contact first!!");
            }
            else if (confirm("You will pay for this!") == true) {
                $.ajax({
                    type: "POST",
                    data: {
                        arrayCredit: $scope.addedInfomation, 
                        token: $scope.token,
                        folder: folder
                    },
                    url: rootUrl+"mysite/api/addinfomation.php",
                    success: function (msg) {
                        //$('.answer').html(msg);
                        if (msg === '0')
                            alert("You dont have engouth credit, get out from my site!!");
                        else {
                            alert("You was used " + msg + " credit!");
                            $scope.credit -= parseInt(msg);
                            $scope.userName = $scope.userNamer;// + " (" + $scope.credit + "$)";
                            $scope.searchPress($scope.currentIndex-1,false);
                        }
                        $scope.addedInfomation.splice(0, $scope.addedInfomation.length);
                        $('#mask').click();
                        if(isRefresh){
                            $scope.firstLoadFolder = true;
                            $scope.getFolderInfomation();
                        }
                    }
                });
            }
        }
        
        $scope.goBackToExports = function(){
            $scope.myFolderPage = rootUrl+"mysite/app/views/myfolder.html";            
        }
        
        $scope.myFolderPage = rootUrl+"mysite/app/views/myfolder.html";
        
        $scope.getCVSFile = function(folder, count, pages, isExport){
            {
                $scope.currentFolder = folder;
                $scope.currentCount = count;
                $scope.showInBarSearch = false;
                $.ajax({
                    type: "POST",
                    data: {
                        token: $scope.token,
                        folder: folder,
                        page: pages
                    },
                    url: rootUrl+"mysite/api/getcvsfile.php",
                    success: function (msg) {
                        //$('.answer').html(msg);
                        //console.log(msg);
                        if (msg !== '-1'){
                            if(isExport){
                                var length = msg.length;
                                for(var i = 0;i<length;i++){
                                    delete msg[i]['PROFILECITY'];
                                    delete msg[i]['PROFILESTATE'];
                                    delete msg[i]['PROFILECOUNTRY'];
                                    delete msg[i]['NAME'];
                                }
                                JSONToCSVConvertor(angular.copy(msg), folder, true);
                            }
                            else {
                                $scope.textResults = count+" contacts in "+folder+" folder!";
                                if(pages === 0){
                                    $scope.currentIndex = 1;
                                    $scope.maxPage = Math.floor(parseInt(count)/25+1);
                                    for(var i = 0;i < 7;i++){
                                        if(i>$scope.maxPage - 1)
                                            $scope.showNext[i] = false;
                                        else $scope.showNext[i] = true;
                                    }                                    
                                }
                                
                                $scope.contacts = msg;
                                var arrayLength = msg.length;
                                for (var i = 0; i < arrayLength; i++) {
                                    $scope.selectStatus[i] = true;
                                }
                                $scope.myFolderPage = rootUrl+"mysite/app/views/listexportcontact.html";
                                //$('#tableExample').DataTable();             
                                if(pages===0){
                                    $scope.previousPaging = 'disabled';
                                    $scope.nextPaging = '';
                                    $scope.acctive = ['active','','','','','disabled',''];
                                    $scope.textpage = ['1','2','3','4','5','...',$scope.maxPage];
                                }
                                
                                $scope.$apply();
                            }
                        }
                    }
                });
            }
        }

        $scope.isSelected = function ($index, id) {
            if ( $scope.contacts[$index].EMAIL.indexOf('xxxxxxx')>=0 && $scope.selectStatus[$index]) {
                $scope.addedInfomation.push(id);
            } else {
                $scope.addedInfomation.splice($scope.addedInfomation.indexOf(id), 1);
            }
        };

        $scope.checkParentInsteal = function (parentindex) {
            $scope.industries[parentindex].subItem.forEach(function (entry) {
                var index = $scope.industriesParameter.indexOf(entry.category);
                if (index >= 0) {
                    $scope.industriesParameter.splice(index, 1);
                }
            });
            var index = $scope.industriesParameter.indexOf($scope.industries[parentindex].parent.category);
            if (index < 0) {
                $scope.industriesParameter.push($scope.industries[parentindex].parent.category);
            }
        };

        $scope.checkRevenue = function () {
            var count_checked = $('[name="check_element"]:checked').length;
            if (count_checked === 5) {
                $scope.checkboxModel = {
                    all_value: true,
                    level1: true,
                    level2: true,
                    level3: true,
                    level4: true,
                    level5: true
                };
            } else {
                $scope.checkboxModel.all_value = false;
            }
        };

        $scope.addRevenue = function (valueRevenue, level) {
            if (valueRevenue) {
                var index = $scope.revenueParameter.indexOf(level);
                if (index < 0) {
                    $scope.revenueParameter.push(level);
                }
            } else {
                var index = $scope.revenueParameter.indexOf(level);
                if (index >= 0) {
                    $scope.revenueParameter.splice(index, 1);
                }
            }
        }

        $scope.addSize = function (valueSize, size) {
            if (valueSize) {
                var index = $scope.sizeParameter.indexOf(size);
                if (index < 0) {
                    $scope.sizeParameter.push(size);
                }
            } else {
                var index = $scope.sizeParameter.indexOf(size);
                if (index >= 0) {
                    $scope.sizeParameter.splice(index, 1);
                }
            }
        }

        $scope.checkSize = function () {
            var count_checked = $('[name="check_size"]:checked').length;
            if (count_checked === 5) {
                $scope.checkboxSize = {
                    all_size: true,
                    size1: true,
                    size2: true,
                    size3: true,
                    size4: true,
                    size5: true
                };
            } else {
                $scope.checkboxSize.all_size = false;
            }
        };



        $scope.checkSub = function (valueParent, valueSub) {
            if ($scope.industries[valueParent].subItem[valueSub].value === false) {
                var index = $scope.industriesParameter.indexOf($scope.industries[valueParent].subItem[valueSub].category);
                if (index < 0) {
                    $scope.industriesParameter.push($scope.industries[valueParent].subItem[valueSub].category);
                }
            } else {
                var index = $scope.industriesParameter.indexOf($scope.industries[valueParent].subItem[valueSub].category);
                if (index >= 0) {
                    $scope.industriesParameter.splice(index, 1);
                }
            }
            var name = $scope.industries[valueParent].parent._id;
            var count_checked = $('[name=' + name + ']:checked').length;
            var count_checked_parent = $('[name="check_industry_parent"]:checked').length;
            $scope.industries[valueParent].parent.value = false;
            if (count_checked == $scope.industries[valueParent].subItem.length) {
                $scope.industries[valueParent].parent.value = true;
                count_checked_parent++;
                $scope.checkParentInsteal(valueParent);
            } else {
                $scope.industries[valueParent].parent.value = false;
                count_checked_parent--;
                var index = $scope.industriesParameter.indexOf($scope.industries[valueParent].parent.category);
                if (index >= 0) {
                    $scope.industriesParameter.splice(index, 1);
                }
                $scope.industries[valueParent].subItem.forEach(function (entry) {
                    if (entry.value && $scope.industries[valueParent].subItem[valueSub].category !== entry.category) {
                        var index = $scope.industriesParameter.indexOf(entry.category);
                        if (index < 0) {
                            $scope.industriesParameter.push(entry.category);
                        }
                    }
                });
            }
            if (count_checked_parent == $scope.industries.length) {
                $scope.all_industries.value = true;
            } else {
                $scope.all_industries.value = false;
            }
        };

        $scope.checkParent = function (value) {

            $scope.all_industries.value = false;
            var count_checked_parent = $('[name="check_industry_parent"]:checked').length;
            if (count_checked_parent == $scope.industries.length) {
                $scope.all_industries.value = true;
            } else {
                $scope.all_industries.value = false;
            }

            if ($scope.industries[value].parent.value === false) {
                $scope.industries[value].parent.collapsed = true;
            } else {
                $scope.industries[value].parent.collapsed = false;
            }

            if ($scope.industries[value].parent.value === false) {
                $scope.industries[value].parent.collapsed = true;
                var index = $scope.industriesParameter.indexOf($scope.industries[value].parent.category);
                if (index < 0) {
                    $scope.industriesParameter.push($scope.industries[value].parent.category);
                }
            } else {
                $scope.industries[value].parent.collapsed = false;
                var index = $scope.industriesParameter.indexOf($scope.industries[value].parent.category);
                if (index >= 0) {
                    $scope.industriesParameter.splice(index, 1);
                }
            }
        };

        $scope.all_industries = {
            category: 'All Industries',
            value: true
        };

        $scope.industries = [
            {
                parent: {
                    _id: 'item1',
                    category: 'Agriculture',
                    value: false,
                    collapsed: false
                },
                subItem: [{
                        category: 'Agriculture & Mining Other',
                        value: false
                    },
                    {
                        category: 'Farming and Ranching',
                        value: false
                    },
                    {
                        category: 'Fishing, Hunting and Trapping',
                        value: false
                    },
                    {
                        category: 'Forestry and Logging',
                        value: false
                    },
                    {
                        category: 'Mining and Quarrying',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item2',
                    category: 'Business Services',
                    value: false
                },
                subItem: [{
                        category: 'Accounting and Tax Preparation',
                        value: false
                    },
                    {
                        category: 'Advertising, Marketing and PR',
                        value: false
                    },
                    {
                        category: 'Business Services Other',
                        value: false
                    },
                    {
                        category: 'Data and Records Management',
                        value: false
                    },
                    {
                        category: 'Facilities Management and Maintenance',
                        value: false
                    },
                    {
                        category: 'HR and Recruiting Services',
                        value: false
                    },
                    {
                        category: 'Legal Services',
                        value: false
                    },
                    {
                        category: 'Management Consulting',
                        value: false
                    },
                    {
                        category: 'Payroll Services',
                        value: false
                    },
                    {
                        category: 'Sales Services',
                        value: false
                    },
                    {
                        category: 'Security Services',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item3',
                    category: 'Computers & Electronics',
                    value: false
                },
                subItem: [{
                        category: 'Audio, Video and Photography',
                        value: false
                    },
                    {
                        category: 'Computers & Electronics Other',
                        value: false
                    },
                    {
                        category: 'Computers, Parts and Repair',
                        value: false
                    },
                    {
                        category: 'Consumer Electronics, Parts and Repair',
                        value: false
                    },
                    {
                        category: 'IT and Network Services and Support',
                        value: false
                    },
                    {
                        category: 'Instruments and Controls',
                        value: false
                    },
                    {
                        category: 'Network Security Products',
                        value: false
                    },
                    {
                        category: 'Computers & Electronics Other',
                        value: false
                    },
                    {
                        category: 'Networking Equipment and Systems',
                        value: false
                    },
                    {
                        category: 'Office Machinery and Equipment',
                        value: false
                    },
                    {
                        category: 'Peripherals Manufacturing',
                        value: false
                    },
                    {
                        category: 'Semiconductor and Microchip Manufacturing',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item4',
                    category: 'Consumer Services',
                    value: false
                },
                subItem: [{
                        category: 'Automotive Repair & Maintenance',
                        value: false
                    },
                    {
                        category: 'Consumer Services Other',
                        value: false
                    },
                    {
                        category: 'Funeral Homes and Funeral Services',
                        value: false
                    },
                    {
                        category: 'Laundry and Dry Cleaning',
                        value: false
                    },
                    {
                        category: 'Parking Lots and Garage Management',
                        value: false
                    },
                    {
                        category: 'Personal Care',
                        value: false
                    },
                    {
                        category: 'Photofinishing Services',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item5',
                    category: 'Education',
                    value: false
                },
                subItem: [{
                        category: 'Colleges and Universities',
                        value: false
                    },
                    {
                        category: 'Education Other',
                        value: false
                    },
                    {
                        category: 'Elementary and Secondary Schools',
                        value: false
                    },
                    {
                        category: 'Libraries, Archives and Museums',
                        value: false
                    },
                    {
                        category: 'Sports, Arts and Recreation Instruction',
                        value: false
                    },
                    {
                        category: 'Technical and Trade Schools',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item6',
                    category: 'Energy & Utilities',
                    value: false
                },
                subItem: [{
                        category: 'Alternative Energy Sources',
                        value: false
                    },
                    {
                        category: 'Energy & Utilities Other',
                        value: false
                    },
                    {
                        category: 'Gas and Electric Utilities',
                        value: false
                    },
                    {
                        category: 'Gasoline and Oil Refineries',
                        value: false
                    },
                    {
                        category: 'Sewage Treatment Facilities',
                        value: false
                    },
                    {
                        category: 'Waste Management and Recycling',
                        value: false
                    },
                    {
                        category: 'Water Treatment and Utilities',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'Financial Services',
                    category: 'HealthCare',
                    value: false
                },
                subItem: [{
                        category: 'Banks',
                        value: false
                    },
                    {
                        category: 'Credit Cards and Related Services',
                        value: false
                    },
                    {
                        category: 'Credit Unions',
                        value: false
                    },
                    {
                        category: 'Financial Services Other',
                        value: false
                    },
                    {
                        category: 'Insurance and Risk Management',
                        value: false
                    },
                    {
                        category: 'Investment Banking and Venture Capital',
                        value: false
                    },
                    {
                        category: 'Lending and Mortgage',
                        value: false
                    },
                    {
                        category: 'Personal Financial Planning and Private Banking',
                        value: false
                    },
                    {
                        category: 'Securities Agents and Brokers',
                        value: false
                    },
                    {
                        category: 'Trust, Fiduciary, and Custody Activities',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item8',
                    category: 'Government',
                    value: false
                },
                subItem: [{
                        category: 'Government Other',
                        value: false
                    },
                    {
                        category: 'International Bodies and Organizations',
                        value: false
                    },
                    {
                        category: 'Local Government',
                        value: false
                    },
                    {
                        category: 'National Government',
                        value: false
                    },
                    {
                        category: 'State/Provincial Government',
                        value: false
                    }]
            }, {
                parent: {
                    _id: 'item9',
                    category: 'Healthcare, Pharmaceuticals & Biotech',
                    value: false
                },
                subItem: [{
                        category: 'Biotechnology',
                        value: false
                    },
                    {
                        category: 'Diagnostic Laboratories',
                        value: false
                    },
                    {
                        category: 'Doctors and Health Care Practitioners',
                        value: false
                    },
                    {
                        category: 'Healthcare, Pharmaceuticals, and Biotech Other',
                        value: false
                    },
                    {
                        category: 'Hospitals',
                        value: false
                    },
                    {
                        category: 'Medical Devices',
                        value: false
                    },
                    {
                        category: 'Medical Supplies and Equipment',
                        value: false
                    },
                    {
                        category: 'Personal Health Care Products',
                        value: false
                    },
                    {
                        category: 'Pharmaceuticals',
                        value: false
                    },
                    {
                        category: 'Veterinary Clinics and Services',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item10',
                    category: 'Manufacturing',
                    value: false
                },
                subItem: [{
                        category: 'Aerospace and Defense',
                        value: false
                    },
                    {
                        category: 'Alcoholic Beverages',
                        value: false
                    },
                    {
                        category: 'Automobiles, Boats and Motor Vehicles',
                        value: false
                    },
                    {
                        category: 'Chemicals and Petrochemicals',
                        value: false
                    },
                    {
                        category: 'Concrete, Glass, and Building Materials',
                        value: false
                    },
                    {
                        category: 'Farming and Mining Machinery and Equipment',
                        value: false
                    },
                    {
                        category: 'Food & Dairy Product Manufacturing and Packaging',
                        value: false
                    },
                    {
                        category: 'Furniture Manufacturing',
                        value: false
                    },
                    {
                        category: 'Heavy Machinery',
                        value: false
                    },
                    {
                        category: 'Manufacturing Other',
                        value: false
                    },
                    {
                        category: 'Metals Manufacturing',
                        value: false
                    },
                    {
                        category: 'Nonalcoholic Beverages',
                        value: false
                    },
                    {
                        category: 'Paper and Paper Products',
                        value: false
                    },
                    {
                        category: 'Plastics and Rubber Manufacturing',
                        value: false
                    },
                    {
                        category: 'Textiles, Apparel and Accessories',
                        value: false
                    },
                    {
                        category: 'Tools, Hardware and Light Machinery',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item11',
                    category: 'Media & Entertainment',
                    value: false
                },
                subItem: [{
                        category: 'Media & Entertainment Other',
                        value: false
                    },
                    {
                        category: 'Motion Picture Exhibitors',
                        value: false
                    },
                    {
                        category: 'Motion Picture and Recording Producers',
                        value: false
                    },
                    {
                        category: 'Newspapers, Books and Periodicals',
                        value: false
                    },
                    {
                        category: 'Performing Arts',
                        value: false
                    },
                    {
                        category: 'Radio and Television Broadcasting',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item12',
                    category: 'Non-Profit',
                    value: false
                },
                subItem: [{
                        category: 'Advocacy Organizations',
                        value: false
                    },
                    {
                        category: 'Charitable Organizations and Foundations',
                        value: false
                    },
                    {
                        category: 'Non-Profit Other',
                        value: false
                    },
                    {
                        category: 'Professional Associations',
                        value: false
                    },
                    {
                        category: 'Religious Organizations',
                        value: false
                    },
                    {
                        category: 'Social and Membership Organizations',
                        value: false
                    },
                    {
                        category: 'Trade Groups and Labor Unions',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item13',
                    category: 'Real Estate & Construction',
                    value: false
                },
                subItem: [{
                        category: 'Architecture, Engineering and Design',
                        value: false
                    },
                    {
                        category: 'Construction Equipment and Supplies',
                        value: false
                    },
                    {
                        category: 'Construction and Remodeling',
                        value: false
                    },
                    {
                        category: 'Property Leasing and Management',
                        value: false
                    },
                    {
                        category: 'Real Estate & Construction Other',
                        value: false
                    },
                    {
                        category: 'Real Estate Agents and Appraisers',
                        value: false
                    },
                    {
                        category: 'Real Estate Investment and Development',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item14',
                    category: 'Retail',
                    value: false
                },
                subItem: [{
                        category: 'Automobile Dealers',
                        value: false
                    },
                    {
                        category: 'Automobile Parts Stores',
                        value: false
                    },
                    {
                        category: 'Beer, Wine, and Liquor Stores',
                        value: false
                    },
                    {
                        category: 'Clothing and Shoes Stores',
                        value: false
                    },
                    {
                        category: 'Department Stores',
                        value: false
                    },
                    {
                        category: 'Florists',
                        value: false
                    },
                    {
                        category: 'Furniture Stores',
                        value: false
                    },
                    {
                        category: 'Gasoline Stations',
                        value: false
                    },
                    {
                        category: 'Grocery and Specialty Food Stores',
                        value: false
                    },
                    {
                        category: 'Hardware and Building Material Dealers',
                        value: false
                    },
                    {
                        category: 'Jewelry, Luggage, and Leather Goods Stores',
                        value: false
                    },
                    {
                        category: 'Office Supplies Stores',
                        value: false
                    },
                    {
                        category: 'Restaurants and Bars',
                        value: false
                    },
                    {
                        category: 'Retail Other',
                        value: false
                    },
                    {
                        category: 'Sporting Goods, Hobby, Book, and Music Stores',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item15',
                    category: 'Software & Internet',
                    value: false
                },
                subItem: [{
                        category: 'Data Analytics, Management and Storage',
                        value: false
                    },
                    {
                        category: 'E-commerce and Internet Businesses',
                        value: false
                    },
                    {
                        category: 'Games and Gaming',
                        value: false
                    },
                    {
                        category: 'Software',
                        value: false
                    },
                    {
                        category: 'Software & Internet Other',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item16',
                    category: 'Telecommunications',
                    value: false
                },
                subItem: [{
                        category: 'Cable Television Providers',
                        value: false
                    },
                    {
                        category: 'Telecommunications Equipment and Accessories',
                        value: false
                    },
                    {
                        category: 'Telecommunications Other',
                        value: false
                    },
                    {
                        category: 'Telephone Service Providers and Carriers',
                        value: false
                    },
                    {
                        category: 'Video and Teleconferencing',
                        value: false
                    },
                    {
                        category: 'Wireless and Mobile',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item17',
                    category: 'Transportation & Storage',
                    value: false
                },
                subItem: [{
                        category: 'Air Couriers and Cargo Services',
                        value: false
                    },
                    {
                        category: 'Airport, Harbor and Terminal Operations',
                        value: false
                    },
                    {
                        category: 'Freight Hauling (Rail and Truck)',
                        value: false
                    },
                    {
                        category: 'Marine and Inland Shipping',
                        value: false
                    },
                    {
                        category: 'Moving Companies and Services',
                        value: false
                    },
                    {
                        category: 'Postal, Express Delivery, and Couriers',
                        value: false
                    },
                    {
                        category: 'Transportation & Storage Other',
                        value: false
                    },
                    {
                        category: 'Warehousing and Storage',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item18',
                    category: 'Travel, Recreation, and Leisure',
                    value: false
                },
                subItem: [{
                        category: 'Amusement Parks and Attractions',
                        value: false
                    },
                    {
                        category: 'Cruise Ship Operations',
                        value: false
                    },
                    {
                        category: 'Gambling and Gaming Industries',
                        value: false
                    },
                    {
                        category: 'Hotels, Motels and Lodging',
                        value: false
                    },
                    {
                        category: 'Participatory Sports and Recreation',
                        value: false
                    },
                    {
                        category: 'Passenger Airlines',
                        value: false
                    },
                    {
                        category: 'Rental Cars',
                        value: false
                    },
                    {
                        category: 'Resorts and Casinos',
                        value: false
                    },
                    {
                        category: 'Spectator Sports and Teams',
                        value: false
                    },
                    {
                        category: 'Taxi and Limousine Services',
                        value: false
                    },
                    {
                        category: 'Trains, Buses and Transit Systems',
                        value: false
                    },
                    {
                        category: 'Travel Agents & Services',
                        value: false
                    },
                    {
                        category: 'Travel, Recreation, and Leisure Other',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item19',
                    category: 'Wholesale & Distribution',
                    value: false
                },
                subItem: [{
                        category: 'Apparel Wholesalers',
                        value: false
                    },
                    {
                        category: 'Automobile Parts Wholesalers',
                        value: false
                    },
                    {
                        category: 'Beer, Wine, and Liquor Wholesalers',
                        value: false
                    },
                    {
                        category: 'Chemicals and Plastics Wholesalers',
                        value: false
                    },
                    {
                        category: 'Grocery and Food Wholesalers',
                        value: false
                    },
                    {
                        category: 'Lumber and Construction Materials Wholesalers',
                        value: false
                    },
                    {
                        category: 'Metal & Mineral Wholesalers',
                        value: false
                    },
                    {
                        category: 'Office Equipment and Supplies Wholesalers',
                        value: false
                    },
                    {
                        category: 'Petroleum Products Wholesalers',
                        value: false
                    },
                    {
                        category: 'Wholesale & Distribution Other',
                        value: false
                    }]
            }
        ];

        $scope.checkParentCountry = function (value) {
            $scope.all_countries.value = false;
            var count_checked_parent = $('[name="check_country_parent"]:checked').length;
            if (count_checked_parent == $scope.countries.length) {
                $scope.all_countries.value = true;
            } else {
                $scope.all_countries.value = false;
            }

            if ($scope.countries[value].parent.value === false) {
                $scope.countries[value].parent.collapsed = true;
            } else {
                $scope.countries[value].parent.collapsed = false;
            }
        };

        $scope.checkSubCountry = function (valueParent, valueSub) {
            var name = $scope.countries[valueParent].parent._id;
            var count_checked = $('[name=' + name + ']:checked').length;
            var count_checked_parent = $('[name="check_country_parent"]:checked').length;
            $scope.countries[valueParent].parent.value = false;
            if (count_checked == $scope.countries[valueParent].subItem.length) {
                $scope.countries[valueParent].parent.value = true;
                count_checked_parent++;
            } else {
                $scope.countries[valueParent].parent.value = false;
                count_checked_parent--;
            }
            if (count_checked_parent == $scope.countries.length) {
                $scope.all_countries.value = true;
            } else {
                $scope.all_countries.value = false;
            }
        };

        $scope.all_countries = {
            category: 'All Locations',
            value: true
        };

        $scope.countries = [
            {
                parent: {
                    _id: 'item1',
                    category: 'United States',
                    value: false,
                    collapsed: false
                },
                subItem: [{
                        category: 'Alabama',
                        key: 'AL',
                        value: false
                    },
                    {
                        category: 'Alaska',
                        key: 'AK',
                        value: false
                    },
                    {
                        category: 'American Samoa',
                        key: 'AS',
                        value: false
                    },
                    {
                        category: 'Arizona',
                        key: 'AZ',
                        value: false
                    },
                    {
                        category: 'Arkansas',
                        key: 'AR',
                        value: false
                    },
                    {
                        category: 'California',
                        key: 'CA',
                        value: false
                    },
                    {
                        category: 'Colorado',
                        key: 'CO',
                        value: false
                    },
                    {
                        category: 'Connecticut',
                        key: 'CT',
                        value: false
                    },
                    {
                        category: 'Delaware',
                        key: 'DE',
                        value: false
                    },
                    {
                        category: 'District of Columbia',
                        key: 'DC',
                        value: false
                    },
                    {
                        category: 'Federated States of Micronesia',
                        key: 'FM',
                        value: false
                    },
                    {
                        category: 'Florida',
                        key: 'FL',
                        value: false
                    },
                    {
                        category: 'Georgia',
                        key: 'GA',
                        value: false
                    },
                    {
                        category: 'Guam',
                        key: 'GU',
                        value: false
                    },
                    {
                        category: 'Hawaii',
                        key: 'HI',
                        value: false
                    },
                    {
                        category: 'Idaho',
                        key: 'ID',
                        value: false
                    },
                    {
                        category: 'Illinois',
                        key: 'IL',
                        value: false
                    },
                    {
                        category: 'Indiana',
                        key: 'IN',
                        value: false
                    },
                    {
                        category: 'Iowa',
                        key: 'IA',
                        value: false
                    },
                    {
                        category: 'Kansas',
                        key: 'KS',
                        value: false
                    },
                    {
                        category: 'Kentucky',
                        key: 'KY',
                        value: false
                    },
                    {
                        category: 'Louisiana',
                        key: 'LA',
                        value: false
                    },
                    {
                        category: 'Maine',
                        key: 'ME',
                        value: false
                    },
                    {
                        category: 'Marshall Islands',
                        key: 'MH',
                        value: false
                    },
                    {
                        category: 'Maryland',
                        key: 'MD',
                        value: false
                    },
                    {
                        category: 'Massachusetts',
                        key: 'MA',
                        value: false
                    },
                    {
                        category: 'Michigan',
                        key: 'MI',
                        value: false
                    },
                    {
                        category: 'Micronesia',
                        key: 'FM',
                        value: false
                    },
                    {
                        category: 'Minnesota',
                        key: 'MN',
                        value: false
                    },
                    {
                        category: 'Mississippi',
                        key: 'MS',
                        value: false
                    },
                    {
                        category: 'Missouri',
                        key: 'MO',
                        value: false
                    },
                    {
                        category: 'Montana',
                        key: 'MT',
                        value: false
                    },
                    {
                        category: 'Nebraska',
                        key: 'NE',
                        value: false
                    },
                    {
                        category: 'Nevada',
                        key: 'NV',
                        value: false
                    },
                    {
                        category: 'New Hampshire',
                        key: 'NH',
                        value: false
                    },
                    {
                        category: 'New Jersey',
                        key: 'NJ',
                        value: false
                    },
                    {
                        category: 'New Mexico',
                        key: 'NM',
                        value: false
                    },
                    {
                        category: 'New York',
                        key: 'NY',
                        value: false
                    },
                    {
                        category: 'North Carolina',
                        key: 'NC',
                        value: false
                    },
                    {
                        category: 'North Dakota',
                        key: 'ND',
                        value: false
                    },
                    {
                        category: 'Northern Mariana Islands',
                        key: 'MP',
                        value: false
                    },
                    {
                        category: 'Ohio',
                        key: 'OH',
                        value: false
                    },
                    {
                        category: 'Oklahoma',
                        key: 'OK',
                        value: false
                    },
                    {
                        category: 'Oregon',
                        key: 'OR',
                        value: false
                    },
                    {
                        category: 'Palau',
                        key: 'PW',
                        value: false
                    },
                    {
                        category: 'Pennsylvania',
                        key: 'PA',
                        value: false
                    },
                    {
                        category: 'Puerto Rico',
                        key: 'PR',
                        value: false
                    },
                    {
                        category: 'Rhode Island',
                        key: 'RI',
                        value: false
                    },
                    {
                        category: 'South Carolina',
                        key: 'SC',
                        value: false
                    },
                    {
                        category: 'South Dakota',
                        key: 'SD',
                        value: false
                    },
                    {
                        category: 'Tennessee',
                        key: 'TN',
                        value: false
                    },
                    {
                        category: 'Texas',
                        key: 'TX',
                        value: false
                    },
                    {
                        category: 'Utah',
                        key: 'UT',
                        value: false
                    },
                    {
                        category: 'Vermont',
                        key: 'VT',
                        value: false
                    },
                    {
                        category: 'Virgin Islands',
                        key: 'VI',
                        value: false
                    },
                    {
                        category: 'Virginia',
                        key: 'VA',
                        value: false
                    },
                    {
                        category: 'Washington',
                        key: 'WA',
                        value: false
                    },
                    {
                        category: 'West Virginia',
                        key: 'WV',
                        value: false
                    },
                    {
                        category: 'Wisconsin',
                        key: 'WI',
                        value: false
                    },
                    {
                        category: 'Wyoming',
                        key: 'WY',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item2',
                    category: 'Australia',
                    value: false
                },
                subItem: [{
                        category: 'Australian Capital Territory',
                        key: 'ATC',
                        value: false
                    },
                    {
                        category: 'New South Wales',
                        key: 'NSW',
                        value: false
                    },
                    {
                        category: 'Northern Territory',
                        key: 'NT',
                        value: false
                    },
                    {
                        category: 'Queensland',
                        key: 'QLD',
                        value: false
                    },
                    {
                        category: 'South Australia',
                        key: 'SA',
                        value: false
                    },
                    {
                        category: 'Tasmania',
                        key: 'TAS',
                        value: false
                    },
                    {
                        category: 'Victoria',
                        key: 'VIC',
                        value: false
                    },
                    {
                        category: 'Western Australia',
                        key: 'WA',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item3',
                    category: 'Canada',
                    value: false
                },
                subItem: [{
                        category: 'Alberta',
                        key: 'AB',
                        value: false
                    },
                    {
                        category: 'British Columbia',
                        key: 'BC',
                        value: false
                    },
                    {
                        category: 'Manitoba',
                        key: 'MB',
                        value: false
                    },
                    {
                        category: 'New Brunswick',
                        key: 'NB',
                        value: false
                    },
                    {
                        category: 'Newfoundland and Labrador',
                        key: 'NL',
                        value: false
                    },
                    {
                        category: 'Northwest Territories',
                        key: 'NT',
                        value: false
                    },
                    {
                        category: 'Nova Scotia',
                        key: 'NS',
                        value: false
                    },
                    {
                        category: 'Nunavut',
                        key: 'NU',
                        value: false
                    },
                    {
                        category: 'Ontario',
                        key: 'ON',
                        value: false
                    },
                    {
                        category: 'Prince Edward Island',
                        key: 'PE',
                        value: false
                    },
                    {
                        category: 'Quebec',
                        key: 'QC',
                        value: false
                    },
                    {
                        category: 'Saskatchewan',
                        key: 'SK',
                        value: false
                    },
                    {
                        category: 'Yukon',
                        key: 'YT',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item3',
                    category: 'India',
                    value: false
                },
                subItem: [{
                        category: 'Andaman and Nicobar Islands',
                        key: 'AN',
                        value: false
                    },
                    {
                        category: 'Andhra Pradesh',
                        key: 'AP',
                        value: false
                    },
                    {
                        category: 'Arunachal Pradesh',
                        key: 'AR',
                        value: false
                    },
                    {
                        category: 'Assam',
                        key: 'AS',
                        value: false
                    },
                    {
                        category: 'Bihar',
                        key: 'BR',
                        value: false
                    },
                    {
                        category: 'Chandigarh',
                        key: 'CH',
                        value: false
                    },
                    {
                        category: 'Chhattisgarh',
                        key: 'CG',
                        value: false
                    },
                    {
                        category: 'Dadra and Nagar Haveli',
                        key: 'DH',
                        value: false
                    },
                    {
                        category: 'Daman and Diu',
                        key: 'DD',
                        value: false
                    },
                    {
                        category: 'Delhi',
                        key: 'DL',
                        value: false
                    },
                    {
                        category: 'Goa',
                        key: 'GA',
                        value: false
                    },
                    {
                        category: 'Gujarat',
                        key: 'GJ',
                        value: false
                    },
                    {
                        category: 'Haryana',
                        key: 'HR',
                        value: false
                    },
                    {
                        category: 'Himachal Pradesh',
                        key: 'HP',
                        value: false
                    },
                    {
                        category: 'Jammu and Kashmir',
                        key: 'JK',
                        value: false
                    },
                    {
                        category: 'Jharkhand',
                        key: 'JH',
                        value: false
                    },
                    {
                        category: 'Karnataka',
                        key: 'KA',
                        value: false
                    },
                    {
                        category: 'Kerala',
                        key: 'KL',
                        value: false
                    },
                    {
                        category: 'Lakshadweep',
                        key: 'LD',
                        value: false
                    },
                    {
                        category: 'Madhya Pradesh',
                        key: 'MP',
                        value: false
                    },
                    {
                        category: 'Maharashtra',
                        key: 'MH',
                        value: false
                    },
                    {
                        category: 'Manipur',
                        key: 'MN',
                        value: false
                    },
                    {
                        category: 'Meghalaya',
                        key: 'ML',
                        value: false
                    },
                    {
                        category: 'Mizoram',
                        key: 'MZ',
                        value: false
                    },
                    {
                        category: 'Nagaland',
                        key: 'NL',
                        value: false
                    },
                    {
                        category: 'Orissa',
                        key: 'OR',
                        value: false
                    },
                    {
                        category: 'Puducherry',
                        key: 'AL',
                        value: false
                    },
                    {
                        category: 'Punjab',
                        key: 'PB',
                        value: false
                    },
                    {
                        category: 'Rajasthan',
                        key: 'RJ',
                        value: false
                    },
                    {
                        category: 'Sikkim',
                        key: 'SK',
                        value: false
                    },
                    {
                        category: 'Tamil Nadu',
                        key: 'TN',
                        value: false
                    },
                    {
                        category: 'Tripura',
                        key: 'TR',
                        value: false
                    },
                    {
                        category: 'Uttar Pradesh',
                        key: 'UP',
                        value: false
                    },
                    {
                        category: 'Uttarakhand',
                        key: 'UK',
                        value: false
                    },
                    {
                        category: 'West Bengal',
                        key: 'WB',
                        value: false
                    }]
            },
            {
                parent: {
                    _id: 'item3',
                    category: 'New Zealand',
                    value: false
                },
                subItem: []
            },
            {
                parent: {
                    _id: 'item3',
                    category: 'United Kingdom',
                    value: false
                },
                subItem: []
            }
        ];


        $scope.metro = [{
                name: 'Manchester',
                value: false
            },
            {
                name: 'United',
                value: false
            }, {
                name: 'Ars',
                value: false
            },
            {
                name: 'Liver',
                value: false
            },
            {
                name: 'Chel',
                value: false
            }];

        $scope.location = {
            name: 'zip'
        };

        $scope.country = {
            name: 'country'
        };

        $scope.all_area = {
            category: 'All Locations',
            value: true
        };

        $scope.area = [{
                category: 'Atlanta',
                value: false
            },
            {
                category: 'Chicago',
                value: false
            },
            {
                category: 'Boston',
                value: false
            },
            {
                category: 'Baltimore/Washington',
                value: false
            }];

        $scope.checkArea = function () {
            var count_checked = $('[name="check_area"]:checked').length;
            if (count_checked == $scope.area.length) {
                $scope.all_area.value = true;
            } else {
                $scope.all_area.value = false;
            }
        };       
        
        $scope.companyCountry = $scope.countries[0];        
        
        $scope.companyStateUpdate = $scope.countries[0].subItem;
        
        $scope.companyState = $scope.countries[0].subItem[0];
        
        $scope.companySize = [
            {
                value: '0 - 25'
            },
            {
                value: '25 - 100'
            },
            {
                value: '100 - 250'
            },
            {
                value: '250 - 1000'
            },
            {
                value: '1k -10k'
            }
            
        ];
        
        $scope.companySizeUpdate = $scope.companySize[0];
        
        $scope.companyRevenue = [
            {
                value: '$0 - 1M'
            },
            {
                value: '$1 - 10M'
            },
            {
                value: '$10 - 50M'
            },
            {
                value: '$50 - 100M'
            },
            {
                value: '$100 -150M'
            }
            
        ];
        
        $scope.showIndustry = [false,false];
        
        $scope.indexIndustryShow = 0;
        
        $scope.addNewIndustry = function(){
            for(var i = 0;i<2;i++){
                if(!$scope.showIndustry[i]){
                    $scope.showIndustry[i] = true;
                    break;
                }
            }
        }
        
        $scope.removeIndustry = function(index){
            $scope.showIndustry[index] = false;
            if(index === 0){
                $scope.company2Industry = [];        
                $scope.company2SubIndustry = [];
            }else {
                $scope.company3Industry = [];
                $scope.company3SubIndustry = [];
            }
        }
        
        $scope.showCompanyPage = function(){
            window.location.href = rootUrl+"mysite/app/updatecompany.php?name="+decodeURIComponent($scope.company['NAME']);
        }        
                
        $scope.updateCompanyId = '';
        
        $scope.companyMainIndustry = $scope.industries[0];
        
        $scope.companyMainSubIndustry = $scope.companyMainIndustry[0];
        
        /*$scope.company2Industry = $scope.industries[0];
        
        $scope.company2SubIndustry = $scope.companyMainIndustry[0];
        
        $scope.company3Industry = $scope.industries[0];
        
        $scope.company3SubIndustry = $scope.companyMainIndustry[0];*/
                
        $scope.companyRevenueUpdate = $scope.companyRevenue[0];
        
        $scope.location_zip = true;
        
        $scope.$watch('searchHistory', function (newValue) {
            if (newValue) {
                $scope.loadState();
            }
        });
        
        $scope.$watch('loginFormAlredy', function (newValue) {
            if (newValue) {
                initalAllEvent();
            }
        });
        
    }]);
