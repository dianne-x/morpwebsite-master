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

// Extract character ID from query parameters
$characterId = isset($_GET['characterId']) ? intval($_GET['characterId']) : 0;

if ($characterId === 0) {
    echo json_encode(["message" => "Invalid character ID"]);
    exit();
}

// Prepare and execute the query
$stmt = $conn->prepare("
    SELECT 
        user_character.character_name,
        user_character.nickname,
        gender.gender,
        DATE_FORMAT(user_character.birthdate, '%Y-%m-%d') AS birthdate,
        user_character.died,
        DATE_FORMAT(user_character.deathdate, '%Y-%m-%d') AS deathdate,
        user_character.resurrected,
        DATE_FORMAT(user_character.resurrected_date, '%Y-%m-%d') AS resurrected_date,
        character_species.species,
        occupation.occupation,
        affiliation.affiliation,
        nationality.nationality,
        character_status.status,
        character_story.stories_id,
        user_character.bio,
        user_character.powers,
        user_character.weaknesses,
        user_character.used_item,
        user_character.family,
        user_character.universe,
        character_fc.fc_type,
        user_character.fc_name,
        user_character.character_pic_path
    FROM user_character
    LEFT JOIN gender ON user_character.gender_id = gender.id
    LEFT JOIN character_species ON user_character.species_id = character_species.id
    LEFT JOIN occupation ON user_character.occupation_id = occupation.id
    LEFT JOIN affiliation ON user_character.affiliation_id = affiliation.id
    LEFT JOIN nationality ON user_character.nationality_id = nationality.id
    LEFT JOIN character_status ON user_character.status_id = character_status.id
    LEFT JOIN character_story ON user_character.story_id = character_story.stories_id
    LEFT JOIN character_fc ON user_character.fc_type_id = character_fc.id
    WHERE user_character.id = ?;
");
$stmt->bind_param("i", $characterId);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the data
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Fetch aliases
    $aliasStmt = $conn->prepare("
        SELECT
            alias_character.id,
            alias_character.name,
            alias_character.character_pic_path
        FROM alias_character
        WHERE alias_character.character_id = ?
    ");
    $aliasStmt->bind_param("i", $characterId);
    $aliasStmt->execute();
    $aliasResult = $aliasStmt->get_result();

    $aliases = [];
    while ($aliasRow = $aliasResult->fetch_assoc()) {
        $aliases[] = $aliasRow;
    }

    $row['aliases'] = $aliases;

    echo json_encode(["success" => true, "character" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "No character data found"]);
}

// Close the connection
$stmt->close();
$conn->close();