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
    $userName = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'username'));
    $hashPassword = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'password'));
    
    $dataBaseManager->signup($userName, $hashPassword);
}
?>