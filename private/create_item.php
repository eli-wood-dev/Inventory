<?php
try{
    require("pdo_conn.php");
    require("php_auth.php");

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $uid = $input["uid"];
    validate($uid);

    if(!empty($input)){
        $input["created"] = date("Y-m-d");
        $input["last_modified"] = date("Y-m-d");

        $request = $pdo->prepare("INSERT INTO items (s_id, c_id, name, notes, quantity, unit, available, image, created, last_modified, value) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $request->execute([$input["s_id"], $input["c_id"], $input["name"], $input["notes"], preg_replace("/[^0-9.]/", "", $input["quantity"]), $input["unit"], $input["available"], $input["image"], $input["created"], $input["last_modified"], preg_replace("/[^0-9.]/", "", $input["value"])]);

        $input["id"] = $pdo->lastInsertId();

        echo json_encode($input);
    } else {
        $error = ["message" => "Input not recieved", "code" => 500];
        http_response_code($error['code']);

        echo json_encode($error);
    }
} catch(PDOException $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}