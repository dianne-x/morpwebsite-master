<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

$response = array(); // Initialize response array

// Check connection
if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Check if roomId is set
if (!isset($_GET['roomId'])) {
    $response['error'] = "Missing roomId";
    echo json_encode($response);
    exit();
}

$roomId = $_GET['roomId'];

// Debugging information
error_log("Deleting room with roomId: " . $roomId);

// Delete room based on room_id
$sql = "DELETE FROM Room WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error);
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("i", $roomId);
error_log("SQL Query: " . $sql);
error_log("Room ID: " . $roomId);
if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    $response['error'] = "Execute failed: " . $stmt->error;
    echo json_encode($response);
    exit();
}

// Debugging information
error_log("Room deleted successfully");

$stmt->close();
$conn->close();

$response['success'] = "Room deleted successfully";
echo json_encode($response);
?>
