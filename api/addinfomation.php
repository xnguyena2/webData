<?php

include './utils.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//include './UserDataBaseManager.php';
include './DBManager.php';
$dataBaseManager = new DBManager();
$userDateBaseManager = new UserDataBaseManager();
$userDateBaseManager->Connect();
$dataBaseManager->Connect();
if($userDateBaseManager->connectSucessDataBase && $dataBaseManager->connectSucessDataBase){
$arrayCreadit = filter_input(INPUT_POST, 'arrayCredit', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$token = filter_input(INPUT_POST, 'token');
$folder = filter_input(INPUT_POST, 'folder');
    if(!isset($arrayCreadit) || !isset($folder)){
        echo 0;
    }
    else {
        $token = mysqli_real_escape_string($dataBaseManager->conn, $token);
        $folder = mysqli_real_escape_string($dataBaseManager->conn, $folder);
        $userInfo = $dataBaseManager->GetCredit($token);
        if ($userInfo !== 0) {
            if ($userInfo['CREDIT'] > 0) {
                $canInsert = min($userInfo['CREDIT'], count($arrayCreadit));
                $sql = "INSERT IGNORE INTO "
                        . emailToNameTable($userInfo['ID'])
                        . "(ID,FOLDER) VALUES ";
                foreach ($arrayCreadit as $id) {
                    if ($canInsert <= 0) {
                        break;
                    }
                    $sql .= "($id,'$folder'),";
                    $canInsert--;
                }
                //echo rtrim($sql, ",");
                $count = $userDateBaseManager->InsertNewValue(rtrim($sql, ","));
                $result = $dataBaseManager->UpdateCredit($count, $userInfo['ID']);
                if ($result) {
                    echo $count;
                } else {
                    echo 0;
                }
            } else {
                echo $userInfo;
            }
        } else {
            echo $userInfo;
        }
    }
}

?>