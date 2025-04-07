<?php
include 'dbConnection.php'; // Include the database connection file

// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve user ID from the query parameter
    $userId = isset($_GET['userId']) ? trim($_GET['userId'], '"') : null;
    //var userId = localStorage.getItem('morp-login-user');

    error_log("User ID: " . $userId);
    

    if ($userId === null) {
        echo json_encode(['success' => false, 'message' => 'User not logged in.']);
        exit();
    }

    // Check if the file was uploaded without errors
    if (isset($_FILES['serverIcon']) && $_FILES['serverIcon']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['serverIcon']['tmp_name'];
        $fileName = $_FILES['serverIcon']['name'];
        $fileSize = $_FILES['serverIcon']['size'];
        $fileType = $_FILES['serverIcon']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Sanitize file name
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        // Check if the file extension is allowed
        $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
        if (in_array($fileExtension, $allowedfileExtensions)) {
            // Directory in which the uploaded file will be moved
            $uploadFileDir = '../../storage/images/serverPictures/';
            $dest_path = $uploadFileDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $serverName = $_POST['serverName'] ?? '';
                $uid = $_POST['uid'] ?? '';

                // Check if server name and uid are provided
                if (empty($serverName) || empty($uid)) {
                    echo json_encode(['success' => false, 'message' => 'Please provide a server name and UID.']);
                    exit();
                }

                // Check if the UID is already taken
                $stmt = $conn->prepare("SELECT COUNT(*) FROM servers WHERE uid = ?");
                if ($stmt === false) {
                    echo json_encode(['success' => false, 'message' => 'Failed to prepare the query to check UID: ' . $conn->error]);
                    exit();
                }

                $stmt->bind_param('s', $uid);
                $stmt->execute();
                $stmt->bind_result($uidCount);
                $stmt->fetch();
                $stmt->close();

                if ($uidCount > 0) {
                    echo json_encode(['success' => false, 'message' => 'The UID is already taken. Please choose a different UID.']);
                    exit();
                }

                // Generate the invite link
                $inviteLink = 'morp.ru/' . $uid;

                // Start a transaction
                $conn->begin_transaction();

                try {
                    // Prepare a SQL statement to insert the new server
                    $stmt = $conn->prepare("INSERT INTO servers (uid, server_name, server_picture_path, invite_link) VALUES (?, ?, ?, ?)");
                    
                    if ($stmt === false) {
                        throw new Exception('Failed to prepare the query: ' . $conn->error);
                    }

                    // Bind the parameters to the SQL query
                    $stmt->bind_param('ssss', $uid, $serverName, $newFileName, $inviteLink);
                    
                    // Execute the query
                    if (!$stmt->execute()) {
                        throw new Exception('Failed to create server: ' . $stmt->error);
                    }

                    // Get the ID of the newly created server
                    $serverId = $stmt->insert_id;

                    // Close the statement
                    $stmt->close();

                    // Prepare a SQL statement to insert a row into the user_character_need table
                    $stmt = $conn->prepare("INSERT INTO user_character_need (server_id) VALUES (?)");
                    
                    if ($stmt === false) {
                        throw new Exception('Failed to prepare the query for user_character_need: ' . $conn->error);
                    }

                    // Bind the parameters to the SQL query
                    $stmt->bind_param('i', $serverId);
                    
                    // Execute the query
                    if (!$stmt->execute()) {
                        throw new Exception('Failed to insert into user_character_need: ' . $stmt->error);
                    }

                    // Close the statement
                    $stmt->close();

                    // Prepare a SQL statement to insert the user as a server member, owner, and moderator
                    $stmt = $conn->prepare("INSERT INTO server_member (user_id, server_id, is_owner, is_moderator) VALUES (?, ?, ?, ?)");
                    
                    if ($stmt === false) {
                        throw new Exception('Failed to prepare the query: ' . $conn->error);
                    }

                    // Bind the parameters to the SQL query
                    $isOwner = 1;
                    $isModerator = 1;
                    $stmt->bind_param('siii', $userId, $serverId, $isOwner, $isModerator);
                    
                    // Execute the query
                    if (!$stmt->execute()) {
                        throw new Exception('Failed to add user as server member: ' . $stmt->error);
                    }

                    // Close the statement
                    $stmt->close();

                    // Commit the transaction
                    $conn->commit();

                    echo json_encode(['success' => true, 'message' => 'Server created successfully.', 'inviteLink' => $inviteLink]);
                } catch (Exception $e) {
                    // Rollback the transaction
                    $conn->rollback();

                    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'There was an error moving the uploaded file.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Upload failed. Allowed file types: ' . implode(',', $allowedfileExtensions)]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'There was an error uploading the file.']);
    }

    exit();
}

// Return error for unsupported request methods
echo json_encode(['success' => false, 'message' => 'Unsupported request method.']);
exit();
?>