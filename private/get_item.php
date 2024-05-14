<?php
require("pdo_conn.php");

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

$id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

$request = $pdo->prepare("SELECT i.id, i.c_id, i.s_id, i.name, c.name AS c_name, s.address, l.name AS l_name FROM items AS i JOIN customers AS c ON i.c_id=c.id JOIN shelves AS s ON i.s_id=s.id JOIN Locations as l ON s.l_id=l.id WHERE i.id = ? LIMIT 1");
$request->execute([$id]);
$response = $request->fetch();

// file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

if(isset($response)){
    echo json_encode($response);
} else{
    echo json_encode(["error"=>"item not found"]);
}

//echo json_encode($input);
