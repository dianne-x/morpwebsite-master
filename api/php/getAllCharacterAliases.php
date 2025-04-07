<?php

require 'dbConnection.php'; // Include the database connection file

// CORS HEADER
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Extract room ID from query parameters
$roomId = isset($_GET['roomId']) ? intval($_GET['roomId']) : 0;

if ($roomId === 0) {
    echo json_encode(["message" => "Invalid room ID"]);
    exit();
}

try {
    // Step 1: Get server_member IDs for the given room
    $serverMemberStmt = $conn->prepare("
        SELECT id 
        FROM server_member 
        WHERE server_id = ?
    ");
    $serverMemberStmt->bind_param("i", $roomId);
    $serverMemberStmt->execute();
    $serverMemberResult = $serverMemberStmt->get_result();

    $serverMemberIds = [];
    while ($row = $serverMemberResult->fetch_assoc()) {
        $serverMemberIds[] = $row['id'];
    }
    $serverMemberStmt->close();

    if (empty($serverMemberIds)) {
        echo json_encode(["success" => false, "message" => "No server members found for the given room"]);
        exit();
    }

    // Step 2: Get character IDs for the server members
    $placeholders = implode(',', array_fill(0, count($serverMemberIds), '?'));
    $characterStmt = $conn->prepare("
        SELECT id 
        FROM user_character 
        WHERE servermember_id IN ($placeholders)
    ");
    $characterStmt->bind_param(str_repeat('i', count($serverMemberIds)), ...$serverMemberIds);
    $characterStmt->execute();
    $characterResult = $characterStmt->get_result();

    $characterIds = [];
    while ($row = $characterResult->fetch_assoc()) {
        $characterIds[] = $row['id'];
    }
    $characterStmt->close();

    if (empty($characterIds)) {
        echo json_encode(["success" => false, "message" => "No characters found for the server members"]);
        exit();
    }

    // Step 3: Get aliases for the characters
    $placeholders = implode(',', array_fill(0, count($characterIds), '?'));
    $aliasStmt = $conn->prepare("
        SELECT character_id, name 
        FROM alias_character 
        WHERE character_id IN ($placeholders)
    ");
    $aliasStmt->bind_param(str_repeat('i', count($characterIds)), ...$characterIds);
    $aliasStmt->execute();
    $aliasResult = $aliasStmt->get_result();

    $aliases = [];
    while ($row = $aliasResult->fetch_assoc()) {
        $characterId = $row['character_id'];
        if (!isset($aliases[$characterId])) {
            $aliases[$characterId] = [];
        }
        $aliases[$characterId][] = $row['name'];
    }
    $aliasStmt->close();

    // Return the aliases
    echo json_encode(["success" => true, "aliases" => $aliases], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "An error occurred", "error" => $e->getMessage()]);
}

// Close the connection
$conn->close();
