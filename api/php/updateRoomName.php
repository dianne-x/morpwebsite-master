<?php

require 'dbConnection.php'; // Include the database connection file

// CORS Headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // If the request method is OPTIONS, return 200 OK with CORS headers
    http_response_code(200);
    exit();
}

// Ensure the response is JSON
header('Content-Type: application/json');

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$roomId = $data['roomId'];
$roomName = $data['roomName'];

// Prepare and execute the update statement
$stmt = $conn->prepare("UPDATE room SET room_name=? WHERE id=?");
$stmt->bind_param("si", $roomName, $roomId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Room name updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating room name: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>
