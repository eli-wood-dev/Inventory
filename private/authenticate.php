<?php
try{
    session_start();
    require("pdo_conn.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $uid = $input["uid"];
    $toSend = ["uid"=>$uid];

    if(empty($_SESSION["uid"]) || $uid != $_SESSION["uid"]){
        $error = ["message" => "invalid uid", "code" => 401];
        http_response_code($error['code']);

        echo json_encode($error);
        exit();//maybe just do exit 401
    }

    file_put_contents('uids.txt', $uid . PHP_EOL , FILE_APPEND | LOCK_EX);

    echo json_encode($toSend);

} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}