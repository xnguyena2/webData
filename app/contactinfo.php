<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="../js/md5.js"></script>
        <script type="text/javascript" src="../js/jquery.min.js"></script>
        <script type="text/javascript" src="../js/jquery.cookie.js"></script>
        <script type="text/javascript" src="../js/jquery.validate.js"></script>        
        <script language="javascript" src="../js/angular.min.js"></script>
        <script type="text/javascript" src="../app.js"></script>
        <script type="text/javascript" src="../controllers/contact-controller.js"></script>
        <script type="text/javascript" src="../angular.treeview.js"></script>
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../directives/smart-include.js"></script>
        <script type="text/javascript" src="../js/myjavascript.js"></script>
        
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../css/angular.treeview.css">
        <link rel="stylesheet" type="text/css" href="../css/bussinesscard.css">

        <link rel="stylesheet" type="text/css" href="../css/my-style.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../styles/css/smartadmin-production-plugins.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../styles/css/smartadmin-production.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../styles/css/smartadmin-skins.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../styles/css/fixes.css">
        <link rel="stylesheet" type="text/css" media="screen" href="../styles/css/smartadmin-rtl.min.css">
    </head>
    <body ng-app="myapp" ng-controller="ContactCtrl" ng-init="contactInfomation='<?php echo rawurlencode(filter_input(INPUT_GET, 'info'));?>'">
        
        
        <div id="login-box" class="login-popup" style="display: none; margin-top: -109.5px; margin-left: -131.5px;background: white;">
            <a href="#" class="close"><img src="../close_pop.png" class="btn_close" title="Close Window" alt="Close"></a>
            <ng-include src="updateContactForm"></ng-include>
	</div>
        
        <div>
            <div class="widget-body">
            <hr class="simple">
            <div class="pull-right">
                <ol style="background-color: rgb(57, 171, 207);" class="breadcrumb">
                    <ul>
                        <li class="active"><a class="login-window" href="{{rootUrl+'mysite/app/index.html'}}">Home Page</a></li>
                        <li ng-show="!isLogin" class="active"><a class="login-window" ng-click="showSignUpForm()">Sign Up</a></li>
                        <li ng-show="!isLogin" class="active"><a class="login-window" ng-click="showLoginForm()">Login</a></li>
                        <li ng-show="isLogin">
                            <a href="#">{{userName}} &#9662;</a>
                              <ul class="dropdown">
                                  <li><a href="{{rootUrl+'mysite/app/mycredit.html'}}">My Credit</a></li>
                                  <li><a href="{{rootUrl+'mysite/app/myfolder.html'}}">My Exports</a></li>
                                  <li><a href="{{rootUrl+'mysite/app/mysetting.html'}}">Settings</a></li>
                                  <li><a href="#" ng-click="logOut()">Log Out</a></li>
                              </ul>
                        </li>
                    </ul>
                </ol>
            </div>
            <div class="col-sm-12">
                <ul id="myTab3" class="nav nav-tabs pull-right">
                    <li class="active">
                        <a href="#home" data-toggle="tab">Home</a>
                    </li>
                    <li class="">
                        <a href="#solution" data-toggle="tab">Solutions</a>
                    </li>
                    <li class="">
                        <a href="#product" data-toggle="tab">Products</a>
                    </li>
                    <li class="">
                        <a href="#company" data-toggle="tab">Company</a>
                    </li>
                    <li class="">
                        <a href="#contact" data-toggle="tab">Contact</a>
                    </li>
                </ul>
            </div>

            <div id="myTabContent3" class="tab-content padding-10">
                <div class="tab-pane fade in active" id="home">
                    <ng-include src="mainContain"></ng-include>
                </div>
                <div class="tab-pane fade" id="solution">
                    <p>
                        Solutions
                    </p>
                </div>
                <div class="tab-pane fade" id="product">
                    <p>
                        products
                </div>
                <div class="tab-pane fade" id="company">
                    <p>
                        company
                    </p>
                </div>
                <div class="tab-pane fade" id="company">
                    <p>
                        Contact
                    </p>
                </div>
            </div>

        </div>
        </div>
    </body>
</html>