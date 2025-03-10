<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$user1_id = $data['user1_id'];
$user2_id = $data['user2_id'];

$sql = "SELECT id FROM direct_message_room WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $user1_id, $user2_id, $user2_id, $user1_id);

$response = [];
if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response['success'] = true;
        $response['roomId'] = $row['id'];
    } else {
        $response['success'] = false;
        $response['error'] = 'Room not found';
    }
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>