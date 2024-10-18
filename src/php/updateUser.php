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

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Ensure required data exists and is valid (without the "id")
if (!isset($data['name'], $data['email'], $data['nickname'], $data['about_me'])) {
    echo json_encode(["message" => "Invalid input data"]);
    exit();
}

// Extract user data (without the "id")
$name = $data['name'];
$email = $data['email'];
$nickname = $data['nickname'];
$about_me = $data['about_me'];

// Update based on the email (or any other unique field, like nickname)
$stmt = $conn->prepare("UPDATE users SET name=?, nickname=?, about_me=? WHERE email=?");
$stmt->bind_param("ssss", $name, $nickname, $about_me, $email);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User data updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating user data: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>
