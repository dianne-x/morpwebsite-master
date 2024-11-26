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

$uid = $_GET['uid'];

if (!$uid) {
    error_log('UID is required');
    echo json_encode(['error' => 'UID is required']);
    exit;
}

error_log("Fetching user_id for uid: $uid");

$sql = "SELECT id FROM users WHERE uid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $uid);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['user_id' => $row['id']]);
} else {
    error_log('User not found');
    echo json_encode(['error' => 'User not found']);
}

$stmt->close();
$conn->close();
?>
