<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <title>ecaptsoft</title>
    <meta charset="utf-8">
    <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <![endif]-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/fonts.css">
        <link rel="stylesheet" href="css/vertical.css">

    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <style>
    @media (max-width: 767px){  
	.menu{margin-bottom:3%}
 .menufull{
	    position: static;
    z-index: 0;

    width: 80%;
	display:none;
}}
</style>
   

    <!--[if lt IE 9]>
        <script src="js/vendor/html5shiv.min.js"></script>
        <script src="js/vendor/respond.min.js"></script>
    <![endif]-->
    
<link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>
</head>
<body ng-app="myapp" ng-controller="ContactCtrl" ng-init="contactInfomation='<?php echo rawurlencode(filter_input(INPUT_GET, 'info'));?>'">
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div id="paymentform" class="login-popup" style="display: none; margin-top: -109.5px; margin-left: -131.5px;">
    <a href="#" class="close"><img src="close_pop.png" class="btn_close" title="Close Window" alt="Close"></a>
        <ng-include src="paypalSubcription"></ng-include>
    </div>
<div class="bluebar"></div>
<div>
    <div smart-include="views/topbar.html"></div>
</div>
<div id="box_wrapper">

    <header id="header">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <a href="./" class="navbar-brand"><img src="example/logo.png"/></a>
                    <span id="toggle_mobile_menu"></span>
                    <nav id="mainmenu_wrapper">
                        <ul id="mainmenu" class="nav sf-menu">
                            <li class="">
                                <a href="#">Home</a>
                            </li>
                            <li class="">
                                <a href="#">Solutions</a>
                            </li>                                                          
                            <li class="">
                                <a href="#">Products</a>
                             </li>
                              <li class="active">
                                <a href="#">Company</a>
                             </li>       
                            <li class="">
                               <a href="#">Contact</a>
                            </li>             
                        </ul>  
                    </nav>
                
                </div>
            </div>
        </div>
    </header>

   

<section id="prices" class="light_section">
    <div class="container">
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div smart-include="views/leftpanel.html"></div>
        </div>
        
        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
            <div class="row">
                <div class="bright">
                <h3><span class="bluee"> Update Contact</span></h3>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="spl">
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                <div class="loginfm">
                                    <form action="{{rootUrl+'mysite/api/updatecontact.php'}}" method="post">
                                        <input type="hidden" id="id" name="id" value="{{contactInfo.ID}}">
                                        <input type="hidden" id="emailuser" name="userEmail" value="{{userID}}">
                                        <input type="hidden" id="companyupdateuser" name="company" value="{{contactInfo.COMPANY}}">
                                        <p> <span class="chk">First Name</span>
                                            <input id="firstName" value="{{contactInfo.FIRSTNAME}}" name="firstName" type="text" class="search1"></p>
                                        <p> <span class="chk">Last Name</span>
                                            <input id="lastName" value="{{contactInfo.LASTNAME}}" name="lastName" type="text" class="search1"></p>
                                        <p> <span class="chk">Title</span>
                                            <input id="jobTitle" value="{{contactInfo.TITLE}}" name="jobTitle" type="text" class="search1">
                                        </p>
                                        <p> <span class="chk">Email</span>
                                            <input id="email" value="{{contactInfo.EMAIL}}" name="email" type="text" class="search1">
                                        </p>
                                        <p>
                                            <input name="" type="submit" class="lbtn" value="Update Contact">
                                            <input name="" type="submit" class="lbtn1" value="Cancel">
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            </div>
                        </div>
                    </div>  
                </div>
                </div>
            </div>  
        </div>
        
    </div>
</section>


<section id="socio" class="socioo clearfix">
            <div class="col-lg-3 col-md-3 col-md-3 col-xs-12" style="padding:0">
                 <div class="soblue">GET CONNECTED</div>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                       <a href=""><img src="example/so1.png" vspace="16"/></a>   
                       <a href=""><img src="example/so2.png" vspace="16"/></a>   
                       <a href=""><img src="example/so3.png" vspace="16"/></a>   
                       <a href=""><img src="example/so4.png" vspace="16"/></a>     
            </div>
</section>

<section id="footer" class="darkgrey_section fttop">
        <div class="container">
            <div class="row footz">
                     <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                          <img src="example/logo.png" vspace="30"/>
                          <p>B2B marketing and sourcing company</p>
                     </div>
                  
                     <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <h3>Our Services</h3>
                         <ul>
                           <li><a href="#">FAQ</a></li>
                           <li><a href="#">Privacy Policy</a></li>
                           <li><a href="#">Anti Spam Policy</a></li>
                           <li><a href="#">Terms & Conditons</a></li>
                         </ul>
                     </div>
                     
                     <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                         <h3>Our Services</h3>
                         <ul>
                           <li><a href="#">FAQ</a></li>
                           <li><a href="#">Privacy Policy</a></li>
                           <li><a href="#">Anti Spam Policy</a></li>
                           <li><a href="#">Terms & Conditons</a></li>
                         </ul>
                     </div>
                     
                     <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                         <h3>Our Services</h3>
                        <p>
                       Morbi gravida, massa sed dictum consectetur, turpis mi euismod elit, sit amet feugiat orci dui in felis. Duis purus ligula, consequat sit amet justo et, congue consectetur massa. Nullam adipiscing felis a sapien hendrerit ultrices. Curabitur fringilla sed odio eget tincidunt.
                        </p>
                     </div>
            </div>
         </div>
</section>            

    <section id="copyright" class="darkgrey_section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 sml">
                    <p>DESIGNED BY <a href="">THINKCEPT</a></p>
                </div>                
            </div>
        </div>
    </section>
 

</div><!-- eof #box_wrapper -->

<div class="preloader">
    <div class="preloader_image"></div>
</div>


        <!-- libraries -->
        <script src="js/vendor/jquery-1.11.1.min.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/vendor/jquery.appear.js"></script>

        <!-- superfish menu  -->
        <script src="js/vendor/jquery.hoverIntent.js"></script>
        <script src="js/vendor/superfish.js"></script>
        
        <!-- page scrolling -->
        <script src="js/vendor/jquery.easing.1.3.js"></script>
        <script src='js/vendor/jquery.nicescroll.min.js'></script>
        <script src="js/vendor/jquery.ui.totop.js"></script>
        <script src="js/vendor/jquery.localscroll-min.js"></script>
        <script src="js/vendor/jquery.scrollTo-min.js"></script>
        <script src='js/vendor/jquery.parallax-1.1.3.js'></script>

        <!-- widgets -->
        <script src="js/vendor/jquery.easypiechart.min.js"></script><!-- pie charts -->
        <script src='js/vendor/jquery.countTo.js'></script><!-- digits counting -->
        <script src="js/vendor/jquery.prettyPhoto.js"></script><!-- lightbox photos -->
        <script src='js/vendor/jflickrfeed.min.js'></script><!-- flickr -->
        <script src='twitter/jquery.tweet.min.js'></script><!-- twitter -->

        <!-- sliders, filters, carousels -->
        <script src="js/vendor/jquery.isotope.min.js"></script>
        <script src='js/vendor/owl.carousel.min.js'></script>
        <script src='js/vendor/jquery.fractionslider.min.js'></script>
        <script src='js/vendor/jquery.flexslider-min.js'></script>
        <script src='js/vendor/jquery.bxslider.min.js'></script>

        <!-- custom scripts -->
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

       
        <!-- my libraries-->
        <script type="text/javascript" src="../app/js/md5.js"></script>
        <script type="text/javascript" src="../app/js/jquery.cookie.js"></script>
        <script type="text/javascript" src="../app/js/jquery.validate.js"></script>        
        <script language="javascript" src="../app/js/angular.min.js"></script>
        <script type="text/javascript" src="../app/app.js"></script>
        <script type="text/javascript" src="../app/controllers/contact-controller.js"></script>
        <script type="text/javascript" src="../app/directives/smart-include.js"></script>
        <script type="text/javascript" src="../app/js/myjavascript.js"></script>

        <!-- mylibraries -->
        <link rel="stylesheet" href="css/mystyle.css">
        <link rel="stylesheet" href="css/loadingeffect.css">


    </body>
</html>