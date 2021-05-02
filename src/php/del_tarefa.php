<?php

require_once ('connection.php');

$rowId = $_GET['id'];

$queryString = "DELETE FROM tarefas WHERE id = ?;";


$query = $conn->prepare($queryString);


$query->execute ([$rowId]);



?>