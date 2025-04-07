<?php
include 'dbConnection.php'; // Include the database connection file
// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Assuming you have a way to get the logged-in user's ID, e.g., from session or token
$userId = isset($_GET['userId']) ? trim($_GET['userId'], '"') : null;


if ($userId === null) {
    echo json_encode(['success' => false, 'message' => '{$userId}']);
    exit();
}

try {
    // Prepare a SQL statement to fetch the joined servers
    $stmt = $conn->prepare("SELECT s.id, s.uid, s.server_name AS name, s.server_picture_path AS icon, s.invite_link FROM servers s
                            JOIN server_member sm ON s.id = sm.server_id
                            WHERE sm.user_id = ?");
    $stmt->bind_param('s', $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $servers = [];
    while ($row = $result->fetch_assoc()) {
        $servers[] = $row;
    }

    echo json_encode(['success' => true, 'servers' => $servers]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>