<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($conn->connect_error) {
    $response['error'] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Get the posted data
$data = $_POST;

// Validate and assign data
$name = isset($data['name']) ? $data['name'] : null;
$gender = isset($data['gender']) ? $data['gender'] : null;
$species = isset($data['species']) ? $data['species'] : null;
$status = isset($data['status']) ? $data['status'] : null;
$user_id = isset($data['user_id']) ? $data['user_id'] : null;
$affilation = isset($data['affilation']) ? $data['affilation'] : null;
$nationality = isset($data['nationality']) ? $data['nationality'] : null;
$occupation = isset($data['occupation']) ? $data['occupation'] : null;
$fctype = isset($data['fc_type']) ? $data['fc_type'] : null;
$server_id = isset($data['server_id']) ? $data['server_id'] : null;
$character_pic_path = isset($_FILES['character_pic_path']) ? $_FILES['character_pic_path'] : null;

// Initialize character_pic_path
$character_pic_path = null;

// Handle file upload
if (isset($_FILES['character_pic_path']) && $_FILES['character_pic_path']['error'] === UPLOAD_ERR_OK) {
    // Handle file upload
    $fileTmpPath = $_FILES['character_pic_path']['tmp_name'];
    $fileName = $_FILES['character_pic_path']['name'];
    $fileSize = $_FILES['character_pic_path']['size'];
    $fileType = $_FILES['character_pic_path']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));

    // Sanitize file name
    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

    // Check if the file extension is allowed
    $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg');
    if (in_array($fileExtension, $allowedfileExtensions)) {
        // Directory in which the uploaded file will be moved
        $uploadFileDir = '../../storage/images/characterPictures/';
        $dest_path = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            // Update the character_pic_path
            $character_pic_path = $newFileName;
        } else {
            echo json_encode(["success" => false, "message" => "There was an error moving the uploaded file."]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed. Allowed file types: " . implode(',', $allowedfileExtensions)]);
        exit();
    }
}

// Get the server member ID
$serverMemberQuery = "SELECT id FROM server_member WHERE user_id = ? AND server_id = ?";
$stmt = $conn->prepare($serverMemberQuery);
$stmt->bind_param("si", $user_id, $server_id);
$stmt->execute();
$serverMemberResult = $stmt->get_result();
if ($serverMemberResult->num_rows > 0) {
    $servermember_id = $serverMemberResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Server member not found.";
    echo json_encode($response);
    exit();
}

// Get the IDs for gender, species, and status
$genderQuery = "SELECT id FROM gender WHERE gender = '$gender'";
$genderResult = $conn->query($genderQuery);
if ($genderResult && $genderResult->num_rows > 0) {
    $genderId = $genderResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Gender not found.";
    echo json_encode($response);
    exit();
}

$speciesQuery = "SELECT id FROM character_species WHERE species = '$species'";
$speciesResult = $conn->query($speciesQuery);
if ($speciesResult && $speciesResult->num_rows > 0) {
    $speciesId = $speciesResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Species not found.";
    echo json_encode($response);
    exit();
}

$affilationQuery = "SELECT id FROM affilation WHERE affilation = '$affilation'";
$affilationResult = $conn->query($affilationQuery);
if ($affilationResult && $affilationResult->num_rows > 0) {
    $affilationId = $affilationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Affiliation not found.";
    echo json_encode($response);
    exit();
}

$nationalityQuery = "SELECT id FROM nationality WHERE nationality = '$nationality'";
$nationalityResult = $conn->query($nationalityQuery);
if ($nationalityResult && $nationalityResult->num_rows > 0) {
    $nationalityId = $nationalityResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Nationality not found.";
    echo json_encode($response);
    exit();
}

$occupationQuery = "SELECT id FROM occupation WHERE occupation = '$occupation'";
$occupationResult = $conn->query($occupationQuery);
if ($occupationResult && $occupationResult->num_rows > 0) {
    $occupationId = $occupationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Occupation not found.";
    echo json_encode($response);
    exit();
}

$fctypeQuery = "SELECT id FROM character_fc WHERE fc_type = '$fctype'";
$fctypeResult = $conn->query($fctypeQuery);
if ($fctypeResult && $fctypeResult->num_rows > 0) {
    $fctypeId = $fctypeResult->fetch_assoc()['id'];
} else {
    $response['error'] = "FC Type not found.";
    echo json_encode($response);
    exit();
}

$statusQuery = "SELECT id FROM character_status WHERE status = '$status'";
$statusResult = $conn->query($statusQuery);
if ($statusResult && $statusResult->num_rows > 0) {
    $statusId = $statusResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Status not found.";
    echo json_encode($response);
    exit();
}

// Insert the character data
$query = "INSERT INTO user_character (character_name, gender_id, species_id, status_id, affilation_id, nationality_id, occupation_id, fc_type_id, servermember_id, character_pic_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error);
    $response['error'] = "Failed to prepare statement.";
    echo json_encode($response);
    exit();
}
$stmt->bind_param("siiiiiiiis", $name, $genderId, $speciesId, $statusId, $affilationId, $nationalityId, $occupationId, $fctypeId, $servermember_id, $character_pic_path);

if ($stmt->execute()) {
    $response['success'] = "Character saved successfully!";
    $response['character'] = [
        'id' => $stmt->insert_id,
        'name' => $name,
        'gender' => $gender,
        'species' => $species,
        'affilation' => $affilation,
        'nationality' => $nationality,
        'occupation' => $occupation,
        'fc_type' => $fctype,
        'status' => $status,
        'character_pic_path' => $character_pic_path,
        'is_verified' => 0, // Not approved yet
        'servermember_id' => $servermember_id
    ];
} else {
    error_log("Error inserting character: " . $stmt->error);
    $response['error'] = "Error: " . $stmt->error;
}

echo json_encode($response);

$conn->close();
?>