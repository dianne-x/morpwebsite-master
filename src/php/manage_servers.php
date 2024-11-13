<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getServerInfo($_GET['id']);
        } else {
            fetchServers();
        }
        break;
    case 'DELETE':
        deleteServer($input['id']);
        break;
    case 'PUT':
        if (isset($input['name'])) {
            changeServerName($input['id'], $input['name']);
        } elseif (isset($input['uid'])) {
            changeServerUid($input['id'], $input['uid']);
        } elseif (isset($input['server_picture_path'])) {
            changeServerPicture($input['id'], $input['server_picture_path']);
        }
        break;
    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

function fetchServers() {
    global $conn;
    $uid = $_GET['uid'];
    $sql = "SELECT s.* FROM servers s
            JOIN server_member sm ON s.id = sm.server_id
            WHERE sm.user_id = '$uid' AND sm.is_owner = 1";
    // Debugging line
    error_log("Executing query: $sql");
    $result = $conn->query($sql);
    $servers = [];
    while ($row = $result->fetch_assoc()) {
        $servers[] = $row;
    }
    echo json_encode($servers);
}

function getServerInfo($id) {
    global $conn;
    $sql = "SELECT * FROM servers WHERE id = $id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(['error' => 'Server not found']);
    }
}

function deleteServer($id) {
    global $conn;
    $sql = "DELETE FROM servers WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Server deleted successfully']);
    } else {
        echo json_encode(['error' => 'Error deleting server: ' . $conn->error]);
    }
}

function changeServerName($id, $name) {
    global $conn;
    $sql = "UPDATE servers SET server_name = '$name' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Server name updated successfully']);
    } else {
        echo json_encode(['error' => 'Error updating server name: ' . $conn->error]);
    }
}

function changeServerUid($id, $uid) {
    global $conn;
    $newInviteLink = "morp.ru/$uid";
    $sql = "UPDATE servers SET uid = '$uid', invite_link = '$newInviteLink' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Server UID and invite link updated successfully']);
    } else {
        echo json_encode(['error' => 'Error updating server UID: ' . $conn->error]);
    }
}

function changeServerPicture($id, $server_picture_path) {
    global $conn;
    $sql = "UPDATE servers SET server_picture_path = '$server_picture_path' WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Server picture updated successfully']);
    } else {
        echo json_encode(['error' => 'Error updating server picture: ' . $conn->error]);
    }
}

$conn->close();
?>


