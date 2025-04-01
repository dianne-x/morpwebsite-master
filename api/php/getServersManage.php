<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$sql = "SELECT id, server_name FROM servers";
$result = $conn->query($sql);

$response = [];
if ($result->num_rows > 0) {
    $servers = [];
    while ($row = $result->fetch_assoc()) {
        $servers[] = $row;
    }
    $response['success'] = true;
    $response['servers'] = $servers;
} else {
    $response['success'] = false;
    $response['error'] = 'No servers found.';
}

echo json_encode($response);

$conn->close();
?>