<?php

require 'dbConnection.php';

// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get the data from the request
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $conn->real_escape_string($data['user_id']);
$isPromotion = filter_var($data['isPromotion'], FILTER_VALIDATE_BOOLEAN);
$owner_id = $conn->real_escape_string($data['owner_id']);

// Fetch the current role of the user
$sql = "SELECT is_moderator FROM server_member WHERE user_id = '$user_id'";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["message" => "Query failed: " . $conn->error]);
    exit();
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($isPromotion) {
        if ($row['is_moderator']) {
            // Find the current owner and set its value to 0
            $update_owner_sql = "UPDATE server_member SET is_owner = 0, is_moderator = 1 WHERE user_id = '$owner_id'";
            if ($conn->query($update_owner_sql) === TRUE) {
                // Promote to owner
                $update_sql = "UPDATE server_member SET is_owner = 1, is_moderator = 1 WHERE user_id = '$user_id'";
            } else {
                echo json_encode(["message" => "Error updating current owner: " . $conn->error]);
                exit();
            }
        } else {
            // Promote to moderator
            $update_sql = "UPDATE server_member SET is_moderator = 1 WHERE user_id = '$user_id'";
        }
    } else {
        // Demote to regular user
        $update_sql = "UPDATE server_member SET is_moderator = 0 WHERE user_id = '$user_id'";
    }

    if ($conn->query($update_sql) === TRUE) {
        echo json_encode(["message" => "User role updated successfully"]);
    } else {
        echo json_encode(["message" => "Error updating user role: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "User not found"]);
}

$conn->close();
?>