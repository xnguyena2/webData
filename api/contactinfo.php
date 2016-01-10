<?php
include './DBManager.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$info = filter_input(INPUT_GET, 'info');
$dataBaseManager = new DBManager();
$dataBaseManager->Connect();
if ($dataBaseManager->connectSucessDataBase) {
    if(isset($info)){        
        $info = mysqli_real_escape_string($dataBaseManager->conn, $info);
        $arrayInfo = explode("_", $info);        
        $dataBaseManager->GetContactInfomation($arrayInfo[0], $arrayInfo[1]);
    }
    //echo $name;
}
?>