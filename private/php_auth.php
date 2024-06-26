<?php
session_start();

/**
 * @param string the uid of the user being authenticated
 * @param int the role level required for the user to do the action (higher $role means higher access level required)
 */
function validate($uid, $role){
    if(empty($uid) || empty($_SESSION["uid"]) || $uid != $_SESSION["uid"]){
        $error = ["message" => "UNAUTHORIZED", "code" => 401];
        http_response_code($error["code"]);

        echo $error["message"];
        exit;
    }

    if(!isset($role) || empty($_SESSION["role"]) || $role > $_SESSION["role"] || empty($_SESSION["c_id"])){//? empty is stupid
        $error = ["message" => "FORBIDDEN", "code" => 403];
        http_response_code($error["code"]);

        echo $error["message"];
        exit;
    }
}

/**
 * @param int the customer id to check if it is equal to the customer id of the user
 */
function validateCompany($c_id){
    if(!isset($c_id) || empty($_SESSION["c_id"]) || $c_id != $_SESSION["c_id"]){
        $error = ["message" => "FORBIDDEN", "code" => 403];
        http_response_code($error["code"]);

        echo $error["message"];
        exit;
    }
}