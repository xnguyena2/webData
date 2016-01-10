<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class emailManager{
    function sendEmail($to,$activityToken, $money){
        if ($to !== NULL) {
            //$to = "somebody@example.com, somebodyelse@example.com";
            //$subject = "HTML email";
            $subject = '';
            $message = '';
            if($activityToken !== NULL){
                $subject = 'Activiti email';
                $message = "
                <html>
                <head>
                    <title>$subject</title>
                </head>
                    <body>
                        <p>please click this link to activate your registration</p>
                        <a href ='93.158.211.165/~tcshosting/mysite/activity.php?token=$activityToken'>93.158.211.165/~tcshosting/mysite/activity.php?token=$activityToken</a>
                    </body>
                </html>
                ";
            }else {
                $subject = 'Add credit';
                $message = "
                <html>
                <head>
                    <title>$subject</title>
                </head>
                    <body>
                        <p>You added $money credit!</p>
                    </body>
                </html>
                ";
            }

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headers .= 'From: <webmaster@example.com>' . "\r\n";
            //$headers .= 'Cc: myboss@example.com' . "\r\n";

            $retval = mail($to,$subject,$message,$headers);

            if ($retval == true) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
?>