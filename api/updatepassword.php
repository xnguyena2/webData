<?php

include './DBManager.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$dataBaseManager = new DBManager();
$dataBaseManager->Connect();
if ($dataBaseManager->connectSucessDataBase) {
    $id = filter_input(INPUT_POST, 'id');
    $oldPass = filter_input(INPUT_POST, 'oldpassword');
    $newPass = filter_input(INPUT_POST, 'newpassword');
    $dataBaseManager->updatePass($id, $oldPass, $newPass);
}
?>