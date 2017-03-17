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
    $sender = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'sender'));
    $reciver = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'reciver'));
    $value = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'value'));
    
    $dataBaseManager->transaction($sender, $reciver, $value);
}
?>