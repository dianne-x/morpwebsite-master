<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$verified_characters = array();
$serverId = $_GET['serverId'];
$user_id = $_GET['userId'];

$sql = "
    SELECT uc.id, uc.character_name, uc.is_verified, uc.character_pic_path
    FROM user_character uc
    JOIN server_member sm ON uc.servermember_id = sm.id
    WHERE sm.server_id = ? AND sm.user_id = ? AND uc.is_verified = 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $serverId, $user_id);
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_assoc()) {
    $verified_characters[] = $row;
}

error_log("Characters" . json_encode($verified_characters));
$conn->close();
echo json_encode($verified_characters);
?>