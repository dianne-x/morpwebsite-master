<?php
include 'dbConnection.php'; // Include the database connection file



// Check if uid is set in the GET parameters
if (isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    // Prepare the SQL statement to verify the user
    $stmt = $conn->prepare("UPDATE users SET verified = 1 WHERE uid = ?");
    $stmt->bind_param("s", $uid);

    // Execute the statement
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        $message = "User verified successfully!";
    } else {
        $message = "Verification failed. User may not exist or is already verified.";
    }

    // Close the statement
    $stmt->close();
} else {
    $message = "No user ID provided.";
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;

            height: 100dvh;
            margin: 0;
            background-color: #1a1c23;
            color: #fafaff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        a {
            background-color: #49beaa;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            color: #1a1c23;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Verification Status</h1>
    <p><?php echo htmlspecialchars($message); ?></p>

    <a href="<?php echo htmlspecialchars($_ENV['CORS_ORIGIN']); ?>/login">Go back to login page</a>
</body>
</html>
