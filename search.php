<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$locationParameter = filter_input(INPUT_POST, 'locationParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$levelParameter = filter_input(INPUT_POST, 'levelParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$departmentParameter = filter_input(INPUT_POST, 'departmentParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$sizeParameter = filter_input(INPUT_POST, 'sizeParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$industriesParameter = filter_input(INPUT_POST, 'industriesParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$revenueParameter = filter_input(INPUT_POST, 'revenueParameter', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$location_code = filter_input(INPUT_POST, 'location_code');
$resultOnPage = filter_input(INPUT_POST, 'resultOnPage');
$searchName = filter_input(INPUT_POST, 'searchName');
$jobTitle = filter_input(INPUT_POST, 'jobTitle');
$companyName = filter_input(INPUT_POST, 'companyName');
$token = filter_input(INPUT_POST, 'token');
$page = filter_input(INPUT_POST, 'page');
$getMax = filter_input(INPUT_POST, 'getmax');

include './DBManager.php';
$dataBaseManager = new DBManager();
$dataBaseManager->Connect();
if ($dataBaseManager->connectSucessDataBase) {
    if (isset($getMax)) {
        $dataBaseManager->GetMaxResults($sizeParameter, $industriesParameter, $revenueParameter, $location_code,
                $locationParameter, $levelParameter, $departmentParameter, $resultOnPage, $searchName, $jobTitle, $companyName);
    } else {
        if (!isset($page)) {
            $page = 0;
        }
        $dataBaseManager->search($sizeParameter, $industriesParameter, $revenueParameter, $location_code, $page, $token, 
                $locationParameter, $levelParameter, $departmentParameter, $resultOnPage, $searchName, $jobTitle, $companyName);
    }
} else {
    echo -1;
}
?>
