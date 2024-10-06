<?php
include 'dbConnection.php'; // Include the database connection file

// Check if uid is set in the GET parameters
if (isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    // Prepare the SQL statement to verify the user
    $stmt = $conn->prepare("UPDATE Users SET verified = 1 WHERE uid = ?");
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
</head>
<body>
    <h1>Verification Status</h1>
    <p><?php echo htmlspecialchars($message); ?></p>

    <a href="http://localhost:3000/login">Go back to login page</a>
</body>
</html>
