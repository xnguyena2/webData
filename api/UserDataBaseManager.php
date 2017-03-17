<?php
if (!function_exists('emailToNameTable')) {
    include './utils.php';
}
if(!class_exists('emailManager')){
    include './sendEmail.php';    
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserDataBaseManager
 *
 * @author Nguyen Phong
 */
class UserDataBaseManager {

    //put your code here
    var $servername = "localhost";
    var $username = "nguyenphong";
    var $password = "123456789";
    var $dbname = "userinfomation";
    var $conn;
    var $connectSucessDataBase = FALSE;

    function UserDataBaseManager() {
        $this->servername = "localhost";
        $this->username = "nguyenphong";
        $this->password = "123456789";
        $this->dbname = "userinfomation";
        /*
        $this->username = "tcshosti_nguyenp";
        $this->password = "1Kakashita";
        $this->dbname = "tcshosti_nguyenphong";
         */
        $this->connectSucessDataBase = FALSE;
    }

    function Connect() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
//die("Connection failed: " . $conn->connect_error);
            $this->connectSucessDataBase = FALSE;
            return FALSE;
        } else {
//echo 'sucess!!';
            mysqli_set_charset($this->conn,"utf8");
            $this->connectSucessDataBase = TRUE;
            return TRUE;
        }
    }

    function CreateTable($name) {
        if ($this->connectSucessDataBase) {
            $sql = "CREATE TABLE $name ( ID INT(11) UNSIGNED PRIMARY KEY, FOLDER VARCHAR(250) )";
            if ($this->conn->query($sql)) {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }
    
    function AddIdInfomation($Id){
        if ($this->connectSucessDataBase) {
            $sql = "CREATE TABLE $name ( ID INT(11) UNSIGNED PRIMARY KEY)";
            if ($this->conn->query($sql) === TRUE) {
                return TRUE;
            } else {
                return FALSE;
            }
        }
    }
    
    function GetArrayCredit($name, $folder){
        if ($this->connectSucessDataBase) {
            $arrayResult = array();
            $sql = "SELECT * FROM ".emailToNameTable($name);
            if($folder != NULL){
                $sql.=" WHERE FOLDER = '$folder'";
            }
            $result = $this->conn->query($sql);
            while ($row = $result->fetch_assoc()) {
                array_push($arrayResult, $row['ID']);
            }
            return $arrayResult;
        } else {
            return [];
        }
    }
    
    function GetFolderInfo($name){
        if ($this->connectSucessDataBase) {
            $arrayResult = array();
            $sql = "SELECT DISTINCT FOLDER, COUNT(FOLDER) AS COUNT FROM ".emailToNameTable($name)." GROUP BY FOLDER";
            $result = $this->conn->query($sql);
            while ($row = $result->fetch_assoc()) {
                array_push($arrayResult, $row);
            }
            return $arrayResult;
        } else {
            return [];
        }
    }
    
    function CountTable($name){
        if ($this->connectSucessDataBase) {  
            $sql = "SELECT COUNT(*) FROM $name";
            $result = $this->conn->query($sql);
            $counts=mysqli_fetch_array($result,MYSQLI_NUM);
            return $counts[0];
        }
    }
    
    function InsertNewValue($sql){        
        if ($this->connectSucessDataBase) {            
            if ($this->conn->query($sql) === TRUE) {
                return mysqli_affected_rows($this->conn);
            } else {
                //return FALSE;
                echo $this->conn->error;
            }
        }
    }
    
    function DropTable($name){
        if ($this->connectSucessDataBase) {  
            $sql = "DROP TABLE IF EXISTS ".emailToNameTable($name);
            if(!$this->conn->query($sql))
                echo $this->conn->error;
        }
    }

}

?>