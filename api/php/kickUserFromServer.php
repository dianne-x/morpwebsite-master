<?php

require 'dbConnection.php';

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get the data from the request
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $conn->real_escape_string($data['user_id']);

// Delete the user from the server
$sql = "DELETE FROM server_member WHERE user_id = '$user_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User removed successfully"]);
} else {
    echo json_encode(["message" => "Error removing user: " . $conn->error]);
}

$conn->close();
?>
