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
    $token = filter_input(INPUT_POST, 'token');
    $isImportCompany = filter_input(INPUT_POST, 'company');
    $arrayID = filter_input(INPUT_POST, 'arrayID', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
    if (isset($arrayID)) {
        if (isset($isImportCompany)) {
            $dataBaseManager->ConfirmUpdateCompany($arrayID, $token);
        } else {
            $dataBaseManager->ConfirmUpdateContact($arrayID, $token);
        }
    }else        echo 'nothing updated!!';
}
?>