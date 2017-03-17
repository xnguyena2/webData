<?php
include './DBManager.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$userDateBaseManager = new UserDataBaseManager();
$userDateBaseManager->Connect();
$dataBaseManager = new DBManager();
$dataBaseManager->Connect();
if ($dataBaseManager->connectSucessDataBase) {
    $usernamesignup = filter_input(INPUT_POST, 'usernamesignup');
    $emailsignup = filter_input(INPUT_POST, 'emailsignup');
    $passwordsignup = filter_input(INPUT_POST, 'passwordsignup');
    if (isset($emailsignup) && isset($usernamesignup) && isset($passwordsignup) && $usernamesignup !== '' && $emailsignup !== '') {
        $usernamesignup = mysqli_real_escape_string($dataBaseManager->conn, $usernamesignup);
        $emailsignup = mysqli_real_escape_string($dataBaseManager->conn, $emailsignup);
        $passwordsignup = mysqli_real_escape_string($dataBaseManager->conn, $passwordsignup);
        $token = md5($emailsignup.time());
        if ($dataBaseManager->checkUserExit($emailsignup, $passwordsignup, $usernamesignup,$token)) {
            $arrayResult = array();
            $arrayResult['TOKEN'] = $token;
            $arrayResult['ACTIVITY'] = FALSE;
            $emailnanager = new emailManager();
            $arrayResult['SENDEMAIL'] = $emailnanager->sendEmail($emailsignup, $token, NULL);
            header('Content-type: application/json');
            echo json_encode($arrayResult);            
        } else {
            echo '-1';
        }
    } else {
        echo '-1';
    }
} else {
    echo -1;
}
