<?php
include 'dbConnection.php'; // Include the database connection file
include 'mailConfig.php'; // Include the mail configuration file

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
    // Get the email from the POST request
    $email = $_POST['email'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("SELECT email, uid, verified FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // 's' indicates the parameter is a string
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the email exists in the database
    if ($result->num_rows > 0) {
        // Fetch the result as an associative array
        $row = $result->fetch_assoc();
        $uid = $row['uid'];
        $verified = $row['verified'];

        if ($verified != '1') {
            echo json_encode(['success' => false, 'message' => 'Email not verified.']);
            exit;
        }

        // Send email to user
        $subject = "MORP - Password change request";
        $message = "You have requested a password change. Click the link below to reset your password: <a href=\"{$_ENV['PHP_FOLDER']}/passwordchange.php?uid=$uid\">here</a>";

        // Use the mail function to send the email
        sendMail($email, $subject, $message);
        echo json_encode(['success' => true, 'message' => 'Confirmation email sent.']);
    } else {
        // Email does not exist
        echo json_encode(['success' => false, 'message' => 'Email not found.']);
    }

    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
