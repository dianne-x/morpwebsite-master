<?php
require 'dbConnection.php'; // Include the database connection file

// CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow POST method
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit();
}

// Parse the character_id from the URL
parse_str($_SERVER['QUERY_STRING'], $queryParams);
$character_id = isset($queryParams['character_id']) ? intval($queryParams['character_id']) : null;

if (!$character_id) {
    echo json_encode(['success' => false, 'error' => 'Character ID is required.']);
    exit();
}

// Parse JSON data
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data.']);
    exit();
}

// Validate and assign data
$name = $data['name'] ?? null;
$nickname = $data['nickname'] ?? null;
$gender = $data['gender'] ?? null;
$species = $data['species'] ?? null;
$status = $data['status'] ?? null;
$affiliation = $data['affiliation'] ?? null;
$nationality = $data['nationality'] ?? null;
$occupation = $data['occupation'] ?? null;
$fctype = $data['fc_type'] ?? null;
$fcname = $data['fc_name'] ?? null;
$birthdate = isset($data['birthdate']) ? date('Y-m-d', strtotime($data['birthdate'])) : null;
$died = isset($data['died']) ? filter_var($data['died'], FILTER_VALIDATE_BOOLEAN) : false;
$deathdate = isset($data['deathdate']) ? date('Y-m-d', strtotime($data['deathdate'])) : null;
$resurrected = isset($data['resurrected']) ? filter_var($data['resurrected'], FILTER_VALIDATE_BOOLEAN) : false;
$resurrected_date = isset($data['resurrected_date']) ? date('Y-m-d', strtotime($data['resurrected_date'])) : null;
$bio = $data['bio'] ?? null;
$powers = $data['powers'] ?? null;
$weaknesses = $data['weaknesses'] ?? null;
$used_item = $data['used_item'] ?? null;
$family = $data['family'] ?? null;
$universe = $data['universe'] ?? null;
$is_own_character = isset($data['is_own_character']) ? (filter_var($data['is_own_character'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0;

// Fetch IDs for gender, species, status, etc.
function fetchId($conn, $table, $column, $value) {
    if ($value === null) return null;
    $query = "SELECT id FROM $table WHERE $column = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        error_log("Failed to prepare statement for $table: " . $conn->error);
        return null;
    }
    $stmt->bind_param("s", $value);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        return $result->fetch_assoc()['id'];
    } else {
        error_log("Value '$value' not found in table '$table'.");
        return null;
    }
}

$genderId = fetchId($conn, 'gender', 'gender', $gender);
$speciesId = fetchId($conn, 'character_species', 'species', $species);
$statusId = fetchId($conn, 'character_status', 'status', $status);
$affiliationId = fetchId($conn, 'affiliation', 'affiliation', $affiliation);
$nationalityId = fetchId($conn, 'nationality', 'nationality', $nationality);
$occupationId = fetchId($conn, 'occupation', 'occupation', $occupation);
$fctypeId = fetchId($conn, 'character_fc', 'fc_type', $fctype);

// Update the character data
$query = "UPDATE user_character 
          SET character_name = ?, nickname = ?, gender_id = ?, species_id = ?, status_id = ?, affiliation_id = ?, nationality_id = ?, occupation_id = ?, fc_type_id = ?, fc_name = ?, birthdate = ?, died = ?, deathdate = ?, resurrected = ?, resurrected_date = ?, bio = ?, powers = ?, weaknesses = ?, used_item = ?, family = ?, universe = ?, is_own_character = ?, is_verified = 0
          WHERE id = ?";
$stmt = $conn->prepare($query);
if (!$stmt) {
    error_log("Failed to prepare update statement: " . $conn->error);
    echo json_encode(['success' => false, 'error' => 'Failed to prepare update statement.']);
    exit();
}
$stmt->bind_param("ssiiiiiiissisisssssssii", $name, $nickname, $genderId, $speciesId, $statusId, $affiliationId, $nationalityId, $occupationId, $fctypeId, $fcname, $birthdate, $died, $deathdate, $resurrected, $resurrected_date, $bio, $powers, $weaknesses, $used_item, $family, $universe, $is_own_character, $character_id);

if ($stmt->execute()) {
    // Fetch the updated character data
    $fetchQuery = "SELECT uc.id, uc.character_name AS name, uc.nickname, g.gender, cs.species, s.status, a.affiliation, n.nationality, o.occupation, fc.fc_type, uc.fc_name, uc.character_pic_path, uc.birthdate, uc.died, uc.deathdate, uc.resurrected, uc.resurrected_date, uc.bio, uc.powers, uc.weaknesses, uc.used_item, uc.family, uc.universe, uc.is_own_character, uc.is_verified
                   FROM user_character uc
                   LEFT JOIN gender g ON uc.gender_id = g.id
                   LEFT JOIN character_species cs ON uc.species_id = cs.id
                   LEFT JOIN character_status s ON uc.status_id = s.id
                   LEFT JOIN affiliation a ON uc.affiliation_id = a.id
                   LEFT JOIN nationality n ON uc.nationality_id = n.id
                   LEFT JOIN occupation o ON uc.occupation_id = o.id
                   LEFT JOIN character_fc fc ON uc.fc_type_id = fc.id
                   WHERE uc.id = ?";
    $fetchStmt = $conn->prepare($fetchQuery);
    $fetchStmt->bind_param("i", $character_id);
    $fetchStmt->execute();
    $result = $fetchStmt->get_result();

    if ($result && $result->num_rows > 0) {
        $updatedCharacter = $result->fetch_assoc();
        echo json_encode(['success' => true, 'message' => 'Character updated successfully!', 'character' => $updatedCharacter]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to fetch updated character data.']);
    }
} else {
    error_log("Error executing update statement: " . $stmt->error);
    echo json_encode(['success' => false, 'error' => 'Failed to update character.']);
}

$conn->close();
?>