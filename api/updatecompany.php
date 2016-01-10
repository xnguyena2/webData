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
    $companyId = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyId'));
    $userEmail = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'userEmail'));
    $companyWebsite = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyWebsite'));
    $companyName = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyName'));
    $companyCountry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyCountry'));
    $companyPhone = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyPhone'));
    $companyAddress = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyAddress'));
    $companyCity = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyCity'));
    $companyState = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyState'));
    $companyZip = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyZip'));
    $companyMainIndustry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyMainIndustry'));
    $companyMainSubIndustry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyMainSubIndustry'));
    $company2Industry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'company2Industry'));
    $company2SubIndustry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'company2SubIndustry'));
    $company3Industry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'company3Industry'));
    $company3SubIndustry = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'company3SubIndustry'));
    $companySizeUpdate = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companySizeUpdate'));
    $companyRevenueUpdate = mysqli_real_escape_string($dataBaseManager->conn, filter_input(INPUT_POST, 'companyRevenueUpdate'));
    
    $dataBaseManager->updateCompany($userEmail, $companyId, $companyName, $companyWebsite, $companyCountry, $companyPhone,
            $companyAddress, $companyCity, $companyState, $companyZip, str_replace(',,','',$companyMainIndustry .','. $companyMainSubIndustry .','.
            $company2Industry .','.  $company2SubIndustry .','.  $company3Industry .','. $company3SubIndustry), $companySizeUpdate, $companyRevenueUpdate);
}
?>