<?php
include 'dbConnection.php'; // Include the database connection file

header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $uid = isset($_GET['uid']) ? trim($_GET['uid'], '"') : null;

    error_log("User ID from getProfilePic: " . $uid);

    if (empty($uid)) {
        echo json_encode(['success' => false, 'message' => 'User ID is required.']);
        exit();
    }

    $stmt = $conn->prepare("SELECT profile_pic_path FROM Users WHERE uid = ?");
    $stmt->bind_param('s', $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
        exit();
    }

    $user = $result->fetch_assoc();
    echo json_encode(['success' => true, 'profile_pic_path' => $user['profile_pic_path']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
