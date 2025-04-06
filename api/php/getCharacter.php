<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

$characterId = isset($_GET['characterId']) ? intval($_GET['characterId']) : null;

if (!$characterId) {
    $response['error'] = "Character ID is required.";
    echo json_encode($response);
    exit();
}

$query = "SELECT id, character_name, gender_id, species_id, status_id, affilation_id, nationality_id, occupation_id, fc_type_id, fc_name, servermember_id, character_pic_path, birthdate, died, deathdate, resurrected, resurrected_date, bio, powers, weaknesses, used_item, family, universe FROM user_character WHERE id = ?";
$stmt = $conn->prepare($query);
if (!$stmt) {
    $response['error'] = "Failed to prepare statement: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("i", $characterId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $character = $result->fetch_assoc();
    // Format date fields
    $character['birthdate'] = $character['birthdate'] ? date('Y-m-d', strtotime($character['birthdate'])) : null;
    $character['deathdate'] = $character['deathdate'] ? date('Y-m-d', strtotime($character['deathdate'])) : null;
    $character['resurrected_date'] = $character['resurrected_date'] ? date('Y-m-d', strtotime($character['resurrected_date'])) : null;
    $response['character'] = $character;
} else {
    $response['error'] = "Character not found.";
}

echo json_encode($response);

$conn->close();
?>
