<?php
require 'dbConnection.php';

// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if (isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    $sql = "SELECT is_admin FROM users WHERE uid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['is_admin' => $row['is_admin']]);
    } else {
        echo json_encode(['is_admin' => false]);
    }

    $stmt->close();
} else {
    echo json_encode(['is_admin' => false, 'error' => 'UID not provided']);
}

$conn->close();
?>