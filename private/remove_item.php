<?php
try{
    require("pdo_conn.php");
    require("php_auth.php");

    $reqRole = 3; //! set required role value

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json, true);

    $uid = $input["uid"];
    validate($uid, $reqRole);

    $id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

    $request = $pdo->prepare("SELECT * FROM items WHERE id=?");//probably a better way of doing this
    $request->execute([$id]);
    $item = $request->fetch();

    file_put_contents("test.json", json_encode($item, JSON_PRETTY_PRINT), LOCK_EX);

    if(!empty($item)){
        $request = $pdo->prepare("DELETE FROM items WHERE id=?");//in future check if user has access to remove
        $request->execute([$id]);
        echo json_encode(["success"=>"removed"]);
    } else{
        $error = ["message" => "Item not found", "code" => 500];
        http_response_code($error['code']);

        echo json_encode($error);
    }
} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}