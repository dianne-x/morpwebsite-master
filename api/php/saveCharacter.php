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
$name = isset($data['name']) && $data['name'] !== "" ? $data['name'] : null;
$nickname = isset($data['nickname']) && $data['nickname'] !== "" ? $data['nickname'] : null; // Add nickname to data
$gender = isset($data['gender']) && $data['gender'] !== "" ? $data['gender'] : null;
$species = isset($data['species']) && $data['species'] !== "" ? $data['species'] : null;
$status = isset($data['status']) && $data['status'] !== "" ? $data['status'] : null;
$user_id = isset($data['user_id']) && $data['user_id'] !== "" ? $data['user_id'] : null;
$affiliation = isset($data['affiliation']) && $data['affiliation'] !== "" ? $data['affiliation'] : null;
$nationality = isset($data['nationality']) && $data['nationality'] !== "" ? $data['nationality'] : null;
$occupation = isset($data['occupation']) && $data['occupation'] !== "" ? $data['occupation'] : null;
$fctype = isset($data['fc_type']) && $data['fc_type'] !== "" ? $data['fc_type'] : null;
$fcname = isset($data['fc_name']) && $data['fc_name'] !== "" ? $data['fc_name'] : null; // Ensure fc_name is assigned
$server_id = isset($data['server_id']) && $data['server_id'] !== "" ? $data['server_id'] : null;
$character_pic_path = isset($_FILES['character_pic_path']) ? $_FILES['character_pic_path'] : null;
$is_own_character = isset($data['is_own_character']) ? (filter_var($data['is_own_character'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0;

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
$genderId = null;
if ($gender !== null) {
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
}

$speciesId = null;
if ($species !== null) {
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
}

// Repeat similar logic for affiliation, nationality, occupation, fc_type, and status
$affiliationId = null;
if ($affiliation !== null) {
    $affiliationQuery = "SELECT id FROM affiliation WHERE affiliation = ?";
    $stmt = $conn->prepare($affiliationQuery);
    $stmt->bind_param("s", $affiliation);
    $stmt->execute();
    $affiliationResult = $stmt->get_result();
    if ($affiliationResult && $affiliationResult->num_rows > 0) {
        $affiliationId = $affiliationResult->fetch_assoc()['id'];
    } else {
        $response['error'] = "Affiliation not found.";
        echo json_encode($response);
        exit();
    }
}

$nationalityId = null;
if ($nationality !== null) {
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
}

$occupationId = null;
if ($occupation !== null) {
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
}

$fctypeId = null;
if ($fctype !== null) {
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
}

$statusId = null;
if ($status !== null) {
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
}

$birthdate = isset($data['birthdate']) && !empty($data['birthdate']) ? date('Y-m-d', strtotime($data['birthdate'])) : null;
$died = isset($data['died']) ? filter_var($data['died'], FILTER_VALIDATE_BOOLEAN) : false;
$deathdate = isset($data['deathdate']) && !empty($data['deathdate']) ? date('Y-m-d', strtotime($data['deathdate'])) : null;
$resurrected = isset($data['resurrected']) ? filter_var($data['resurrected'], FILTER_VALIDATE_BOOLEAN) : false;
$resurrected_date = isset($data['resurrected_date']) && !empty($data['resurrected_date']) ? date('Y-m-d', strtotime($data['resurrected_date'])) : null;
$bio = isset($data['bio']) ? $data['bio'] : null;
$powers = isset($data['powers']) ? $data['powers'] : null;
$weaknesses = isset($data['weaknesses']) ? $data['weaknesses'] : null;
$used_item = isset($data['used_item']) ? $data['used_item'] : null;
$family = isset($data['family']) ? $data['family'] : null;
$universe = isset($data['universe']) ? $data['universe'] : null;

// Handle aliases
$aliases = isset($data['aliases']) ? json_decode($data['aliases'], true) : [];
$alias_pics = isset($_FILES['alias_pics']) ? $_FILES['alias_pics'] : [];

// Insert the character data
$query = "INSERT INTO user_character (character_name, nickname, gender_id, species_id, status_id, affiliation_id, nationality_id, occupation_id, fc_type_id, fc_name, servermember_id, character_pic_path, birthdate, died, deathdate, resurrected, resurrected_date, bio, powers, weaknesses, used_item, family, universe, is_own_character) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
if (!$stmt) {
    error_log("Failed to prepare statement: " . $conn->error);
    $response['error'] = "Failed to prepare statement.";
    echo json_encode($response);
    exit();
}
$stmt->bind_param("ssiiiiiiisissssssssssssi", $name, $nickname, $genderId, $speciesId, $statusId, $affiliationId, $nationalityId, $occupationId, $fctypeId, $fcname, $servermember_id, $character_pic_path, $birthdate, $died, $deathdate, $resurrected, $resurrected_date, $bio, $powers, $weaknesses, $used_item, $family, $universe, $is_own_character);

if (!$stmt->execute()) {
    error_log("Error executing statement: " . $stmt->error);
    $response['error'] = "Error executing statement.";
    echo json_encode($response);
    exit();
}

$character_id = $stmt->insert_id;

$response['success'] = "Character saved successfully!";
$response['character'] = [
    'id' => $character_id,
    'name' => $name,
    'nickname' => $nickname, // Add nickname to response
    'gender' => $gender,
    'species' => $species,
    'affiliation' => $affiliation,
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
    'servermember_id' => $servermember_id,
    'is_own_character' => $is_own_character
];

// Save aliases
foreach ($aliases as $index => $alias) {
    $alias_name = $alias['name'];
    $alias_pic_path = null;

    if (isset($alias_pics['name'][$index]) && $alias_pics['error'][$index] === UPLOAD_ERR_OK) {
        $fileTmpPath = $alias_pics['tmp_name'][$index];
        $fileName = $alias_pics['name'][$index];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
        $uploadFileDir = '../../storage/images/aliasPictures/';
        $dest_path = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $alias_pic_path = $newFileName;
        }
    }

    $aliasQuery = "INSERT INTO alias_character (character_id, name, character_pic_path) VALUES (?, ?, ?)";
    $aliasStmt = $conn->prepare($aliasQuery);
    $aliasStmt->bind_param("iss", $character_id, $alias_name, $alias_pic_path);
    $aliasStmt->execute();
}

echo json_encode($response);

$conn->close();
?>