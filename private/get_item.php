<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "overwatch";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

$id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

if($id < 1){
    $id = 1;
}

$request = $pdo->prepare("SELECT * FROM hero WHERE id = ? LIMIT 1");
$request->execute([$id]);
$response = $request->fetch();



// file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode($response);
//echo json_encode($input);
