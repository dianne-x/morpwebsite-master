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
$characterId = isset($data['id']) ? intval($data['id']) : null;
$name = isset($data['name']) ? $data['name'] : null;
$gender = isset($data['gender']) ? $data['gender'] : null;
$species = isset($data['species']) ? $data['species'] : null;
$status = isset($data['status']) ? $data['status'] : null;
$user_id = isset($data['user_id']) ? $data['user_id'] : null;
$affilation = isset($data['affilation']) ? $data['affilation'] : null;
$nationality = isset($data['nationality']) ? $data['nationality'] : null;
$occupation = isset($data['occupation']) ? $data['occupation'] : null;
$fctype = isset($data['fc_type']) ? $data['fc_type'] : null;
$fcname = isset($data['fc_name']) ? $data['fc_name'] : null;
$server_id = isset($data['server_id']) ? $data['server_id'] : null; // Ensure server_id is set
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

// Log user_id and server_id for debugging
error_log("user_id: $user_id, server_id: $server_id");

// Get the server member ID
$serverMemberQuery = "SELECT id FROM server_member WHERE user_id = ? AND server_id = ?";
$stmt = $conn->prepare($serverMemberQuery);
if (!$stmt) {
    error_log("Failed to prepare server member query: " . $conn->error);
    $response['error'] = "Failed to prepare server member query.";
    echo json_encode($response);
    exit();
}
$stmt->bind_param("si", $user_id, $server_id); // Ensure server_id is used in the query
$stmt->execute();
$serverMemberResult = $stmt->get_result();
if ($serverMemberResult->num_rows > 0) {
    $servermember_id = $serverMemberResult->fetch_assoc()['id'];
} else {
    error_log("Server member not found for user_id: $user_id and server_id: $server_id");
    $response['error'] = "Server member not found.";
    echo json_encode($response);
    exit();
}

// Get the IDs for gender, species, and status
$genderQuery = "SELECT id FROM gender WHERE gender = ?";
$stmt = $conn->prepare($genderQuery);
$stmt->bind_param("s", $gender);
$stmt->execute();
$genderResult = $stmt->get_result();
if ($genderResult && $genderResult->num_rows > 0) {
    $genderId = $genderResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Gender not found.";
    echo json_encode($response);
    exit();
}

$speciesQuery = "SELECT id FROM character_species WHERE species = ?";
$stmt = $conn->prepare($speciesQuery);
$stmt->bind_param("s", $species);
$stmt->execute();
$speciesResult = $stmt->get_result();
if ($speciesResult && $speciesResult->num_rows > 0) {
    $speciesId = $speciesResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Species not found.";
    echo json_encode($response);
    exit();
}

$affilationQuery = "SELECT id FROM affilation WHERE affilation = ?";
$stmt = $conn->prepare($affilationQuery);
$stmt->bind_param("s", $affilation);
$stmt->execute();
$affilationResult = $stmt->get_result();
if ($affilationResult && $affilationResult->num_rows > 0) {
    $affilationId = $affilationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Affiliation not found.";
    echo json_encode($response);
    exit();
}

$nationalityQuery = "SELECT id FROM nationality WHERE nationality = ?";
$stmt = $conn->prepare($nationalityQuery);
$stmt->bind_param("s", $nationality);
$stmt->execute();
$nationalityResult = $stmt->get_result();
if ($nationalityResult && $nationalityResult->num_rows > 0) {
    $nationalityId = $nationalityResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Nationality not found.";
    echo json_encode($response);
    exit();
}

$occupationQuery = "SELECT id FROM occupation WHERE occupation = ?";
$stmt = $conn->prepare($occupationQuery);
$stmt->bind_param("s", $occupation);
$stmt->execute();
$occupationResult = $stmt->get_result();
if ($occupationResult && $occupationResult->num_rows > 0) {
    $occupationId = $occupationResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Occupation not found.";
    echo json_encode($response);
    exit();
}

$fctypeQuery = "SELECT id FROM character_fc WHERE fc_type = ?";
$stmt = $conn->prepare($fctypeQuery);
$stmt->bind_param("s", $fctype);
$stmt->execute();
$fctypeResult = $stmt->get_result();
if ($fctypeResult && $fctypeResult->num_rows > 0) {
    $fctypeId = $fctypeResult->fetch_assoc()['id'];
} else {
    $response['error'] = "FC Type not found.";
    echo json_encode($response);
    exit();
}

$statusQuery = "SELECT id FROM character_status WHERE status = ?";
$stmt = $conn->prepare($statusQuery);
$stmt->bind_param("s", $status);
$stmt->execute();
$statusResult = $stmt->get_result();
if ($statusResult && $statusResult->num_rows > 0) {
    $statusId = $statusResult->fetch_assoc()['id'];
} else {
    $response['error'] = "Status not found.";
    echo json_encode($response);
    exit();
}

$birthdate = isset($data['birthdate']) ? date('Y-m-d', strtotime($data['birthdate'])) : null;
$died = isset($data['died']) ? (filter_var($data['died'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0;
$deathdate = isset($data['deathdate']) ? date('Y-m-d', strtotime($data['deathdate'])) : null;
$resurrected = isset($data['resurrected']) ? (filter_var($data['resurrected'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0;
$resurrected_date = isset($data['resurrected_date']) ? date('Y-m-d', strtotime($data['resurrected_date'])) : null;
$bio = isset($data['bio']) ? $data['bio'] : null;
$powers = isset($data['powers']) ? $data['powers'] : null;
$weaknesses = isset($data['weaknesses']) ? $data['weaknesses'] : null;
$used_item = isset($data['used_item']) ? $data['used_item'] : null;
$family = isset($data['family']) ? $data['family'] : null;
$universe = isset($data['universe']) ? $data['universe'] : null;

// Update the character data
$query = "UPDATE user_character SET character_name = ?, gender_id = ?, species_id = ?, status_id = ?, affilation_id = ?, nationality_id = ?, occupation_id = ?, fc_type_id = ?, fc_name = ?, servermember_id = ?, character_pic_path = ?, birthdate = ?, died = ?, deathdate = ?, resurrected = ?, resurrected_date = ?, bio = ?, powers = ?, weaknesses = ?, used_item = ?, family = ?, universe = ?, is_verified = 0 WHERE id = ?";
$stmt = $conn->prepare($query);
if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error);
    $response['error'] = "Failed to prepare statement.";
    echo json_encode($response);
    exit();
}
$stmt->bind_param("siiiiiiisisissssssssssi", $name, $genderId, $speciesId, $statusId, $affilationId, $nationalityId, $occupationId, $fctypeId, $fcname, $servermember_id, $character_pic_path, $birthdate, $died, $deathdate, $resurrected, $resurrected_date, $bio, $powers, $weaknesses, $used_item, $family, $universe, $characterId);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['character'] = [
        'id' => $characterId,
        'name' => $name,
        'gender' => $gender,
        'species' => $species,
        'affilation' => $affilation,
        'nationality' => $nationality,
        'occupation' => $occupation,
        'fc_type' => $fctype,
        'fc_name' => $fcname,
        'status' => $status,
        'character_pic_path' => $character_pic_path,
        'birthdate' => $birthdate,
        'died' => $died,
        'deathdate' => $deathdate,
        'resurrected' => $resurrected,
        'resurrected_date' => $resurrected_date,
        'bio' => $bio,
        'powers' => $powers,
        'weaknesses' => $weaknesses,
        'used_item' => $used_item,
        'family' => $family,
        'universe' => $universe,
        'is_verified' => 0, // Not approved yet
        'servermember_id' => $servermember_id
    ];
} else {
    error_log("Error updating character: " . $stmt->error);
    $response['success'] = false;
    $response['error'] = "Error: " . $stmt->error;
}

echo json_encode($response);

$conn->close();
?>
