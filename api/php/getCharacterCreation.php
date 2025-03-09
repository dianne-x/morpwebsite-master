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

$response = [];

// Fetch genders
$genderQuery = "SELECT id, gender FROM gender";
$genderResult = $conn->query($genderQuery);
if ($genderResult) {
    $genders = [];
    while ($row = $genderResult->fetch_assoc()) {
        $genders[] = $row;
    }
    $response['genders'] = $genders;
} else {
    $response['error'] = "Error fetching genders: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch species
$speciesQuery = "SELECT id, species FROM character_species";
$speciesResult = $conn->query($speciesQuery);
if ($speciesResult) {
    $species = [];
    while ($row = $speciesResult->fetch_assoc()) {
        $species[] = $row;
    }
    $response['species'] = $species;
} else {
    $response['error'] = "Error fetching species: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch statuses
$statusQuery = "SELECT id, status FROM character_status";
$statusResult = $conn->query($statusQuery);
if ($statusResult) {
    $statuses = [];
    while ($row = $statusResult->fetch_assoc()) {
        $statuses[] = $row;
    }
    $response['statuses'] = $statuses;
} else {
    $response['error'] = "Error fetching statuses: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch affiliations
$affiliationQuery = "SELECT id, affiliation FROM affiliation";
$affiliationResult = $conn->query($affiliationQuery);
if ($affiliationResult) {
    $affiliations = [];
    while ($row = $affiliationResult->fetch_assoc()) {
        $affiliations[] = $row;
    }
    $response['affiliations'] = $affiliations;
} else {
    $response['error'] = "Error fetching affiliations: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch nationalities
$nationalityQuery = "SELECT id, nationality FROM nationality";
$nationalityResult = $conn->query($nationalityQuery);
if ($nationalityResult) {
    $nationalities = [];
    while ($row = $nationalityResult->fetch_assoc()) {
        $nationalities[] = $row;
    }
    $response['nationalities'] = $nationalities;
} else {
    $response['error'] = "Error fetching nationalities: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch occupations
$occupationQuery = "SELECT id, occupation FROM occupation";
$occupationResult = $conn->query($occupationQuery);
if ($occupationResult) {
    $occupations = [];
    while ($row = $occupationResult->fetch_assoc()) {
        $occupations[] = $row;
    }
    $response['occupations'] = $occupations;
} else {
    $response['error'] = "Error fetching occupations: " . $conn->error;
    echo json_encode($response);
    exit();
}

// Fetch FC types
$fcTypeQuery = "SELECT id, fc_type FROM character_fc";
$fcTypeResult = $conn->query($fcTypeQuery);
if ($fcTypeResult) {
    $fc_types = [];
    while ($row = $fcTypeResult->fetch_assoc()) {
        $fc_types[] = $row;
    }
    $response['fc_types'] = $fc_types;
} else {
    $response['error'] = "Error fetching FC types: " . $conn->error;
    echo json_encode($response);
    exit();
}

echo json_encode($response);

$conn->close();
?>