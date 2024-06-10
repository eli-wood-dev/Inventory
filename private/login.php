<?php
try{
    session_start();
    require("pdo_conn.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $email = $input["email"];
    $password = $input["password"];//? should be hashed on front end. maybe hash on backend too?

    $request = $pdo->prepare("SELECT * FROM users WHERE email=? AND password=? LIMIT 1");
    $request->execute([$email, $password]);
    $response = $request->fetch();

    if(empty($response)){
        $error = ["message" => "user not found", "code" => 401];
        // http_response_code($error['code']);

        echo json_encode($error);
        exit();//? maybe just do exit 401
    }

    //hash the user id and current timestamp for a unique session id
    $uid = sha1($response["id"] . date("h:i:sa"));
    $_SESSION["uid"] = $uid;

    echo json_encode(["uid"=>$uid]);

} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}