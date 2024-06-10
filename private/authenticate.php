<?php
try{
    require("php_auth.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $uid = $input["uid"];
    $toSend = ["uid"=>$uid];

    validate($uid);

    // file_put_contents('uids.txt', $uid . PHP_EOL , FILE_APPEND | LOCK_EX);

    echo json_encode($toSend);

} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}