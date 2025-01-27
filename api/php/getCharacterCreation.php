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

$response = array();

// Fetch genders
$query = "SELECT id, gender FROM gender";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $genders = array();
    while($row = $result->fetch_assoc()) {
        $genders[] = $row;
    }
    $response['genders'] = $genders;
}

// Fetch species
$query = "SELECT id, species FROM character_species"; // Use 'species' as per the database column name
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $species = array();
    while($row = $result->fetch_assoc()) {
        $species[] = $row;
    }
    $response['species'] = $species;
}

// Fetch statuses
$query = "SELECT id, status FROM character_status";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $statuses = array();
    while($row = $result->fetch_assoc()) {
        $statuses[] = $row;
    }
    $response['statuses'] = $statuses;
}

echo json_encode($response);

$conn->close();
?>