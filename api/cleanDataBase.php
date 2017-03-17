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
    $dataBaseManager->CleanFieldOfContact("EMAIL");
    $dataBaseManager->CleanFieldOfContact("FIRSTNAME");
    $dataBaseManager->CleanFieldOfContact("LASTNAME");
    $dataBaseManager->CleanFieldOfContact("TITLE");
    $dataBaseManager->CleanFieldOfContact("JOBTITLE");
    $dataBaseManager->CleanFieldOfContact("COMPANY");
    $dataBaseManager->CleanFieldOfContact("DEPARTMENT");
    $dataBaseManager->CleanFieldOfContact("PROFILECITY");
    $dataBaseManager->CleanFieldOfContact("PROFILESTATE");
    $dataBaseManager->CleanFieldOfContact("PROFILECOUNTRY");
    
    $dataBaseManager->CleanFieldOfCompany("INDUSTRIES");
    $dataBaseManager->CleanFieldOfCompany("NAME");
    $dataBaseManager->CleanFieldOfCompany("PHONE");
    $dataBaseManager->CleanFieldOfCompany("URL");
    $dataBaseManager->CleanFieldOfCompany("SIZE");
    $dataBaseManager->CleanFieldOfCompany("REVENUE");
    $dataBaseManager->CleanFieldOfCompany("ADDRESS");
    $dataBaseManager->CleanFieldOfCompany("CITY");
    $dataBaseManager->CleanFieldOfCompany("STATE");
    $dataBaseManager->CleanFieldOfCompany("ZIP");
    $dataBaseManager->CleanFieldOfCompany("COUNTRY");
    $dataBaseManager->CleanFieldOfCompany("OWNERSHIP");
}
?>