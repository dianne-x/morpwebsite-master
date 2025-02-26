<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$user_id = $_GET['user_id'];

$sql = "SELECT fr.id, fr.sender_id, u.name AS sender_name, u.profile_pic_path AS sender_profile_pic
        FROM friend_requests fr
        JOIN users u ON fr.sender_id = u.uid
        WHERE fr.receiver_id = ? AND fr.status = 'pending'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$friend_requests = [];
while ($row = $result->fetch_assoc()) {
    $friend_requests[] = $row;
}

echo json_encode($friend_requests);

$stmt->close();
$conn->close();
?>