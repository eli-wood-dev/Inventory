<?php
try{
    session_start();
    require("pdo_conn.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $email = $input["email"];
    $password = $input["password"];
    $name = $input["name"];

    $request = $pdo->prepare("SELECT * FROM users WHERE email=? LIMIT 1");
    $request->execute([$email]);
    $response = $request->fetch();

    if(!empty($response)){
        $error = ["message" => "UNAUTHORIZED", "code" => 401];
        http_response_code($error['code']);

        echo $error["message"];
        exit;
    }

    $request = $pdo->prepare("INSERT INTO users (email, password, name) VALUES(?, ?, ?)");
    $request->execute([$email, $password, $name]);
    $id = $pdo->lastInsertId();

    if(empty($id)){
        $error = ["message" => "USER NOT CREATED", "code" => 500];
        http_response_code($error['code']);

        echo $error["message"];
        exit;
    }

    //hash the user id and current timestamp for a unique session id
    $uid = sha1($id . date("h:i:sa"));
    $_SESSION["uid"] = $uid;

    $toSend["uid"] = $uid;

    echo json_encode($toSend);

} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo $error["message"];
}