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

// Debug: Check the contents of $data
print_r($data);

error_log(print_r($data, true));

// Check if data is null
if ($data === null) {
    $response['error'] = "Invalid JSON input.";
    echo json_encode($response);
    exit();
}

// Validate and assign data
$name = isset($data['name']) ? $data['name'] : null;
error_log("Name: " . $name);
$gender = isset($data['gender']) ? $data['gender'] : null;
error_log("Gender" . $gender);
$species = isset($data['species']) ? $data['species'] : null;
error_log("Species" . $species);
$status = isset($data['status']) ? $data['status'] : null;
error_log("status" . $status);
$user_id = isset($data['user_id']) ? $data['user_id'] : null;
error_log("user_id" . $user_id);
$affilation = isset($data['affilation']) ? $data['affilation'] : null;
error_log("affiliation" . $affiliation);
$nationality = isset($data['nationality']) ? $data['nationality'] : null;
error_log("matinality" . $nationality);
$occupation = isset($data['occupation']) ? $data['occupation'] : null;
error_log("occupation" . $occupation);
$fctype = isset($data['fc_type']) ? $data['fc_type'] : null;
error_log("fctype" . $fctype);
$server_id = isset($data['server_id']) ? $data['server_id'] : null;
error_log("server_id" . $server_id);

// Validate the data
//error_log("Validating data."); // Log before validating the data    
//if (empty($name) || empty($gender) || empty($species) || empty($status) || empty($user_id) || empty($server_id)) {
    //$response['error'] = "All fields are required.";
    //echo json_encode($response);
    //exit();
//}




// Get the server member ID
error_log("Fetching server member ID."); // Log before executing the query
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
error_log("About the query gender"); // Log before executing
$genderQuery = "SELECT id FROM gender WHERE gender = '$gender'";
$genderResult = $conn->query($genderQuery);
if (!$genderResult) {
    error_log("Error fetching gender: " . $conn->error);
}
if ($genderResult && $genderResult->num_rows > 0) {
    $genderId = $genderResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Gender not found.";
    echo json_encode($response);
    exit();
}

error_log("About the query for species.");  // Log before executing the species query
$speciesQuery = "SELECT id FROM character_species WHERE species = '$species'";
$speciesResult = $conn->query($speciesQuery);
if ($speciesResult && $speciesResult->num_rows > 0) {
    $speciesId = $speciesResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Species not found.";
    echo json_encode($response);
    exit();
}


error_log("Query for affilations");
$affilationQuery = "SELECT id FROM affilation WHERE affilation = '$affilation'";
$affilationResult = $conn->query($affilationQuery);
if (!$affilationResult) {
    error_log("Error fetching affiliation: " . $conn->error);
}
if ($affilationResult && $affilationResult->num_rows > 0) {
    $affilationId = $affilationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Affiliation not found.";
    echo json_encode($response);
    exit();
}

error_log("Query for nationality");
$nationalityQuery = "SELECT id FROM nationality WHERE nationality = '$nationality'";
$nationalityResult = $conn->query($nationalityQuery);
if (!$nationalityResult) {
    error_log("Error fetching nationality: " . $conn->error);
}
if ($nationalityResult && $nationalityResult->num_rows > 0) {
    $nationalityId = $nationalityResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Nationality not found.";
    echo json_encode($response);
    exit();
}


error_log("Query for occupation");
$occupationQuery = "SELECT id FROM occupation WHERE occupation = '$occupation'";
$occupationResult = $conn->query($occupationQuery);
if (!$occupationResult) {
    error_log("Error fetching occupation: " . $conn->error);
}
if ($occupationResult && $occupationResult->num_rows > 0) {
    $occupationId = $occupationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Occupation not found.";
    echo json_encode($response);
    exit();
}

error_log("Query for fctype");
$fctypeQuery = "SELECT id FROM character_fc WHERE fc_type = '$fctype'";
$fctypeResult = $conn->query($fctypeQuery);
if (!$fctypeResult) {
    error_log("Error fetching fctype: " . $conn->error);
}
if ($fctypeResult && $fctypeResult->num_rows > 0) {
    $fctypeId = $fctypeResult->fetch_assoc()['id'];
} else {
    $response['error'] = "FC Type not found.";
    echo json_encode($response);
    exit();
}


error_log("About the query for status.");
$statusQuery = "SELECT id FROM character_status WHERE status = '$status'";
$statusResult = $conn->query($statusQuery);
if ($statusResult && $statusResult->num_rows > 0) {
    $statusId = $statusResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Status not found.";
    echo json_encode($response);
    exit();
}

// Insert the character data
// Insert the character data
error_log("About to execute insert query."); // Log before executing the insert query
$query = "INSERT INTO user_character (character_name, gender_id, species_id, status_id, affilation_id, nationality_id, occupation_id, fc_type_id, servermember_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error); // Log the error
    $response['error'] = "Failed to prepare statement.";
    echo json_encode($response);
    exit();
}
$stmt->bind_param("siiiiiiii", $name, $genderId, $speciesId, $statusId, $affilationId, $nationalityId, $occupationId, $fctypeId, $servermember_id);

// Log the values being inserted
error_log("Inserting character with values: Name: $name, Gender ID: $genderId, Species ID: $speciesId, Status ID: $statusId, Server Member ID: $servermember_id"); // LOGGING VALUES FOR INSERT BY BLACKBOX

if ($stmt->execute()) {
    $response['success'] = "Character saved successfully!";
    $response['character'] = [
        'id' => $stmt->insert_id,
        'name' => $name,
        'gender' => $gender,
        'species' => $species,
        'affilation' => $affilation,
        'nationality' => $nationality,
        'occupation' => $occupation,
        'fc_type' => $fctype,
        'status' => $status,
        'is_verified' => 0, // Not approved yet
        'servermember_id' => $servermember_id
    ];
} else {
    error_log("Error inserting character: " . $stmt->error); // LOGGING ERROR ON INSERT BY BLACKBOX
    $response['error'] = "Error: " . $stmt->error; // RETURNING ERROR MESSAGE BY BLACKBOX
}

echo json_encode($response);

$conn->close();
?>