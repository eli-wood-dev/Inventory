<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sample_inventory";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

$id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

$request = $pdo->prepare("SELECT MAX(id) AS max, MIN(id) as min FROM items");
$request->execute();
$response = $request->fetch();

if($id < $response->min){
    $id = $response->min;
}
if($id > $response->max){
    $id = $response->max;
}

$request = $pdo->prepare("SELECT i.id, i.c_id, i.s_id, i.name, c.name AS c_name, s.address, l.name AS l_name FROM items AS i JOIN customers AS c ON i.c_id=c.id JOIN shelves AS s ON i.s_id=s.id JOIN Locations as l ON s.l_id=l.id WHERE i.id = ? LIMIT 1");
$request->execute([$id]);
$response = $request->fetch();

// file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode($response);
//echo json_encode($input);
