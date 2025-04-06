<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getServerInfo($_GET['id']);
        } else {
            fetchServers();
        }
        break;
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'])) {
            deleteServer($input['id']);
        } else {
            echo json_encode(['error' => 'Missing server ID']);
        }
        break;
    case 'POST':
        if (isset($_POST['id'])) {
            updateServerData();
        } else {
            echo json_encode(['error' => 'Missing server ID']);
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
    $sql = "DELETE FROM server_member WHERE server_id = $id";
    if ($conn->query($sql) === TRUE) {
        $sql = "DELETE FROM servers WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Server deleted successfully']);
        } else {
            echo json_encode(['error' => 'Error deleting server: ' . $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'Error deleting server members: ' . $conn->error]);
    }
}

function updateServerData() {
    global $conn;

    $id = $_POST['id'];
    $server_name = isset($_POST['server_name']) ? $conn->real_escape_string($_POST['server_name']) : null;
    $uid = isset($_POST['uid']) ? $conn->real_escape_string($_POST['uid']) : null;
    $server_picture_path = null;

    // Check if the UID is already taken by another server
    if ($uid !== null) {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM servers WHERE uid = ? AND id != ?");
        if ($stmt === false) {
            echo json_encode(['error' => 'Failed to prepare the query to check UID: ' . $conn->error]);
            return;
        }

        $stmt->bind_param('si', $uid, $id);
        $stmt->execute();
        $stmt->bind_result($uidCount);
        $stmt->fetch();
        $stmt->close();

        if ($uidCount > 0) {
            echo json_encode(['error' => 'The UID is already taken. Please choose a different UID.']);
            return;
        }
    }

    // Handle file upload
    if (isset($_FILES['server_picture']) && $_FILES['server_picture']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['server_picture']['tmp_name'];
        $fileName = $_FILES['server_picture']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Sanitize file name
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        // Check if the file extension is allowed
        $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
        if (in_array($fileExtension, $allowedfileExtensions)) {
            $uploadFileDir = '../../storage/images/serverPictures/';
            $dest_path = $uploadFileDir . $newFileName;

            // Debugging logs
            error_log("Temporary file path: " . $fileTmpPath);
            error_log("Destination path: " . $dest_path);

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $server_picture_path = $newFileName;
            } else {
                error_log("Error moving uploaded file.");
                echo json_encode(['error' => 'There was an error moving the uploaded file.']);
                return;
            }
        } else {
            error_log("Invalid file extension: " . $fileExtension);
            echo json_encode(['error' => 'Upload failed. Allowed file types: ' . implode(',', $allowedfileExtensions)]);
            return;
        }
    }

    // Update server data
    $updateFields = [];
    if ($server_name !== null) {
        $updateFields[] = "server_name = '$server_name'";
    }
    if ($uid !== null) {
        $newInviteLink = "morp.ru/$uid";
        $updateFields[] = "uid = '$uid', invite_link = '$newInviteLink'";
    }
    if ($server_picture_path !== null) {
        $updateFields[] = "server_picture_path = '$server_picture_path'";
    }

    if (!empty($updateFields)) {
        $sql = "UPDATE servers SET " . implode(', ', $updateFields) . " WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Server data updated successfully', 'server_picture_path' => $server_picture_path]);
        } else {
            echo json_encode(['error' => 'Error updating server data: ' . $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'No valid fields to update']);
    }
}

$conn->close();
?>


