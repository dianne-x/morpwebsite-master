<?php
require 'dbConnection.php'; // Include the database connection file

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);
$section_id = isset($data['section_id']) ? intval($data['section_id']) : null;
$room_name = isset($data['room_name']) ? $data['room_name'] : null;

$response = [];

if ($section_id && $room_name) {
    if ($stmt = $conn->prepare("INSERT INTO room (section_id, room_name) VALUES (?, ?)")) {
        $stmt->bind_param("is", $section_id, $room_name);
        if ($stmt->execute()) {
            $response = [
                "id" => $stmt->insert_id,
                "section_id" => $section_id,
                "room_name" => $room_name
            ];
            error_log("New room created: " . json_encode($response)); // Log the new room details
        } else {
            $response = ["error" => "Error: " . $stmt->error];
            error_log("Error creating room: " . $stmt->error); // Log the error
        }
        $stmt->close();
    } else {
        $response = ["error" => "Error: " . $conn->error];
        error_log("Error preparing statement: " . $conn->error); // Log the error
    }
} else {
    $response = ["error" => "Invalid input"];
    error_log("Invalid input: " . json_encode($data)); // Log the invalid input
}

$conn->close();
echo json_encode($response);


?>