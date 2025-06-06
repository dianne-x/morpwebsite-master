<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];

$sql = "UPDATE users SET isBanned = 0 WHERE uid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userId);

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