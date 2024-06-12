<?php
try{
    session_start();
    require("pdo_conn.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $email = $input["email"];
    $password = $input["password"];

    $request = $pdo->prepare("SELECT * FROM users WHERE email=? AND password=? AND role=? LIMIT 1");
    $request->execute([$email, $password, 5]);//! 5 is a test number, it should be changed later
    $response = $request->fetch();

    if(empty($response)){
        $error = ["message" => "UNAUTHORIZED", "code" => 401];
        http_response_code($error['code']);

        echo $error["message"];
        exit;
    }

    //hash the user id and current timestamp for a unique session id
    $uid = sha1($response["id"] . date("h:i:sa"));
    $_SESSION["uid"] = $uid;
    $_SESSION["role"] = $response["role"];

    echo json_encode(["uid"=>$uid]);

} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo $error["message"];
}