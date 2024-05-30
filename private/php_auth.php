<?php
session_start();

function validate($uid){
    if(empty($uid) || empty($_SESSION["uid"]) || $uid != $_SESSION["uid"]){
        $error = ["message" => "invalid uid", "code" => 401];

        echo json_encode($error);
        exit;
    }
}