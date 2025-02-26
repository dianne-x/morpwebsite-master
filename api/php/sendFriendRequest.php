<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

// Debugging: Check if the JSON payload is received correctly
if ($data === null) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit();
}

$sender_id = $data['sender_id'] ?? null;
$receiver_id = $data['receiver_id'] ?? null;

// Debugging: Check if sender_id and receiver_id are set
if ($sender_id === null || $receiver_id === null) {
    echo json_encode(['success' => false, 'error' => 'Missing sender_id or receiver_id']);
    exit();
}

$sql = "INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $sender_id, $receiver_id);

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