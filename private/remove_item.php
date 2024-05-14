<?php
require("pdo_conn.php");

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

//ensure checking is doen on front end

$id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

$request = $pdo->prepare("SELECT * FROM items WHERE id=?");//probably a better way of doing this
$request->execute([$id]);
$item = $request->fetch();

if(!empty($item)){
    $request = $pdo->prepare("DELETE FROM items WHERE id=?");//in future check if user has access to remove
    $request->execute([$id]);
    echo json_encode(["success"=>"removed"]);
} else{
    echo json_encode(["error"=>"item not found"]);
}

