var rootUrl = "http://localhost/";
/*$(document).ready(function () {
    initalAllEvent();
    
    console.log($('#signupform'));
    $('#signupform').validate({
               rules: {
                   usernamesignup: "required",
                   emailsignup: {
                       required: true,
                       email: true
                   },
                   passwordsignup: {
                       required: true,
                       minlength: 6,
                       maxlength: 10, 
                   } , 
                   passwordsignup_confirm: { 
                       equalTo: "#passwordsignup",
                       minlength: 6,
                       maxlength: 10
                   }
               },
        
                // Specify the validation error messages
                messages: {
                    usernamesignup: "Please enter your first name",
                    passwordsignup: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    passwordsignup_confirm: {
                        required: "Not match password!",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    emailsignup: "Please enter a valid email address"
                },
                submitHandler: function(form) {
                    form.submit();
                },
                highlight: function (element, required) {
                    $(element).fadeOut(function () {
                        $(element).fadeIn();
                        $(element).css('border', '2px solid #FDADAF');
                    });
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).css('border', '1px solid #CCC');
                }
            });
    
    $('#loginBtn').click(function () {
        $.removeCookie('TOKEN', { path: '/' });
        $.ajax({
            type: "POST",
            data: {
                username: $('#username').val(),
                password: CryptoJS.MD5($('#password').val()).toString()
            },
            url: rootUrl+"mysite/api/login.php",
            success: function (response) {
                //console.log(response);
                if (response !== '-1'){
                    $.cookie('TOKEN', response['TOKEN'], {expires: 7, path: '/'});
                    window.location.href = rootUrl+"mysite/testguid/index.html";
                }
                else $('#noticeInfomation').text("Email or Password incorrect!");
                //else console.log(getCookie("token"));
            }
        });
    });
    $('#signUpBtn').click(function () {
        var $frm =  $ ("#signupform");
        if($frm.valid()){    
            $.ajax({
                type: "POST",
                data: {
                    usernamesignup: $('#usernamesignup').val(),
                    emailsignup: $('#emailsignup').val(),
                    passwordsignup: CryptoJS.MD5($('#passwordsignup').val()).toString()
                },
                url: rootUrl+"mysite/api/createuser.php",
                success: function (response) {
                    console.log("reponse:"+response);
                    if (response !== '-1'){
                        $.cookie('TOKEN', response['TOKEN'], {expires: 7, path: '/'});
                        window.location.href = rootUrl+"mysite/testguid/index.html";
                    }
                    else alert('email alredy exists!');
                }
            });
        }
    });
	
	// When clicking on the button close or the mask layer the popup closed

});*/

function initalAllEvent(){
    //console.log($('#signupform'));
    $('#signupform').validate({
               rules: {
                   usernamesignup: "required",
                   emailsignup: {
                       required: true,
                       email: true
                   },
                   passwordsignup: {
                       required: true,
                       minlength: 6,
                       maxlength: 10, 
                   } , 
                   passwordsignup_confirm: { 
                       equalTo: "#passwordsignup",
                       minlength: 6,
                       maxlength: 10
                   }
               },
        
                // Specify the validation error messages
                messages: {
                    usernamesignup: "Please enter your first name",
                    passwordsignup: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    passwordsignup_confirm: {
                        required: "Not match password!",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    emailsignup: "Please enter a valid email address"
                },
                submitHandler: function(form) {
                    form.submit();
                },
                highlight: function (element, required) {
                    $(element).fadeOut(function () {
                        $(element).fadeIn();
                        $(element).css('border', '2px solid #FDADAF');
                    });
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).css('border', '1px solid #CCC');
                }
            });
    
    $('#loginBtn').click(function () {
        $.removeCookie('TOKEN', { path: '/' });
        $.ajax({
            type: "POST",
            data: {
                username: $('#username').val(),
                password: CryptoJS.MD5($('#password').val()).toString()
            },
            url: rootUrl+"mysite/api/login.php",
            success: function (response) {
                //console.log(response);
                if (response !== '-1'){
                    $.cookie('TOKEN', response['TOKEN'], {expires: 7, path: '/'});
                    window.location.href = rootUrl+"mysite/testguid/index.html";
                }
                else $('#noticeInfomation').text("Email or Password incorrect!");
                //else console.log(getCookie("token"));
            }
        });
    });
    $('#signUpBtn').click(function () {
        var $frm =  $ ("#signupform");
        if($frm.valid()){    
            $.ajax({
                type: "POST",
                data: {
                    usernamesignup: $('#usernamesignup').val(),
                    emailsignup: $('#emailsignup').val(),
                    passwordsignup: CryptoJS.MD5($('#passwordsignup').val()).toString()
                },
                url: rootUrl+"mysite/api/createuser.php",
                success: function (response) {
                    console.log("reponse:"+response);
                    if (response !== '-1'){
                        $.cookie('TOKEN', response['TOKEN'], {expires: 7, path: '/'});
                        window.location.href = rootUrl+"mysite/testguid/index.html";
                    }
                    else alert('email alredy exists!');
                }
            });
        }
    });
    
	
	// When clicking on the button close or the mask layer the popup closed    
};

$(document).on('click', 'a.close, #mask, #canCelUpdate', function () {
    //alert( "Do here what you want!" );
    $('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
});

$(document).on('click', '#subcribeSliver, #subcribeGold, #subcribePlatinum, #subcribeDiamond', function () {
    var value = $(this).attr('valueCredit');
    $('#paypalOptionPlan').val(value);
    $('#paypalSubmitButton').click();
});

$(document).on('click', '#updateContact, #showPaymentForm, #addCredit, #showUnscribForm, #showSubcriForm', function () {
    // Getting the variable's value from a link 
    var loginBox = $(this).attr('popupform');

    //Fade in the Popup and add close button
    $(loginBox).fadeIn(300);

    //Set the center alignment padding + border
    var popMargTop = ($(loginBox).height() + 24) / 2; 
    var popMargLeft = ($(loginBox).width() + 24) / 2; 

    $(loginBox).css({ 
            'margin-top' : -popMargTop,
            'margin-left' : -popMargLeft
    });

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);

    return false;
});

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (value * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}


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
    var fileName = "Folder_";
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