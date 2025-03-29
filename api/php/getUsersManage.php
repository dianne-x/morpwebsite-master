<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$sql = "SELECT uid AS id, name, isBanned FROM users";
$result = $conn->query($sql);

$response = [];
if ($result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $response['success'] = true;
    $response['users'] = $users;
} else {
    $response['success'] = false;
    $response['error'] = 'No users found.';
}

echo json_encode($response);

$conn->close();
?>