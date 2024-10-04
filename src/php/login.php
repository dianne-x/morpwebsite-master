<?php
header('Content-Type: application/json'); // Ensure the response is JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST['email'];
    $password = $_POST['password'];

    




}
else echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
?>