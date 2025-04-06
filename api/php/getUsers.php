<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']);
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$sql = "SELECT uid AS id, name, isBanned FROM users";
$result = $conn->query($sql);

$users = [];
while ($row = $result->fetch_assoc()) {
    // Ensure `isBanned` is returned as a boolean
    $row['isBanned'] = (bool)$row['isBanned'];
    $users[] = $row;
}

echo json_encode($users);

$conn->close();
?>