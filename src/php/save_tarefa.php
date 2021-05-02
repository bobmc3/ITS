<?php

require_once ('connection.php');

$arrTarefa = $_POST['tarefa'];

 $query = $conn->prepare(
    'INSERT tarefas (data, projeto, cliente, tarefa, tempo, info) 
    VALUES (:data, :projeto, :cliente, :tarefa, :tempo, :info);');

$query->bindParam(':data', $arrTarefa['trf_dat'], PDO::PARAM_STR);
$query->bindParam(':projeto', $arrTarefa['trf_proj'], PDO::PARAM_STR);
$query->bindParam(':cliente', $arrTarefa['trf_cli'], PDO::PARAM_STR);
$query->bindParam(':tarefa', $arrTarefa['trf_taref'], PDO::PARAM_STR);
$query->bindParam(':tempo', $arrTarefa['trf_temp'], PDO::PARAM_STR);
$query->bindParam(':info', $arrTarefa['trf_inf'], PDO::PARAM_STR);

$query->execute ();


echo json_encode(true);


?>