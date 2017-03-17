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
    $id = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'id'));
    $firstName = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'firstName'));
    $lastName = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'lastName'));
    $jobTitle = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'jobTitle'));
    $email = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'email'));
    $userEmail = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'userEmail'));
    $company = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'company'));
    $dataBaseManager->updateContact($id, $firstName, $lastName, $jobTitle, $email, $userEmail, $company);
}
?>