<?php
require 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$user_id = $_GET['user_id'];

// Fetch friends
$sql = "SELECT u.uid, u.name, u.profile_pic_path
        FROM friendships f
        JOIN users u ON (f.user1_id = u.uid OR f.user2_id = u.uid)
        WHERE (f.user1_id = ? OR f.user2_id = ?) AND u.uid != ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user_id, $user_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

$friends = [];
while ($row = $result->fetch_assoc()) {
    $friends[] = $row;
}

echo json_encode($friends);

$stmt->close();
$conn->close();
?>