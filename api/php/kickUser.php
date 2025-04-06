<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];

// Invalidate the user's session
$sql = "UPDATE users SET session_invalidated = 1 WHERE uid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userId);

$response = [];
if ($stmt->execute()) {
    // Notify the WebSocket server
    $websocketUrl = $_ENV['WEBSOCKET_URL'];
    $msg = json_encode(['action' => 'kick', 'userId' => $userId]);
    $ch = curl_init($websocketUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $msg);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_exec($ch);
    curl_close($ch);

    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>