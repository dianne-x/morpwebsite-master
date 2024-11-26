<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$gender = $data['gender'];
$species = $data['species'];
$status = $data['status'];
$user_id = $data['user_id']; // Get the user ID from the posted data
$server_id = $data['server_id']; // Get the server ID from the posted data

// Validate the data
if (empty($name) || empty($gender) || empty($species) || empty($status) || empty($user_id) || empty($server_id)) {
    $response['error'] = "All fields are required.";
    echo json_encode($response);
    exit();
}

// Get the server member ID
$serverMemberQuery = "SELECT id FROM server_member WHERE user_id = ? AND server_id = ?";
$stmt = $conn->prepare($serverMemberQuery);
$stmt->bind_param("si", $user_id, $server_id);
$stmt->execute();
$serverMemberResult = $stmt->get_result();
if ($serverMemberResult->num_rows > 0) {
    $servermember_id = $serverMemberResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Server member not found.";
    echo json_encode($response);
    exit();
}

// Get the IDs for gender, species, and status
$genderQuery = "SELECT id FROM gender WHERE gender = '$gender'";
$genderResult = $conn->query($genderQuery);
$genderId = $genderResult->fetch_assoc()['id'];

$speciesQuery = "SELECT id FROM character_species WHERE specie = '$species'";
$speciesResult = $conn->query($speciesQuery);
$speciesId = $speciesResult->fetch_assoc()['id'];

$statusQuery = "SELECT id FROM character_status WHERE status = '$status'";
$statusResult = $conn->query($statusQuery);
$statusId = $statusResult->fetch_assoc()['id'];

// Insert the character data
$query = "INSERT INTO user_character (character_name, gender_id, species_id, status_id, servermember_id) VALUES ('$name', $genderId, $speciesId, $statusId, $servermember_id)";
if ($conn->query($query) === TRUE) {
    $response['success'] = "Character saved successfully!";
    $response['character'] = [
        'id' => $conn->insert_id,
        'name' => $name,
        'gender' => $gender,
        'species' => $species,
        'status' => $status,
        'is_verified' => 0, // Not approved yet
        'servermember_id' => $servermember_id
    ];
} else {
    $response['error'] = "Error: " . $query . "<br>" . $conn->error;
}

echo json_encode($response);

$conn->close();
?>