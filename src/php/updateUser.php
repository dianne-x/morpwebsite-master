<?php

require 'dbConnection.php'; // Include the database connection file

// CORS Headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // If the request method is OPTIONS, return 200 OK with CORS headers
    http_response_code(200);
    exit();
}

// Ensure the response is JSON
header('Content-Type: application/json');

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Initialize profile_pic_path
$profile_pic_path = null;

// Check if the request is a multipart form data
if (isset($_FILES['profile_pic'])) {
    // Extract user data from POST request
    $name = $_POST['name'];
    $email = $_POST['email'];
    $nickname = $_POST['nickname'];
    $about_me = $_POST['about_me'];

    // Handle file upload
    if ($_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['profile_pic']['tmp_name'];
        $fileName = $_FILES['profile_pic']['name'];
        $fileSize = $_FILES['profile_pic']['size'];
        $fileType = $_FILES['profile_pic']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Sanitize file name
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        // Check if the file extension is allowed
        $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
        if (in_array($fileExtension, $allowedfileExtensions)) {
            // Directory in which the uploaded file will be moved
            $uploadFileDir = '../pictureData/userPictures/';
            $dest_path = $uploadFileDir . $newFileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Update the profile_pic_path in the database
                $profile_pic_path = $newFileName;
                $stmt = $conn->prepare("UPDATE users SET name=?, nickname=?, about_me=?, profile_pic_path=? WHERE email=?");
                $stmt->bind_param("sssss", $name, $nickname, $about_me, $profile_pic_path, $email);
            } else {
                echo json_encode(["success" => false, "message" => "There was an error moving the uploaded file."]);
                exit();
            }
        } else {
            echo json_encode(["success" => false, "message" => "Upload failed. Allowed file types: " . implode(',', $allowedfileExtensions)]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "There was an error uploading the file."]);
        exit();
    }
} else {
    // Get the JSON data from the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Ensure required data exists and is valid (without the "id")
    if (!isset($data['name'], $data['email'], $data['nickname'], $data['about_me'])) {
        echo json_encode(["message" => "Invalid input data"]);
        exit();
    }

    // Extract user data (without the "id")
    $name = $data['name'];
    $email = $data['email'];
    $nickname = $data['nickname'];
    $about_me = $data['about_me'];

    // Update without changing the profile picture
    $stmt = $conn->prepare("UPDATE users SET name=?, nickname=?, about_me=? WHERE email=?");
    $stmt->bind_param("ssss", $name, $nickname, $about_me, $email);
}

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User data updated successfully", "profile_pic_path" => $profile_pic_path]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating user data: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>
