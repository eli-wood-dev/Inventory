<?php
require("pdo_conn.php");

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

if(!empty($input)){
    $input["created"] = date("Y-m-d");
    $input["last_modified"] = date("Y-m-d");

    $request = $pdo->prepare("INSERT INTO items (s_id, c_id, name, notes, quantity, unit, available, image, created, last_modified, value) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $request->execute([$input["s_id"], $input["c_id"], $input["name"], $input["notes"], $input["quantity"], $input["unit"], $input["available"], $input["image"], $input["created"], $input["last_modified"], $input["value"]]);
    echo json_encode($input);
} else {
    echo json_encode(["error"=>"input not recieved"]);
}