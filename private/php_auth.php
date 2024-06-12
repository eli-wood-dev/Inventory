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

    if(empty($role) || empty($_SESSION["role"]) || $role > $_SESSION["role"]){
        $error = ["message" => "FORBIDDEN", "code" => 403];
        http_response_code($error["code"]);

        echo $error["message"];
        exit;
    }
}