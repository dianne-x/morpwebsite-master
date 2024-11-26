<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
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
} else {
    $response['error'] = "Server member not found.";
}

echo json_encode($response);

$conn->close();
?>