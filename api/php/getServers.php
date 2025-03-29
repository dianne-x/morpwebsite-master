<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$sql = "SELECT id, name FROM servers";
$result = $conn->query($sql);

$servers = [];
while ($row = $result->fetch_assoc()) {
    $servers[] = $row;
}

echo json_encode($servers);

$conn->close();
?>