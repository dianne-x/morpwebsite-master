<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$duration = $data['duration'];

$timeoutUntil = date('Y-m-d H:i:s', strtotime("+$duration minutes"));

$sql = "UPDATE users SET timeout_until = ? WHERE uid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $timeoutUntil, $userId);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>