
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

// Validate the data
if (empty($name) || empty($gender) || empty($species) || empty($status)) {
    $response['error'] = "All fields are required.";
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
$query = "INSERT INTO user_character (character_name, gender_id, species_id, status_id) VALUES ('$name', $genderId, $speciesId, $statusId)";
if ($conn->query($query) === TRUE) {
    $response['success'] = "Character saved successfully!";
} else {
    $response['error'] = "Error: " . $query . "<br>" . $conn->error;
}

echo json_encode($response);

$conn->close();
?>