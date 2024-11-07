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

// Fetch characters based on user_id and server_id
$sql = "
    SELECT uc.id AS character_id, uc.character_name, uc.character_pic_path, uc.is_verified
    FROM User_Character uc
    JOIN server_member sm ON uc.servermember_id = sm.id
    WHERE sm.user_id = ? AND sm.server_id = ?
";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Prepare failed: " . $conn->error);
    $response['error'] = "Prepare failed: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmt->bind_param("si", $userId, $serverId); // Treat both userId and serverId as strings
error_log("SQL Query: " . $sql);
error_log("User ID: " . $userId);
error_log("Server ID: " . $serverId);
if (!$stmt->execute()) {
    error_log("Execute failed: " . $stmt->error);
    $response['error'] = "Execute failed: " . $stmt->error;
    echo json_encode($response);
    exit();
}
$result = $stmt->get_result();

$characters = array();
while ($row = $result->fetch_assoc()) {
    $characters[] = $row;
}

// Debugging information
error_log("Number of rows returned: " . $result->num_rows);
error_log("Characters: " . json_encode($characters));

$stmt->close();
$conn->close();

$response['data'] = $characters;
echo json_encode($response);
?>