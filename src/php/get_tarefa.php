<?php

require_once ('connection.php');

$consulta = $conn->prepare(
    'SELECT 
        a.id AS trf_id,
        a.data AS trf_dat,
        a.projeto AS trf_proj,
        a.cliente AS trf_cli,
        a.tarefa AS trf_taref,
        a.tempo AS trf_temp,
        a.info AS trf_inf
    FROM 
    tarefas a;');

$consulta->execute ();

$result = $consulta->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>