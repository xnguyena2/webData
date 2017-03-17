<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class DBManager {
    var $servername = "sql101.byethost15.com";
    var $username = "b15_19133082";
    var $password = "1Kakashita";
    var $dbname = "b15_19133082_xnguyen";
    var $conn;
    var $connectSucessDataBase = FALSE;

    function DBManager() {
        $this->servername = "sql101.byethost15.com";
        $this->username = "b15_19133082";
        $this->password = "1Kakashita";
        $this->dbname = "b15_19133082_xnguyen";
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

    function login($userName, $password) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT * FROM USER WHERE (USERNAME = '$userName' && PASSWORD = '$password');";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                echo 'login success';
            } else {
                echo 0;
            }
        }
    }

    function getblance($userName) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT BLANCE FROM USER WHERE (USERNAME = '$userName');";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                $row = $results->fetch_assoc();
                return $row['BLANCE'];
            } else {
                return -1;
            }
        }
    }

    function signup($userName, $password) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT * FROM USER WHERE (USERNAME = '$userName);";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                echo 0;
            } else {
                if ($this->conn->query("INSERT INTO USER (USERNAME,PASSWORD,BLANCE) VALUES ('$userName', '$password', '1000');") === TRUE) {
                    echo 'signup success';
                } else {
                    //echo $this->conn->error;
                    echo 0;
                }
            }
        }
    }
    
    function transaction($sender, $reciver, $value) {
        $senderBlance = $this->getblance($sender);
        $reciverBlance = $this->getblance($reciver);
        if($senderBlance > $value){
            if ($this->conn->query("INSERT INTO USER (BLANCE) VALUES ('$senderBlance - $value') WHERE USERNAME = '$sender';") === TRUE) 
            {
                if ($this->conn->query("INSERT INTO USER (BLANCE) VALUES ('$senderBlance + $value') WHERE USERNAME = '$reciver';") === TRUE) 
                {
                    echo 'transaction success';
                } else {
                //echo $this->conn->error;
                    echo 0;
                }
            } else {
                //echo $this->conn->error;
                echo 0;
            }
        }else            
            echo 0;
    }
    
}
?>