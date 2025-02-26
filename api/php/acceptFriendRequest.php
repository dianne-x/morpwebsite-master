<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$request_id = $data['request_id'];

$sql = "UPDATE friend_requests SET status = 'accepted' WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $request_id);

$response = [];
if ($stmt->execute()) {
    // Get sender and receiver IDs
    $sql = "SELECT sender_id, receiver_id FROM friend_requests WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $request_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $sender_id = $row['sender_id'];
    $receiver_id = $row['receiver_id'];

    // Insert into friendships table
    $sql = "INSERT INTO friendships (user1_id, user2_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $sender_id, $receiver_id);
    $stmt->execute();

    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>