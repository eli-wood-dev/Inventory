<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sample_inventory";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);

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

$desired = "name, id, COUNT(*) AS count";//this will be hardcoded

$request = $pdo->prepare("SELECT ? FROM items ORDER BY name LIMIT :start, :rows");
$request->bindParam(':start', $offset, PDO::PARAM_INT);
$request->bindParam(':rows', $amountPerPage, PDO::PARAM_INT);
$request->execute([$desired]);
$response = $request->fetchAll();

if(isset($response)){
    $newData["maxPageNumber"] = ceil($response["count"]/$amountPerPage);
    $newData["items"] = $response;
    // file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

    echo json_encode($newData);
    //echo json_encode($input);
} else{
    echo json_encode(["error"=>"items not found"]);
}


