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

$amountPerPage = $input["amountPerPage"]??10;
if($amountPerPage <= 0){
    $amountPerPage = 10;
}
$offset = (($input["pageNumber"]??1) - 1) * $amountPerPage;
if($offset < 0){
    $offset = 0;
}

$request = $pdo->prepare("SELECT COUNT(*) AS count FROM hero");
$request->execute();
$response = $request->fetch();

$newData["maxPageNumber"] = ceil($response->count/$amountPerPage);
if($newData["maxPageNumber"] < $input["pageNumber"]){
    $offset = ($newData["maxPageNumber"] - 1) * $amountPerPage;
}

$request = $pdo->prepare("SELECT * FROM hero ORDER BY name LIMIT :start, :rows");
$request->bindParam(':start', $offset, PDO::PARAM_INT);
$request->bindParam(':rows', $amountPerPage, PDO::PARAM_INT);
$request->execute();
$response = $request->fetchAll();

$newData["items"] = $response;
// file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

echo json_encode($newData);
//echo json_encode($input);
