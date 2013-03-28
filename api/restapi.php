<?php
define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', dirname(__FILE__) . DS);
require_once(WWW_ROOT . 'Slim' . DIRECTORY_SEPARATOR . 'Slim.php');
require_once WWW_ROOT . 'classes' . DS . 'Config.php';
require_once WWW_ROOT . 'classes' . DS . 'DatabasePDO.php';
require_once WWW_ROOT . 'dao' . DS . 'AttractionsDAO.php';
// DAO's

// <!-- API
$api = new Slim();

$api->get('/attractions', function(){

    $request = Slim::getInstance()->request();
    $dao = new AttractionsDAO();
    $result = $dao->getAttractionsList();
    echo json_encode($result);

});
// detail
$api->get('/attractions/detail/:id', function($id){

    $dao = new AttractionsDAO();
    $result = $dao->getDetailsById($id);
    echo json_encode($result);

});

//coordinaten
$api->get('/attractions/coordinates', function(){

    $dao = new AttractionsDAO();
    $result = $dao->getAllCoordinates();
    echo json_encode($result);

});

$api->get('/test', function(){
    echo "hello world";
});

$api->run();
// /API -->
