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
            $uploadFileDir = '../serverPictures/';
            $dest_path = $uploadFileDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $serverName = $_POST['serverName'] ?? '';
                $uid = $_POST['uid'] ?? '';

                // Check if server name and uid are provided
                if (empty($serverName) || empty($uid)) {
                    echo json_encode(['success' => false, 'message' => 'Please provide a server name and UID.']);
                    exit();
                }

                // Prepare a SQL statement to insert the new server
                $stmt = $conn->prepare("INSERT INTO Servers (uid, server_name, server_picture_path) VALUES (?, ?, ?)");
                
                if ($stmt === false) {
                    echo json_encode(['success' => false, 'message' => 'Failed to prepare the query.', 'error' => $conn->error]);
                    exit();
                }

                // Bind the parameters to the SQL query
                $stmt->bind_param('sss', $uid, $serverName, $newFileName);
                
                // Execute the query
                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Server created successfully.']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to create server.', 'error' => $stmt->error]);
                }

                // Close the statement
                $stmt->close();
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