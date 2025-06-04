<?php
include 'dbConnection.php'; // Include the database connection file
include 'strongPassword.php'; // Include the strong password function
session_start();


if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    // Validate the uid
    $stmt = $conn->prepare("SELECT * FROM users WHERE uid = ?");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo "Invalid or expired link.";
        exit;
    }

    // Display the password reset form
    echo '<form method="POST" action="">
            <label for="new_password">New Password:</label>
            <input type="password" id="new_password" name="new_password" required>
            <br>
            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required>
            <br>
            <button type="submit">Change Password</button>
          </form>';
    
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the password change request
    if (!isset($_POST['new_password']) || !isset($_POST['confirm_password'])) {
        echo "Invalid request.";
        exit;
    }

    // Retrieve uid from the URL
    $uid = $_GET['uid']; // Ensure the uid is obtained from the GET request
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];

    // Check if new passwords match
    if ($newPassword !== $confirmPassword) {
        echo "Passwords do not match.";
        exit;
    }

    // Check if the new password is strong
    if (!isStrongPassword($newPassword)) {
        echo "Your password is not strong enough. It must be at least 8 characters long and include upper and lower case letters, a number, and a special character.";
        exit;
    }

    // Hash the new password
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    // Update the password in the database
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE uid = ?");
    $stmt->bind_param("ss", $hashedPassword, $uid);

    if ($stmt->execute()) {
        echo "Your password has been changed successfully.";
    } else {
        echo "Failed to change password. Please try again.";
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
