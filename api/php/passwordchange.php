<?php
include 'dbConnection.php'; // Include the database connection file
include 'strongPassword.php'; // Include the strong password function
session_start();

$bodyContent = '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    // Validate the uid
    $stmt = $conn->prepare("SELECT * FROM users WHERE uid = ?");
    $stmt->bind_param("s", $uid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $bodyContent = '<p class="red">Invalid or expired link.</p>';
    } else {
        // Display the password reset form
        $bodyContent = '
            <form method="POST" action="">
                <label for="new_password">New Password:</label>
                <input type="password" id="new_password" name="new_password" required>
                <br>
                <label for="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
                <br>
                <button type="submit">Change Password</button>
            </form>
        ';
    }
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the password change request
    if (!isset($_POST['new_password']) || !isset($_POST['confirm_password'])) {
        $bodyContent = '<p class="red">Invalid request.</p>';
    } else {
        // Retrieve uid from the URL
        $uid = $_GET['uid'];
        $newPassword = $_POST['new_password'];
        $confirmPassword = $_POST['confirm_password'];

        // Check if new passwords match
        if ($newPassword !== $confirmPassword) {
            $bodyContent = '<p class="red">Passwords do not match.</p>';
        } elseif (!isStrongPassword($newPassword)) {
            $bodyContent = '<p class="yellow">Your password is not strong enough. It must be at least 8 characters long and include upper and lower case letters, a number, and a special character.</p>';
        } else {
            // Hash the new password
            $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

            // Update the password in the database
            $stmt = $conn->prepare("UPDATE users SET password = ? WHERE uid = ?");
            $stmt->bind_param("ss", $hashedPassword, $uid);

            if ($stmt->execute()) {
                $bodyContent = '<p class="green">Your password has been changed successfully.</p>';
            } else {
                $bodyContent = '<p class="red">Failed to change password. Please try again.</p>';
            }
            $stmt->close();
        }
    }
}

// Close the database connection
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MORP | New Password Request</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            height: 100dvh;
            background-color: #1a1c23;
            color: #fafaff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 300px;
        }
        button {
            background-color: #49beaa;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        input {
            background: none;
            color: #fafaff;
            border: none;
            outline: none;
            border-bottom: 1px solid #fafaff;
        }
        p {
            max-width: 700px;
            text-align: center;
            line-height: 1.5;
            font-weight: bold;
        }
        .yellow {
            color: #f0c674;
        }
        .red {
            color: #fa3434;
        }
        .green {
            color: #26bd6a;
        }
    </style>
</head>
<body>
    <?php echo $bodyContent; ?>
</body>
</html>
