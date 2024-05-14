<?php
require("pdo_conn.php");

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

$request = $pdo->prepare("SELECT *, (SELECT COUNT(*) FROM items) AS count FROM items ORDER BY name LIMIT :start, :rows");
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


