<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$verified_characters = array();
$serverId = $_GET['serverId'];
$user_id = $_GET['userId'];

$sql = "
    SELECT uc.id, uc.character_name, uc.is_verified
    FROM user_character uc
    JOIN server_member sm ON uc.servermember_id = sm.id
    WHERE sm.server_id = ? AND sm.user_id = ? AND uc.is_verified = 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $serverId, $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    // Log the character ID being processed
    error_log("Processing Character ID: " . $row['id']);

    // Fetch aliases for each character
    $aliasStmt = $conn->prepare("
        SELECT 
            alias_character.id,
            alias_character.name,
            alias_character.character_pic_path
        FROM alias_character
        WHERE alias_character.character_id = ?
    ");
    $aliasStmt->bind_param("i", $row['id']);
    if (!$aliasStmt->execute()) {
        error_log("Error executing alias query for Character ID: " . $row['id']);
    }
    $aliasResult = $aliasStmt->get_result();

    $aliases = [];
    while ($aliasRow = $aliasResult->fetch_assoc()) {
        $aliases[] = $aliasRow; // Include full alias data
    }

    // Log the aliases fetched for debugging
    if (empty($aliases)) {
        error_log("No aliases found for Character ID: " . $row['id']);
    } else {
        error_log("Character ID: " . $row['id'] . " Aliases: " . json_encode($aliases));
    }

    $row['aliases'] = $aliases; // Add aliases to the character data
    $verified_characters[] = $row;
}

// Log the final verified characters array
if (empty($verified_characters)) {
    error_log("No verified characters found for Server ID: $serverId and User ID: $user_id");
} else {
    error_log("Verified Characters: " . json_encode($verified_characters));
}

$conn->close();
echo json_encode($verified_characters);
?>