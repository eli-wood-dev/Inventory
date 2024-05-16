<?php
try{
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
    
    $request = $pdo->prepare("SELECT COUNT(*) AS count FROM items");
    $request->execute();
    $count = $request->fetch()["count"];
    
    $request = $pdo->prepare("SELECT * FROM items ORDER BY name LIMIT :start, :rows");
    $request->bindParam(':start', $offset, PDO::PARAM_INT);
    $request->bindParam(':rows', $amountPerPage, PDO::PARAM_INT);
    $request->execute();
    $response = $request->fetchAll();
    
    if(!empty($response)){
        // file_put_contents("test.json", json_encode($response, JSON_PRETTY_PRINT), LOCK_EX);
        $newData["maxPageNumber"] = ceil($count/$amountPerPage);
        $newData["items"] = $response;
        // file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);
    
        echo json_encode($newData);
        //echo json_encode($input);
    } else{
        $error = ["message" => "Items not found", "code" => 500];
        http_response_code($error['code']);
    
        echo json_encode($error);
    }
} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => $e->getCode()];
    http_response_code($error['code']);

    echo json_encode($error);
}
