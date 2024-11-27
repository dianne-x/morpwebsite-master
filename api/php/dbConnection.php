<?php

require __DIR__ . '/../vendor/autoload.php'; // Adjust to your folder structure

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
try {
    $dotenv->load();
} catch (Exception $e) {
    die('Could not load .env file: ' . $e->getMessage());
}

if (empty($_ENV['DB_HOST']) || empty($_ENV['DB_USER']) || empty($_ENV['DB_NAME'])) {
    die('Database configuration is missing in the .env file.');
}

$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
