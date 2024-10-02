<?php
header('Content-Type: application/json'); // Ensure the response is JSON

function isStrongPassword($password) {
    // Check if the password is at least 8 characters long
    if (strlen($password) < 8) {
        return false;
    }
    // Check if the password contains both uppercase and lowercase letters
    if (!preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password)) {
        return false;
    }
    // Check if the password contains at least one number
    if (!preg_match('/[0-9]/', $password)) {
        return false;
    }
    // Check if the password contains at least one special character
    if (!preg_match('/[\W]/', $password)) {
        return false;
    }
    // If all checks passed, the password is strong
    return true;
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

    // If there are any errors, send them back as a JSON response
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
    } else {
        // If no errors, you can process the registration logic here (e.g., saving to the database)
        
        // Example: Send success message
        echo json_encode(['success' => true, 'message' => 'Registration successful.']);
    }
}
else echo json_encode(['success' => false, 'message' => 'Invalid request method.']);

?>