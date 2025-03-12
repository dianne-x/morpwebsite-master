<?php

require 'dbConnection.php';

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the server ID from the request
$server_id = intval($_GET['server_id']);
error_log("serverInfoUser server_id: $server_id");

// Fetch users for the selected server
$users_sql = "SELECT u.name, u.uid, sm.is_owner, sm.is_moderator FROM users u JOIN server_member sm ON u.uid = sm.user_id WHERE sm.server_id = $server_id";
$users_result = $conn->query($users_sql);

if (!$users_result) {
    die("Query failed: " . $conn->error);
}

$users = array();
if ($users_result->num_rows > 0) {
    while($user = $users_result->fetch_assoc()) {
        $users[] = $user;
    }
    error_log("Fetched users: " . json_encode($users)); // Log fetched users
} else {
    echo json_encode(["message" => "No users found for server_id: $server_id"]);
    exit();
}

// Return the users as JSON
echo json_encode($users);

$conn->close();
?>
