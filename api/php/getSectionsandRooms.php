<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'dbConnection.php';

// Add CORS headers
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow requests from your React app
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Ensure the response is JSON

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the server ID from the request
$server_id = intval($_GET['server_id']);

// Fetch sections for the selected server
$sections_sql = "SELECT * FROM section WHERE server_id = $server_id";
$sections_result = $conn->query($sections_sql);

$sections = array();
if ($sections_result->num_rows > 0) {
    while($section = $sections_result->fetch_assoc()) {
        $section_id = $section['id'];

        // Fetch rooms for the current section
        $rooms_sql = "SELECT * FROM room WHERE section_id = $section_id";
        $rooms_result = $conn->query($rooms_sql);

        $rooms = array();
        if ($rooms_result->num_rows > 0) {
            while($room = $rooms_result->fetch_assoc()) {
                $rooms[] = $room;
            }
        }

        $section['rooms'] = $rooms;
        $sections[] = $section;
    }
}

// Return the sections and rooms as JSON
header('Content-Type: application/json');
echo json_encode($sections);

$conn->close();
?>