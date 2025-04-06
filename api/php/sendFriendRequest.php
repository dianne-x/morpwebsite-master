<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$sender_id = $data['sender_id'];
$receiver_id = $data['receiver_id'];

// Check if a friendship already exists
$sql = "SELECT * FROM friendships WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $sender_id, $receiver_id, $receiver_id, $sender_id);
$stmt->execute();
$result = $stmt->get_result();

$response = [];
if ($result->num_rows > 0) {
    // Friendship already exists
    $response['success'] = false;
    $response['error'] = 'Friendship already exists';
} else {
    // Check if a friend request already exists
    $sql = "SELECT * FROM friend_requests WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $sender_id, $receiver_id, $receiver_id, $sender_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Friend request already exists
        $response['success'] = false;
        $response['error'] = 'Friend request already exists';
    } else {
        // Insert new friend request
        $sql = "INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $sender_id, $receiver_id);
        if ($stmt->execute()) {
            $response['success'] = true;
        } else {
            $response['success'] = false;
            $response['error'] = $stmt->error;
        }
    }
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>