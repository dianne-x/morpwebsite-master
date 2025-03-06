<?php
include 'dbConnection.php'; // Correct the path to dbConnection.php

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $characterId = isset($data['characterId']) ? $data['characterId'] : null;

    if ($characterId === null) {
        echo json_encode(['success' => false, 'message' => 'Character ID is missing.']);
        exit();
    }

    $status = 1; // Set is_verified to 1

    // Prepare a SQL statement to update the character status
    $stmt = $conn->prepare("UPDATE user_character SET is_verified = ? WHERE id = ?");
    
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the query: ' . $conn->error]);
        exit();
    }

    // Bind the parameters to the SQL query
    $stmt->bind_param('ii', $status, $characterId);
    
    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Character status updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating character status: ' . $stmt->error]);
    }

    // Close the statement
    $stmt->close();
    $conn->close();
    exit();
}

// Return error for unsupported request methods
echo json_encode(['success' => false, 'message' => 'Unsupported request method.']);
exit();
?>
