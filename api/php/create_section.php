<?php
require 'dbConnection.php'; // Include the database connection file

// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

$data = json_decode(file_get_contents("php://input"), true);
$server_id = isset($data['server_id']) ? intval($data['server_id']) : null;
$section_name = isset($data['section_name']) ? $data['section_name'] : null;

$response = [];

if ($server_id && $section_name) {
    if ($stmt = $conn->prepare("INSERT INTO section (server_id, section_name) VALUES (?, ?)")) {
        $stmt->bind_param("is", $server_id, $section_name);
        if ($stmt->execute()) {
            $response = [
                "id" => $stmt->insert_id,
                "server_id" => $server_id,
                "section_name" => $section_name
            ];
            error_log("New section created: " . json_encode($response)); // Log the new section details
        } else {
            $response = ["error" => "Error: " . $stmt->error];
            error_log("Error creating section: " . $stmt->error); // Log the error
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
