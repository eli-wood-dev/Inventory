<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sample_inventory";

$dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

$pdo = new PDO($dsn, $user, $password);