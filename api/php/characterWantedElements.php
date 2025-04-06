<?php
include 'dbConnection.php'; // Include the database connection file

// Add CORS headers
header('Access-Control-Allow-Origin: ' . $_ENV['CORS_ORIGIN']); // Allow requests from your React app
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve server ID from the query parameter
    $serverId = isset($_GET['serverId']) ? intval($_GET['serverId']) : null;

    if ($serverId === null) {
        echo json_encode(['success' => false, 'message' => 'Server ID is required.']);
        exit();
    }

    // Fetch data from the user_character_need table
    $stmt = $conn->prepare("SELECT * FROM user_character_need WHERE server_id = ?");
    $stmt->bind_param('i', $serverId);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to fetch data: ' . $stmt->error]);
    }

    $stmt->close();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Parse the JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $serverId = $input['serverId'] ?? null;
    $fields = $input['fields'] ?? [];

    if ($serverId === null || empty($fields)) {
        echo json_encode(['success' => false, 'message' => 'Server ID and fields are required.']);
        exit();
    }

    // Build the SQL query dynamically
    $setClause = [];
    $params = [];
    $types = '';

    foreach ($fields as $field => $value) {
        $setClause[] = "$field = ?";
        $params[] = intval($value); // Ensure the value is an integer (0 or 1)
        $types .= 'i';
    }

    $params[] = $serverId;
    $types .= 'i';

    $sql = "UPDATE user_character_need SET " . implode(', ', $setClause) . " WHERE server_id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the query: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Data updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update data: ' . $stmt->error]);
    }

    $stmt->close();
    exit();
}

// Return error for unsupported request methods
echo json_encode(['success' => false, 'message' => 'Unsupported request method.']);
exit();
?>
