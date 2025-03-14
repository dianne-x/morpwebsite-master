<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$room_id = $data['roomId'];
$sent_from = $data['sentFrom'];
$message = $data['message'];

$response = [];

if (isset($room_id) && isset($sent_from) && isset($message)) {
    $sql = "INSERT INTO direct_message (room_id, sent_from, message, sent) VALUES (?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $room_id, $sent_from, $message);

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = $stmt->error;
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['error'] = 'Invalid input';
}

echo json_encode($response);

$conn->close();
?>