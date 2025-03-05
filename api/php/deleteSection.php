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

// Check if sectionId is set
if (!isset($_GET['sectionId'])) {
    $response['error'] = "Missing sectionId";
    echo json_encode($response);
    exit();
}

$sectionId = $_GET['sectionId'];

// Debugging information
error_log("Deleting section with sectionId: " . $sectionId);

// Delete rooms associated with the section
$sql = "DELETE FROM Room WHERE section_id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error);
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("i", $sectionId);
if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    $response['error'] = "Execute failed: " . $stmt->error;
    echo json_encode($response);
    exit();
}
$stmt->close();

// Delete section based on section_id
$sql = "DELETE FROM Section WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error);
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("i", $sectionId);
if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    $response['error'] = "Execute failed: " . $stmt->error;
    echo json_encode($response);
    exit();
}

// Debugging information
error_log("Section and associated rooms deleted successfully");

$stmt->close();
$conn->close();

$response['success'] = "Section and associated rooms deleted successfully";
echo json_encode($response);
?>
