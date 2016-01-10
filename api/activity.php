<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include './DBManager.php';

$token = filter_input(INPUT_GET, 'token');
$dataBaseManager = new DBManager();
$dataBaseManager->Connect();
if ($dataBaseManager->connectSucessDataBase) {
    if(isset($token)){
        $token = mysqli_real_escape_string($dataBaseManager->conn, $token);
        $dataBaseManager->activity($token);
    }
}
?>