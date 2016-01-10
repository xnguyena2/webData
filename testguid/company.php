<!DOCTYPE html>
<html class="no-js wf-sourcesanspro-i4-active wf-sourcesanspro-n3-active wf-sourcesanspro-n4-active wf-sourcesanspro-n6-active wf-sourcesanspro-n7-active wf-active csstransforms csstransforms3d csstransitions">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">        
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>title</title>
        <meta name="description" content="">
        <meta name="viewport" class="mobile" content="width=device-width">
        
        <link rel="stylesheet" type="text/css" href="../../app/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../../app/css/angular.treeview.css">

        <link rel="stylesheet" type="text/css" media="screen" href="../../app/styles/css/smartadmin-production-plugins.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../../app/styles/css/smartadmin-production.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../../app/styles/css/smartadmin-skins.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../../app/styles/css/fixes.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../../app/styles/css/smartadmin-rtl.min.css">
        <link href="../css/mystyle.css" rel="stylesheet" type="text/css">
        
        
        <link rel="stylesheet" href="../css/l.css" media="all">
    
        <link rel="stylesheet" href="../css/16fd7d9d.vendor.css">
        <link rel="stylesheet" href="../css/d04bafe0.main.css">

        <link rel="stylesheet" type="text/css" href="../css/slick.css">
        <link rel="stylesheet" href="../css/font-awesome.min.css">
        <link rel="stylesheet" href="../css/jquery.Jcrop.css" type="text/css">
        <link rel="stylesheet" href="../css/emoji.min.css" type="text/css">
        <link href="../css/st.css" rel="stylesheet" type="text/css">
        
        
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../../app/js/md5.js"></script>
        <script type="text/javascript" src="../../app/js/jquery.min.js"></script>
        <script type="text/javascript" src="../../app/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="../../app/js/jquery.validate.js"></script>        
        <script language="javascript" src="../../app/js/angular.min.js"></script>
        <script type="text/javascript" src="../../app/app.js"></script>
        <script type="text/javascript" src="../../app/controllers/contact-controller.js"></script>
        <script type="text/javascript" src="../../app/angular.treeview.js"></script>
        <script type="text/javascript" src="../../app/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../../app/directives/smart-include.js"></script>
        <script type="text/javascript" src="../../app/js/myjavascript.js"></script>

    </head>
    <body id="WEB_BODY" class="ng-scope dontselect" ng-app="myapp" ng-controller="ContactCtrl" ng-init="companyInfomation='<?php echo rawurlencode(filter_input(INPUT_GET, 'name'));?>'">    
        
        <div id="paymentform" class="login-popup" style="display: none; margin-top: -109.5px; margin-left: -131.5px;">
            <a href="#" class="close"><img src="../../app/close_pop.png" class="btn_close" title="Close Window" alt="Close"></a>
            <ng-include src="paypalSubcription"></ng-include>
	</div>
        
        
        <div class="body-wrapper">
            <div ng-include="">
                <!-- SEO Keywords -->
                <!-- ngIf: $root.Helpers.isBot -->
            </div>
            <div>
                <div class="navContainer ng-scope">
                    <div class="houzz-header" style="background-color: darkcyan">
                        <div class="container">
                            <a class="brand" href="https://dung-dev.zenquiz.net/vn/houzz"><img src="../img/logo.png" width="60" height="60"></a>
                            <div class="search-wrapper" ng-init="searchMode = false">
                                <input style="background-color: white" type="text" placeholder="Contact Name, Company Name..." class="search-box ng-pristine ng-untouched ng-valid" ng-change="searchFieldChange()" ng-blur="searchMode = false" ng-focus="searchMode = true" ng-model="searchText">
                            </div>			
                            <div class="user-info">
                                <div class="my-houzz">
                                    <div style="margin-right: -100px">                                        
                                        <!--<span ng-show="isLogin" style="color: white;margin-right: 20px" id="addCredit" popupform="#login-box">Get contact</span>
                                        <span ng-show="isLogin" style="color: white;margin-right: 20px" id="showPaymentForm" popupform="#paymentform">+Add Credit</span>
                                        <span ng-show="!isLogin" style="color: white;margin-right: 20px" ng-click="showSignUpForm()">Sign Up</span>
                                        <img class="avatar" src="./img/usericon.png">
                                        <span ng-show="!isLogin" style="color: white;margin-right: 20px" ng-click="showLoginForm()">Login</span>
                                        <span ng-show="isLogin" style="color: white;margin-right: 20px" ng-click="showLoginForm()">Login</span>-->
                                        <ul>
                                            <li ng-show="isLogin" class="active"><a class="login-window" id="addCredit" popupform="#login-box">Get Contact</a></li>
                                            <li ng-show="isLogin" class="active"><a class="login-window" id="showPaymentForm" popupform="#paymentform">+Add Credit</a></li>
                                            <li ng-show="!isLogin" class="active"><a class="login-window" ng-click="showSignUpForm()">Sign Up</a></li>
                                            <li ng-show="!isLogin" class="active"><a class="login-window" ng-click="showLoginForm()">Login</a></li>
                                            <li ng-show="isLogin">
                                                <a href="#">
                                                    <img class="avatar" src="../img/usericon.png">
                                                    {{userName}} &#9662;
                                                </a>
                                                <ul class="dropdown">
                                                    <li><a href="{{rootUrl+'mysite/app/mycredit.html'}}">My Credit</a></li>
                                                    <li><a href="{{rootUrl+'mysite/app/myfolder.html'}}">My Exports</a></li>
                                                    <li><a href="{{rootUrl+'mysite/app/mysetting.html'}}">Settings</a></li>
                                                    <li><a href="#" ng-click="logOut()">Log Out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="houzz-category">
                        <ul class="category-list container">
                            <li class="first-menu">
                                <a href="#" class="menu-title ng-binding"><i class="fa fa-home"></i>Home</a>
                            </li>
                            <li ng-repeat="item in Mainmenu">
                                <a class="menu-title ng-binding" href="#">{{item}}</a>
                            </li>
                        </ul>
                    </div>	
                </div>
            </div>
            
            
            <div ng-view="">
                <div id="houzz-photo"> 
                    <div class="main-content">
                        <div class="container">
                            <div class="leftSide-bar">
                                <div smart-include="../../app/views/leftpanel.html"></div>
                            </div>
                            <div class="rightSide-content">
                                <div class="breadcrumb-area" style="padding-bottom: 5px;border-bottom: 7px solid #16FFD4;margin-bottom: 8px;">
                                    <h1 style="text-align: left;padding: 0px;" class="breadcrumb-text ng-binding">{{company.NAME}}</h1>
                                </div>
                                <div smart-include="../../app/views/companyinfo.html"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>