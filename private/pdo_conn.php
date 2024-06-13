<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "inventory";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//disable strict mode
$request = $pdo->prepare("SET sql_mode = 'NO_ENGINE_SUBSTITUTION,NO_AUTO_CREATE_USER';");
$request->execute();