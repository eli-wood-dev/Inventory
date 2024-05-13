<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sample_inventory";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);

$json = trim(file_get_contents("php://input"));
$input = json_decode($json, true);

$id = filter_var($input["id"], FILTER_SANITIZE_NUMBER_INT);

$request = $pdo->prepare("SELECT * FROM items WHERE id=?");//probably a better way of doing this
$request->execute([$id]);
$item = $request->fetch();

if(!empty($item)){
    $newData = $input["newData"];

    unset($newData["id"]);

    $request = $pdo->prepare("UPDATE items SET s_id=?, c_id=?, name=?, notes=?, quantity=?, unit=?, available=?, image=?, created=?, last_modified=?, value=? WHERE id=?");//last modified should be set here
    $request->execute([$newData["s_id"], $newData["c_id"], $newData["name"], $newData["notes"], $newData["quantity"], $newData["unit"], $newData["image"], $newData["created"], date("Y-m-d"), $newData["value"], $id]);

    echo json_encode($item);//old item - front end should *not* update with this info
} else {
    echo json_encode(["error"=>"item not found"]);
}
