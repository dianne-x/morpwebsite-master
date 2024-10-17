<?php
include 'dbConnection.php'; // Include the database connection file

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $inviteLink = $input['inviteLink'] ?? null;
    $userId = isset($_GET['userId']) ? trim($_GET['userId'], '"') : null;

    // Log the inviteLink and userId
    error_log("Invite Link: " . $inviteLink);
    error_log("User ID: " . $userId);

    if ($inviteLink === null || $userId === null) {
        echo json_encode(['success' => false, 'message' => 'Invite link or user ID not provided.']);
        exit();
    }

    // Extract the server UID from the invite link
    $serverUid = str_replace('morp.ru/', '', $inviteLink);

    // Check if the server exists
    $stmt = $conn->prepare("SELECT id FROM Servers WHERE uid = ?");
    $stmt->bind_param('s', $serverUid);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($serverId);
        $stmt->fetch();

        // Check if the user is already a member of the server
        $stmt = $conn->prepare("SELECT id FROM Server_Member WHERE user_id = ? AND server_id = ?");
        $stmt->bind_param('si', $userId, $serverId);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'User is already a member of this server.']);
        } else {
            // Add the user to the server
            $stmt = $conn->prepare("INSERT INTO Server_Member (user_id, server_id) VALUES (?, ?)");
            $stmt->bind_param('si', $userId, $serverId);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Successfully joined the server.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to join the server.']);
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No existing server found.']);
    }

    $stmt->close();
    $conn->close();
}
?>