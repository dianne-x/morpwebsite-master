<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
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

// Check if characterId is set
if (!isset($_GET['characterId'])) {
    $response['error'] = "Missing characterId";
    echo json_encode($response);
    exit();
}

$characterId = $_GET['characterId'];

// Debugging information
error_log("Deleting character with characterId: " . $characterId);

// Delete character based on character_id
$sql = "DELETE FROM User_Character WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error);
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("i", $characterId);
error_log("SQL Query: " . $sql);
error_log("Character ID: " . $characterId);
if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    $response['error'] = "Execute failed: " . $stmt->error;
    echo json_encode($response);
    exit();
}

// Debugging information
error_log("Character deleted successfully");

$stmt->close();
$conn->close();

$response['success'] = "Character deleted successfully";
echo json_encode($response);
?>
