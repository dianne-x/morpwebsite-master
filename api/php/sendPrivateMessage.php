<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$sender_id = $data['sender_id'];
$receiver_id = $data['receiver_id'];
$message = $data['message'];

$sql = "INSERT INTO private_messages (sender_id, receiver_id, message, date) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $sender_id, $receiver_id, $message);

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