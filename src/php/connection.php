<?php

$host = 'localhost';
$dbname = 'its';
$user = 'root';
$pass = '';


$conn = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $pass);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn->setAttribute(PDO::ATTR_PERSISTENT, false);

?>