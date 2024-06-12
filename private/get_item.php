<?php
try{
    require("pdo_conn.php");
    require("php_auth.php");

    $reqRole = 1; //! set required role value

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $uid = $input["uid"];
    validate($uid, $reqRole);
    
    $id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);
    
    // SELECT i.*, c.name AS c_name, s.address, l.name AS l_name FROM items AS i JOIN customers AS c ON i.c_id=c.id JOIN shelves AS s ON i.s_id=s.id JOIN locations as l ON s.l_id=l.id*

    $request = $pdo->prepare("SELECT * FROM items WHERE id = ? AND c_id = ? LIMIT 1");
    $request->execute([$id, $_SESSION["c_id"]]);
    $response = $request->fetch();

    // file_put_contents("test.json", json_encode($response, JSON_PRETTY_PRINT), LOCK_EX);
    
    if(isset($response)){
        echo json_encode($response);
    } else{
        $error = ["message" => "Item not found", "code" => 500];
        http_response_code($error['code']);
    
        echo json_encode($error);
    }
    
    //echo json_encode($input);
    
} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}