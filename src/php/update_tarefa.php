<?php

require_once ('connection.php');

$arrTarefa = $_POST['tarefa'];

 $query = $conn->prepare(
   'UPDATE tarefas SET 
        data = :data,
        projeto = :projeto,
        cliente = :cliente,
        tarefa = :tarefa,
        tempo = :tempo,
        info = :info
        WHERE id = :id;');

$query->bindParam(':data', $arrTarefa['trf_dat'], PDO::PARAM_STR);
$query->bindParam(':projeto', $arrTarefa['trf_proj'], PDO::PARAM_STR);
$query->bindParam(':cliente', $arrTarefa['trf_cli'], PDO::PARAM_STR);
$query->bindParam(':tarefa', $arrTarefa['trf_taref'], PDO::PARAM_STR);
$query->bindParam(':tempo', $arrTarefa['trf_temp'], PDO::PARAM_STR);
$query->bindParam(':info', $arrTarefa['trf_inf'], PDO::PARAM_STR);
$query->bindParam(':id', $arrTarefa['trf_id'], PDO::PARAM_INT);



$query->execute ();


echo json_encode(true);


?>