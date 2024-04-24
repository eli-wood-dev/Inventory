<?php
    $host = "localhost";
    $user = "root";
    $password = "";
    $dbname = "overwatch";

    $dsn = "mysql:host=" . $host . ";dbname=" . $dbname;

    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $json = trim(file_get_contents("php://input"));
    $input = json_decode($json);

    $amountPerPage = $input->amountPerPage;
    $offset = ($input->pageNumber - 1) * $amountPerPage;

    $request = $pdo->prepare("SELECT * FROM hero ORDER BY name LIMIT :start, :rows");
    $request->bindParam(':start', $offset, PDO::PARAM_INT);
    $request->bindParam(':rows', $amountPerPage, PDO::PARAM_INT);
    $request->execute();
    $response = $request->fetchAll();

    echo json_encode($response);
    //echo json_encode($input);
?>