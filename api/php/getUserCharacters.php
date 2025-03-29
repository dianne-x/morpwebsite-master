<?php
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

include 'dbConnection.php'; // Include the database connection file

$userId = $_GET['userId'];
$serverId = $_GET['serverId'];

if (!$userId || !$serverId) {
    echo json_encode(['success' => false, 'message' => 'Invalid parameters.']);
    exit;
}

try {
    // Find the server_member row
    $stmt = $conn->prepare('SELECT id FROM server_member WHERE user_id = ? AND server_id = ?');
    $stmt->bind_param('si', $userId, $serverId);
    $stmt->execute();
    $result = $stmt->get_result();
    $serverMember = $result->fetch_assoc();

    if (!$serverMember) {
        echo json_encode(['success' => false, 'message' => 'Server member not found.']);
        exit;
    }

    $serverMemberId = $serverMember['id'];

    // Fetch user characters
    $stmt = $conn->prepare('SELECT * FROM user_character WHERE servermember_id = ? AND is_verified = 1');
    $stmt->bind_param('i', $serverMemberId);
    $stmt->execute();
    $result = $stmt->get_result();
    $characters = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['success' => true, 'characters' => $characters]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching user characters: ' . $e->getMessage()]);
}
?>
