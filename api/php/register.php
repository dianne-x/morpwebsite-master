<?php
include 'dbConnection.php'; // Include the database connection file
include 'strongPassword.php'; // Include the strong password function
include 'mailConfig.php'; // Include the mail configuration file


// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    exit(0);
}


function uid() {
    return bin2hex(random_bytes(16));
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordAgain = $_POST['passwordAgain'];

    $errors = [];

    // Check if name is empty
    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }

    // Check if email is valid
    if (empty($email)) {
        $errors['email'] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format.';
    }

    // Check if password is strong enough
    if (empty($password)) {
        $errors['password'] = 'Password is required.';
    } elseif (!isStrongPassword($password)) {
        $errors['password'] = 'Password is not strong enough.';
    }

    // Check if password matches the confirmation
    if (empty($passwordAgain)) {
        $errors['passwordAgain'] = 'Please confirm your password.';
    } elseif ($password !== $passwordAgain) {
        $errors['passwordAgain'] = 'Passwords do not match.';
    }

    // Check if email or username is already in use
    if (empty($errors)) {
        // Query the database to check if the email or username already exists
        $stmt = $conn->prepare("SELECT * FROM Users WHERE email = ? OR name = ?");
        $stmt->bind_param("ss", $email, $name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $existingUser = $result->fetch_assoc();
            if ($existingUser['email'] === $email) {
                $errors['email'] = 'Email is already in use.';
            }
            if ($existingUser['name'] === $name) {
                $errors['name'] = 'Username is already in use.';
            }
        }

        $stmt->close(); // Close the statement
    }

    // If there are any errors, send them back as a JSON response
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
    } else {
        // Hash the password before storing in the database for security
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $uid = uid();

        // If no errors, proceed with saving the user to the database
        $stmt = $conn->prepare("INSERT INTO Users (uid, name, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $uid, $name, $email, $hashedPassword);
        
        if ($stmt->execute()) {
            try {
                sendMail(
                    $email, 
                    'MORP - Verify your email', 
                    "Click the following link to verify your email: <a href=\"{$_ENV['PHP_FOLDER']}/verification.php?uid=$uid\">confirm your verification</a>"
                );
                // Send success message if user is successfully registered
                echo json_encode(['success' => true, 'message' => 'Registration successful.']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => 'Registration successful, but email could not be sent.']);
            }
        } else {
            // Handle database insertion error
            echo json_encode(['success' => false, 'message' => 'Database error. Please try again.']);
        }

        $stmt->close(); // Close the statement
    }

    // Close the database connection
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
