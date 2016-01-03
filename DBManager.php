<?php

include './UserDataBaseManager.php';
if(!class_exists('emailManager')){
    include './sendEmail.php';    
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DBManager
 *
 * @author Nguyen Phong
 */
class DBManager {

    var $userType = array(
        "0" => 20,
        "1" => 500,
        "2" => 5000,
        "3" => 500000000000
    );
    var $servername = "localhost";
    var $username = "nguyenphong";
    var $password = "123456789";
    var $dbname = "nguyenphong";
    var $conn;
    var $connectSucessDataBase = FALSE;
    var $numberResultPerPage = 20;
    var $userInfo; // = new UserDataBaseManager();
    var $rootUrl = "http://localhost/";

    function DBManager() {
        $this->servername = "localhost";
        $this->username = "nguyenphong";
        $this->password = "123456789";
        $this->dbname = "nguyenphong";
        $this->connectSucessDataBase = FALSE;
        $this->userInfo = new UserDataBaseManager();
        $this->userInfo->Connect();
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

    function login($userName, $password, $token, $userToken) {
        if ($this->connectSucessDataBase) {
            $resetToken = TRUE;
            $sql = "SELECT ID,NAME,CREDIT,ACTIVITY,PLAN,DATE FROM USER WHERE ((ID = '$userName' || NAME = '$userName') && PASSWORD = '$password')";
            if (isset($userToken)) {
                $userToken = mysqli_real_escape_string($this->conn, $userToken);
                $sql.=" || TOKEN = '$userToken'";
                $resetToken = FALSE;
            }
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                $row = $results->fetch_assoc();
                //return $this->userType[$row['PLAN']];
                $ID = $row['ID'];
                if ($resetToken) {
                    $this->conn->query("UPDATE USER SET TOKEN = '$token' WHERE ID = '$ID'");
                }else{
                    $token = $userToken;
                }
                $row['TOKEN'] = $token;
                if ($row['ACTIVITY'] === '' || $row['ACTIVITY'] === NULL) {
                    $row['ACTIVITY'] = TRUE;
                } else {
                    $row['ACTIVITY'] = FALSE;
                }
                header('Content-type: application/json');
                echo json_encode($row);
            } else {
                echo -1;
            }
        }
    }
    
    function activity($token) {
        if ($this->connectSucessDataBase && $token !== '' || $token !== NULL) {
            $sql = "SELECT ID,TOKEN FROM USER WHERE (ACTIVITY = '$token')";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                $row = $results->fetch_assoc();
                $ID = $row['ID'];
                if ($this->userInfo->CreateTable(str_replace('.', 'dot', str_replace('@', 'acon', $ID)))) {
                    if ($this->conn->query("UPDATE USER SET ACTIVITY = '' WHERE ID = '$ID'")) {
                        echo 'your account has been activated successfully!';
                    } else {
                        echo 'error';
                    }
                } else {
                    echo 'error!!';
                }
                //return $this->userType[$row['PLAN']];
            } else {
                echo 'error!!';
            }
        }else {
            echo 'error!!';
        }
    }

    function search($sizeParameter, $industriesParameter, $revenueParameter, $location_code, $page, $token, $locationParameter,
            $levelParameter, $departmentParameter, $resultOnPage, $searchName, $jobTitle, $companyName) {
        $sql = "SELECT * FROM INFOMATION , COMPANYINFOMATION "
                . "WHERE INFOMATION.COMPANY = COMPANYINFOMATION.NAME ";
        if (isset($sizeParameter)) {
            $sizePart = $this->getSqlStringPart($sizeParameter);
            if ($sizePart != '') {
                $sql .= "AND (COMPANYINFOMATION.SIZE IN $sizePart) ";
            }
        }

        if (isset($industriesParameter)) {
            $industryPart = $this->getSqlStringLikePart($industriesParameter, "COMPANYINFOMATION.INDUSTRIES");
            if ($industryPart != '') {
                $sql .= "AND (COMPANYINFOMATION.INDUSTRIES LIKE {$industryPart}) ";
            }
        }
        if (isset($revenueParameter)) {
            $revenuePart = $this->getSqlStringPart($revenueParameter);
            if ($revenuePart != '') {
                $sql .= "AND (COMPANYINFOMATION.REVENUE IN $revenuePart) ";
            }
        }
        if (isset($location_code)) {
            $location_code = mysqli_real_escape_string($this->conn, $location_code);
            $sql .= "AND (COMPANYINFOMATION.ZIP LIKE '%$location_code%' OR INFOMATION.PROFILECITY LIKE '%$location_code%' OR INFOMATION.PROFILESTATE LIKE '%$location_code%' OR INFOMATION.PROFILECOUNTRY LIKE '%$location_code%') ";
        }
        
        if(isset($locationParameter)){
            $sql .= "AND ( ";
            $first = 0;
            foreach($locationParameter as $contryArray){
                if ($first > 0) {
                    $sql.="OR ";
                }
                if(is_array($contryArray)){
                    $sql .= "(COMPANYINFOMATION.COUNTRY = '".array_shift($contryArray)."' ";
                    $locationPart = $this->getSqlStringPart($contryArray, "COMPANYINFOMATION.STATE");
                    $sql .= "AND COMPANYINFOMATION.STATE IN $locationPart) ";
                }else {
                    $contryArray = mysqli_real_escape_string($this->conn, $contryArray);
                    $sql .= "COMPANYINFOMATION.COUNTRY = '$contryArray' ";
                }
                $first++;
            }
            $sql.=") ";
        }
        
        if (isset($levelParameter)) {
            $levelPart = $this->getSqlStringPart($levelParameter);
            if ($levelPart != '') {
                $sql .= "AND (INFOMATION.JOBTITLE IN $levelPart) ";
            }
        }
        
        if (isset($departmentParameter)) {
            $departmentPart = $this->getSqlStringPart($departmentParameter);
            if ($departmentPart != '') {
                $sql .= "AND (INFOMATION.DEPARTMENT IN $departmentPart) ";
            }
        }        
        
        if(isset($searchName)){
            $searchName = mysqli_real_escape_string($this->conn, $searchName);
            $sql.="AND (INFOMATION.FIRSTNAME LIKE '%$searchName%' OR INFOMATION.LASTNAME LIKE '%$searchName%') ";
        }
        
        if(isset($jobTitle)){
            $jobTitle = mysqli_real_escape_string($this->conn, $jobTitle);
            $sql.="AND (INFOMATION.TITLE LIKE '%$jobTitle%') ";
        }
        
        if(isset($companyName)){
            $companyName = mysqli_real_escape_string($this->conn, $companyName);
            $sql.="AND (INFOMATION.COMPANY LIKE '%$companyName%') ";
        }
        
        if ($this->connectSucessDataBase) {

            $arrayResults = array();
            $userInfo = $this->GetTypeOfUser($token);
            $userCredit = $userInfo['CREDIT'];
            if ($userInfo === -1 && $page > 19) {
                echo -1;
            } else {

                $arrayCredit = array();
                if ($userCredit !== -1 && $userCredit !== null) {
                    $arrayCredit = $this->userInfo->GetArrayCredit($userInfo['ID'],NULL);
                }
                if ($resultOnPage === '' ) {
                    $resultOnPage = 25;
                }
                $offset = $page * $resultOnPage;
                if($offset<0)
                    $offset = 0;
                $sql .= " ORDER BY INFOMATION.ID LIMIT $offset, $resultOnPage";
                
                //echo $sql;
                
                $resultss = $this->conn->query($sql);
                while ($row = $resultss->fetch_assoc()) {
                    if (!in_array($row['ID'], $arrayCredit)) {
                        $row['PHONE'] = 'xxxxxxxxxxx';
                        $row['EMAIL'] = 'xxxxxxxxxxx';
                    }
                    array_push($arrayResults, $row);
                }
                header('Content-type: application/json');
                echo json_encode($arrayResults);
            }
        } else {
            echo 'not connect';
        }
    }

    function getSqlStringPart($arrayInfo) {
        $query_parts = array();
        foreach ($arrayInfo as $val) {
            $query_parts[] = "'" . mysqli_real_escape_string($this->conn,$val) . "'";
        }
        $sqlPartSize = "(" . implode(",", $query_parts) . ")";
        return $sqlPartSize;
    }

    function getSqlStringLikePart($arrayInfo, $paddingString) {
        $query_parts = array();
        foreach ($arrayInfo as $val) {
            $query_parts[] = "'%" . mysqli_real_escape_string($this->conn,$val) . "%'";
        }
        $sqlPartSize = implode(" OR $paddingString LIKE ", $query_parts);
        return $sqlPartSize;
    }

    function GetCompanyInfomation($name) {
        if ($this->connectSucessDataBase) {
            $arrayResults = array();
            $name = $name;
            $sql = "SELECT * FROM COMPANYINFOMATION WHERE NAME = '$name'";
            $results = $this->conn->query($sql);
            while ($row = $results->fetch_assoc()) {
                /* @var $arrayResults type */
                array_push($arrayResults, $row);
            }
            echo json_encode($arrayResults);
        }
    }
    
    function GetContactInfomation($token, $id) {
        
        if ($this->connectSucessDataBase) {

            $sql = "SELECT * FROM INFOMATION , COMPANYINFOMATION "
                    . "WHERE INFOMATION.COMPANY = COMPANYINFOMATION.NAME AND ID = '$id'";
            $arrayResults = array();
            $userInfo = $this->GetTypeOfUser($token);
            $userCredit = $userInfo['CREDIT'];
            if ($userCredit === -1) {
                echo $userCredit;
            } else {

                $arrayCredit = array();
                /* @var $userCredit type */
                if ($userCredit !== null) {
                    $arrayCredit = $this->userInfo->GetArrayCredit($userInfo['ID'],NULL);
                }
                
                $resultss = $this->conn->query($sql);
                while ($row = $resultss->fetch_assoc()) {
                    if (!in_array($row['ID'], $arrayCredit)) {
                        $row['PHONE'] = 'xxxxxxxxxxx';
                        $row['EMAIL'] = 'xxxxxxxxxxx';
                    }
                    array_push($arrayResults, $row);
                }
                header('Content-type: application/json');
                echo json_encode($arrayResults);
            }
        } else {
            echo 'not connect';
        }
    }
    
    function checkUserExit($id, $password, $username, $token) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT ID FROM USER WHERE ID = '$id'";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) >= 1) {
                return FALSE;
            } else {
                $today = date("d:m:y");
                if ($this->conn->query("INSERT INTO USER (ID, PASSWORD, NAME, CREDIT, TOKEN, ACTIVITY, PLAN, DATE) VALUES ('$id', '$password', '$username', '10', '$token', '$token','10 credit (free member)','not yet!');") === TRUE) {
                    return TRUE;
                } else {
                    //echo $this->conn->error;
                    return FALSE;
                }
            }
        }
    }

    function getCVSFile($token, $folder, $page) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT ID FROM USER WHERE TOKEN = '$token'";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) >= 1) {
                $arrayID = $this->userInfo->GetArrayCredit($results->fetch_assoc()['ID'],$folder);
                $listID = $this->getSqlStringPart($arrayID);
                $sql = "SELECT * FROM INFOMATION , COMPANYINFOMATION "
                        . "WHERE INFOMATION.COMPANY = COMPANYINFOMATION.NAME AND (INFOMATION.ID IN $listID) ";
                if($page>=0){
                    $offSet = 25*$page;
                    $sql.="LIMIT $offSet,25";
                }
                $arrayResults = array();
                //echo $sql;
                $resultss = $this->conn->query($sql);
                if (mysqli_num_rows($resultss) >= 1) {
                    /* @var $row type */
                    while ($row = $resultss->fetch_assoc()) {
                        array_push($arrayResults, $row);
                    }
                }
                header('Content-type: application/json');
                echo json_encode($arrayResults);
            } else {
                echo -1;
            }
        }
    }
    
    function getFolder($token) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT ID FROM USER WHERE TOKEN = '$token'";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) >= 1) {
                $resultss = $this->userInfo->GetFolderInfo($results->fetch_assoc()['ID']);
                if (count($resultss) >= 1) {                    
                    header('Content-type: application/json');
                    echo json_encode($resultss);
                }
                else echo -1;
            } else {
                echo -1;
            }
        }
    }
    
    function addCredit($userID, $credit){
        if ($this->connectSucessDataBase && $credit !== '') {
            $plan = '1000 credit (sliver)';
            $money = 1000;
            $today = date("d:m:y");
            if(strpos($credit, "399") !== false){
                $plan = '10000 credit (gold)';
                $money = 10000;
            }
            else if(strpos($credit, "199") !== false){
                $plan = '4500 credit (platinum)';
                $money = 4500;
            }
            else if(strpos($credit, "99") !== false){
                $plan = '2000 credit (diamond)';
                $money = 2000;
            }
            $sql = "UPDATE USER SET CREDIT = '$money', PLAN = '$plan', DATE = '$today' WHERE ID = '$userID'";
            if ($this->conn->query($sql) === TRUE) {                
                $emailnanager = new emailManager();
                return $emailnanager->sendEmail($userID, NULL, $money);
            } else {
                //return $this->conn->error;
                return FALSE;
            }
        }
    }

    function GetTypeOfUser($token) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT ID,CREDIT FROM USER WHERE TOKEN = '$token'";
            $results = $this->conn->query($sql);
            if (mysqli_num_rows($results) == 1) {
                $row = $results->fetch_assoc();
                //return $this->userType[$row['PLAN']];
                return $row;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }

    function GetMaxResults($sizeParameter, $industriesParameter, $revenueParameter, $location_code,$locationParameter,
            $levelParameter, $departmentParameter, $resultOnPage, $searchName, $jobTitle, $companyName) {
        $sql = "SELECT COUNT(*) AS COUNT FROM INFOMATION , COMPANYINFOMATION "
                . "WHERE INFOMATION.COMPANY = COMPANYINFOMATION.NAME ";
        if (isset($sizeParameter)) {
            $sizePart = $this->getSqlStringPart($sizeParameter);
            if ($sizePart != '') {
                $sql .= "AND (COMPANYINFOMATION.SIZE IN $sizePart) ";
            }
        }

        if (isset($industriesParameter)) {
            $industryPart = $this->getSqlStringLikePart($industriesParameter, "COMPANYINFOMATION.INDUSTRIES");
            if ($industryPart != '') {
                $sql .= "AND (COMPANYINFOMATION.INDUSTRIES LIKE {$industryPart}) ";
            }
        }
        if (isset($revenueParameter)) {
            $revenuePart = $this->getSqlStringPart($revenueParameter);
            if ($revenuePart != '') {
                $sql .= "AND (COMPANYINFOMATION.REVENUE IN $revenuePart) ";
            }
        }
        if (isset($location_code)) {
            $location_code = mysqli_real_escape_string($this->conn, $location_code);
            $sql .= "AND (COMPANYINFOMATION.ZIP LIKE '%$location_code%' OR INFOMATION.PROFILECITY LIKE '%$location_code%' OR INFOMATION.PROFILESTATE LIKE '%$location_code%' OR INFOMATION.PROFILECOUNTRY LIKE '%$location_code%') ";
        }
        
        if(isset($locationParameter)){
            $sql .= "AND ( ";
            $first = 0;
            foreach($locationParameter as $contryArray){
                if ($first > 0) {
                    $sql.="OR ";
                }
                if(is_array($contryArray)){
                    $sql .= "(COMPANYINFOMATION.COUNTRY = '".array_shift($contryArray)."' ";
                    $locationPart = $this->getSqlStringPart($contryArray, "COMPANYINFOMATION.STATE");
                    $sql .= "AND COMPANYINFOMATION.STATE IN $locationPart) ";
                }else {
                    $contryArray = mysqli_real_escape_string($this->conn, $contryArray);
                    $sql .= "COMPANYINFOMATION.COUNTRY = '$contryArray' ";
                }
                $first++;
            }
            $sql.=") ";
        }
        
        if (isset($levelParameter)) {
            $levelPart = $this->getSqlStringPart($levelParameter);
            if ($levelPart != '') {
                $sql .= "AND (INFOMATION.JOBTITLE IN $levelPart) ";
            }
        }
        
        if (isset($departmentParameter)) {
            $departmentPart = $this->getSqlStringPart($departmentParameter);
            if ($departmentPart != '') {
                $sql .= "AND (INFOMATION.DEPARTMENT IN $departmentPart) ";
            }
        }
        
        if(isset($searchName)){
            $searchName = mysqli_real_escape_string($this->conn, $searchName);
            $sql.="AND (INFOMATION.FIRSTNAME LIKE '%$searchName%' OR INFOMATION.LASTNAME LIKE '%$searchName%') ";
        }
        
        if(isset($jobTitle)){
            $jobTitle = mysqli_real_escape_string($this->conn, $jobTitle);
            $sql.="AND (INFOMATION.TITLE LIKE '%$jobTitle%') ";
        }
        
        if(isset($companyName)){
            $companyName = mysqli_real_escape_string($this->conn, $companyName);
            $sql.="AND (INFOMATION.COMPANY LIKE '%$companyName%') ";
        }
        if ($resultOnPage === '' ) {
            $resultOnPage = 25;
        }
        //echo $sql;
        
        if ($this->connectSucessDataBase) {            
            $results = $this->conn->query($sql);
            $total = $results->fetch_assoc()['COUNT'];
            //$total = mysqli_num_rows($results);
            $arrayResult = array();
            $arrayResult['total'] = $total;
            $arrayResult['pages'] = floor($total / $resultOnPage);
            header('Content-type: application/json');
            echo json_encode($arrayResult);
            //echo floor(mysqli_num_rows($results) / $this->numberResultPerPage);
            //echo $sql;
        }
    }
    
    function updateContact($id, $firstName, $lastName, $jobTitle, $email, $userEmail){
        if ($this->connectSucessDataBase) {
            $userEmail .= (' at '.date('Y/m/d H:i:s'));
            $sql = "INSERT INTO CONTACTUPDATE (EMAILUSER, ID, FIRSTNAME, LASTNAME, TITLE, EMAIL) VALUES ('$userEmail', '$id', '$firstName', '$lastName', '$jobTitle', '$email')";
            if ($this->conn->query($sql) === TRUE) {
                //readfile($this->rootUrl . "mysite/demo_project/app/thankforyourupdate.html");
                //echo ($this->rootUrl . "mysite/demo_project/app/thankforyourupdate.html");
                //echo "<script>window.location.href = '" . $this->rootUrl . "mysite/demo_project/app/thankforyourupdate.html'";
                header("Location: ".$this->rootUrl . "mysite/demo_project/app/thankforyourupdate.html");
            } else {
                echo "__".$this->conn->error;
                //echo 0;
            }
        }
    }
    
    function updateCompany($userEmail, $companyId, $companyName, $companyWebsite, $companyCountry, $companyPhone,
            $companyAddress, $companyCity, $companyState, $companyZip, $companyIndustry, $companySizeUpdate, $companyRevenueUpdate){
        if ($this->connectSucessDataBase) {
            $userEmail .= (' at '.date('Y/m/d H:i:s'));
            $sql = "INSERT INTO COMPANYUPDATE (EMAILUSER, OLDNAME, NAME, PHONE, ADDRESS, CITY, STATE, ZIP, COUNTRY, URL, SIZE, REVENUE, OWNERSHIP, INDUSTRIES) VALUES "
                    . "('$userEmail', '$companyId', '$companyName', '$companyPhone', '$companyAddress', '$companyCity',"
                    . "'$companyState', '$companyZip', '$companyCountry', '$companyWebsite', '$companySizeUpdate', '$companyRevenueUpdate',"
                    . "'','$companyIndustry')";
            if ($this->conn->query($sql) === TRUE) {
                header("Location: ".$this->rootUrl . "mysite/demo_project/app/thankforyourupdate.html");
            } else {
                echo "__".$this->conn->error;
                //echo 0;
            }
        }
    }

    function Delete() {
        $this->conn->close();
    }

    function GetCredit($TOKEN) {
        if ($this->connectSucessDataBase) {
            $sql = "SELECT ID,CREDIT FROM USER WHERE TOKEN = '$TOKEN'";
            $results = $this->conn->query($sql);
            if ($results) {
                $userInfo = $results->fetch_assoc();
                /* @var $credit type */
                if ($userInfo['CREDIT'] > 0) {
                    return $userInfo;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    function UpdateCredit($count, $id) {
        if ($this->connectSucessDataBase) {
            $id = mysqli_real_escape_string($this->conn, $id);
            $sql = "UPDATE USER SET CREDIT = CREDIT - $count WHERE ID = '$id'";
            if ($this->conn->query($sql) === TRUE) {
                return TRUE;
            } else {
                //return $this->conn->error;
                return FALSE;
            }
        }
    }

}

?>