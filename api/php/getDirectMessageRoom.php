<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$user1_id = $data['user1_id'];
$user2_id = $data['user2_id'];

$response = [];

// Check if a room already exists between the two users
$sql = "SELECT id FROM direct_message_room WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $user1_id, $user2_id, $user2_id, $user1_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($room_id);

if ($stmt->num_rows > 0) {
    // Room exists, fetch the room ID
    $stmt->fetch();
    $response['success'] = true;
    $response['roomId'] = $room_id;
} else {
    $response['success'] = false;
    $response['error'] = 'No room found';
}

$stmt->close();
echo json_encode($response);
$conn->close();
?>