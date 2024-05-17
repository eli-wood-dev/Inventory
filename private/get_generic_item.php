<?php 
require("pdo_conn.php");

$request = $pdo->prepare("SELECT i.*, c.name AS c_name, s.address, l.name AS l_name FROM items AS i JOIN customers AS c ON i.c_id=c.id JOIN shelves AS s ON i.s_id=s.id JOIN locations as l ON s.l_id=l.id LIMIT 1");
$request->execute();
$response = $request->fetch();
foreach ($response as $key => $value) {
    $response[$key] = null;
}

unset($response["id"]);

echo json_encode($response);

