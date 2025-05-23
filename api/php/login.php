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
    // Get the email and password from the POST request
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Check if email and password are provided
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please provide both email and password.']);
        exit();
    }

    // Prepare a SQL statement to retrieve the user by email
    $stmt = $conn->prepare("SELECT uid, password, verified, timeout_until, isBanned FROM users WHERE email = ?");
    
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the query.']);
        exit();
    }

    // Bind the email parameter to the SQL query
    $stmt->bind_param('s', $email);
    
    // Execute the query
    $stmt->execute();
    
    // Get the result
    $result = $stmt->get_result();
    
    // Check if a user was found with the provided email
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
        exit();
    }

    // Fetch the user's data (uid, hashed password, verified status, timeout_until, and isBanned)
    $user = $result->fetch_assoc();

    // Check if the user is banned
    if ($user['isBanned'] == 1) {
        echo json_encode(['success' => false, 'message' => 'Your account has been banned.']);
        exit();
    }

    // Check if the user is timed out
    if (!is_null($user['timeout_until']) && strtotime($user['timeout_until']) > time()) {
        echo json_encode(['success' => false, 'message' => 'You are timed out until ' . $user['timeout_until'] . '.']);
        exit();
    }

    // Verify the provided password against the stored hashed password
    if (password_verify($password, $user['password'])) {
        if ($user['verified'] !== 1) {
            echo json_encode(['success' => false, 'message' => 'Account not verified.']);
            exit();
        }
        // If password is correct, return success with the user's unique ID (uid)
        echo json_encode(['success' => true, 'uid' => $user['uid']]);
    } else {
        // If the password is incorrect
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }

    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
} else {
    // If the request method is not POST, return an error
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>