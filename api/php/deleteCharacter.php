<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

$response = array(); // Initialize response array

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $characterId = isset($data['characterId']) ? $data['characterId'] : null;

    if ($characterId === null) {
        echo json_encode(['success' => false, 'message' => 'Character ID is missing.']);
        exit();
    }

    // Start a transaction
    $conn->begin_transaction();

    try {
        // Update related records in alias_character table to set character_id to NULL
        $stmt = $conn->prepare("UPDATE alias_character SET character_id = NULL WHERE character_id = ?");
        if ($stmt === false) {
            throw new Exception('Failed to prepare the query: ' . $conn->error);
        }
        $stmt->bind_param('i', $characterId);
        if (!$stmt->execute()) {
            throw new Exception('Failed to update related alias characters: ' . $stmt->error);
        }
        $stmt->close();

        // Update related records in room_message table to set character_id to NULL
        $stmt = $conn->prepare("UPDATE room_message SET character_id = NULL WHERE character_id = ?");
        if ($stmt === false) {
            throw new Exception('Failed to prepare the query: ' . $conn->error);
        }
        $stmt->bind_param('i', $characterId);
        if (!$stmt->execute()) {
            throw new Exception('Failed to update related room messages: ' . $stmt->error);
        }
        $stmt->close();

        // Delete the character
        $stmt = $conn->prepare("DELETE FROM user_character WHERE id = ?");
        if ($stmt === false) {
            throw new Exception('Failed to prepare the query: ' . $conn->error);
        }
        $stmt->bind_param('i', $characterId);
        if (!$stmt->execute()) {
            throw new Exception('Failed to delete character: ' . $stmt->error);
        }
        $stmt->close();

        // Commit the transaction
        $conn->commit();

        echo json_encode(['success' => true, 'message' => 'Character deleted successfully.']);
    } catch (Exception $e) {
        // Rollback the transaction
        $conn->rollback();

        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }

    $conn->close();
    exit();
}

// Return error for unsupported request methods
echo json_encode(['success' => false, 'message' => 'Unsupported request method.']);
exit();
?>