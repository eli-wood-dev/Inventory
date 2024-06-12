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
    


    if(!empty($item)){
        $newData = $input;

        $newData["last_modified"] = date("Y-m-d");

        foreach($item as $key=>$value){
            if($newData[$key] == null){
                $newData[$key] = $value;
            }
        }

        unset($newData["id"]);

        // file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);
        
        $request = $pdo->prepare("UPDATE items SET s_id=?, c_id=?, name=?, notes=?, quantity=?, unit=?, available=?, image=?, created=?, last_modified=?, value=? WHERE id=?");
        $request->execute([$newData["s_id"], $newData["c_id"], $newData["name"], $newData["notes"], preg_replace("/[^0-9.]/", "", $newData["quantity"]), $newData["unit"], $newData["available"], $newData["image"], $newData["created"], $newData["last_modified"], preg_replace("/[^0-9.]/", "", $newData["value"]), $id]);

        // file_put_contents("test.json", json_encode($newData, JSON_PRETTY_PRINT), LOCK_EX);

        echo json_encode(["success"=>"updated"]);
    } else {
        $error = ["message" => "Item not found", "code" => 500];
        http_response_code($error['code']);

        echo json_encode($error);
    }
} catch(Exception $e){
    $error = ["message" => $e->getMessage(), "code" => 500];
    http_response_code($error['code']);

    echo json_encode($error);
}
