<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

$response = array(); // Initialize response array

// Check connection
if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Check if userId and serverId are set
if (!isset($_GET['userId'])) {
    $response['error'] = "Missing userId";
    echo json_encode($response);
    exit();
}
if (!isset($_GET['serverId'])) {
    $response['error'] = "Missing serverId";
    echo json_encode($response);
    exit();
}

$userId = $_GET['userId'];
$serverId = $_GET['serverId'];

// Debugging information
error_log("Fetching server members and characters for userId: " . $userId . " and serverId: " . $serverId);

// Fetch server member ID
$serverMemberQuery = "SELECT id FROM server_member WHERE user_id = ? AND server_id = ?";
$stmt = $conn->prepare($serverMemberQuery);
$stmt->bind_param("si", $userId, $serverId);
$stmt->execute();
$serverMemberResult = $stmt->get_result();

if ($serverMemberResult->num_rows > 0) {
    $serverMemberId = $serverMemberResult->fetch_assoc()['id'];

    // Fetch characters for the server member
    $characterQuery = "SELECT * FROM user_character WHERE servermember_id = ?";
    $stmt = $conn->prepare($characterQuery);
    $stmt->bind_param("i", $serverMemberId);
    $stmt->execute();
    $characterResult = $stmt->get_result();

    $characters = array();
    while ($row = $characterResult->fetch_assoc()) {
        $characters[] = $row;
    }
    $response['data'] = $characters;

    // Save new character to the database
    if (isset($_POST['newCharacter'])) {
        $newCharacter = json_decode($_POST['newCharacter'], true);

        // Set default values for missing fields
        $is_verified = $newCharacter['is_verified'] ?? 0;
        $is_own_character = $newCharacter['is_own_character'] ?? 0;
        $character_name = $newCharacter['character_name'] ?? '';
        $nickname = $newCharacter['nickname'] ?? '';
        $gender_id = $newCharacter['gender_id'] ?? 0;
        $character_pic_path = $newCharacter['character_pic_path'] ?? '';
        $birthdate = $newCharacter['birthdate'] ?? null;
        $died = $newCharacter['died'] ?? 0;
        $deathdate = $newCharacter['deathdate'] ?? null;
        $resurrected = $newCharacter['resurrected'] ?? 0;
        $resurrected_date = $newCharacter['resurrected_date'] ?? null;
        $species_id = $newCharacter['species_id'] ?? 0;
        $occupation_id = $newCharacter['occupation_id'] ?? 0;
        $affiliation_id = $newCharacter['affiliation_id'] ?? 0;
        $nationality_id = $newCharacter['nationality_id'] ?? 0;
        $status_id = $newCharacter['status_id'] ?? 0;
        $story_id = $newCharacter['story_id'] ?? 0;
        $bio = $newCharacter['bio'] ?? '';
        $powers = $newCharacter['powers'] ?? '';
        $weaknesses = $newCharacter['weaknesses'] ?? '';
        $used_item = $newCharacter['used_item'] ?? '';
        $family = $newCharacter['family'] ?? '';
        $universe = $newCharacter['universe'] ?? '';
        $fc_type_id = $newCharacter['fc_type_id'] ?? 0;
        $fc_name = $newCharacter['fc_name'] ?? '';

        $insertCharacterQuery = "INSERT INTO user_character (servermember_id, is_verified, is_own_character, character_name, nickname, gender_id, character_pic_path, birthdate, died, deathdate, resurrected, resurrected_date, species_id, occupation_id, affiliation_id, nationality_id, status_id, story_id, bio, powers, weaknesses, used_item, family, universe, fc_type_id, fc_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($insertCharacterQuery);
        $stmt->bind_param("iisssisssissiiiiiiissssssi", $serverMemberId, $is_verified, $is_own_character, $character_name, $nickname, $gender_id, $character_pic_path, $birthdate, $died, $deathdate, $resurrected, $resurrected_date, $species_id, $occupation_id, $affiliation_id, $nationality_id, $status_id, $story_id, $bio, $powers, $weaknesses, $used_item, $family, $universe, $fc_type_id, $fc_name);
        if ($stmt->execute()) {
            $response['message'] = "New character saved successfully.";
        } else {
            $response['error'] = "Failed to save new character.";
        }
    }
} else {
    $response['error'] = "Server member not found.";
}

echo json_encode($response);

$conn->close();
?>