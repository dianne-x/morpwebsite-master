<?php
require 'dbConnection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$serverId = $data['serverId'];

$response = [];

// Start a transaction to ensure atomicity
$conn->begin_transaction();

try {
    // Delete related rows in the `server_member` table
    $sqlDeleteMembers = "DELETE FROM server_member WHERE server_id = ?";
    $stmtDeleteMembers = $conn->prepare($sqlDeleteMembers);
    $stmtDeleteMembers->bind_param("i", $serverId);
    $stmtDeleteMembers->execute();
    $stmtDeleteMembers->close();

    // Delete related rows in the `server_bio` table
    $sqlDeleteBio = "DELETE FROM server_bio WHERE id = ?";
    $stmtDeleteBio = $conn->prepare($sqlDeleteBio);
    $stmtDeleteBio->bind_param("i", $serverId);
    $stmtDeleteBio->execute();
    $stmtDeleteBio->close();

    // Delete related rows in the `server_stories` table
    $sqlDeleteStories = "DELETE FROM server_stories WHERE server_id = ?";
    $stmtDeleteStories = $conn->prepare($sqlDeleteStories);
    $stmtDeleteStories->bind_param("i", $serverId);
    $stmtDeleteStories->execute();
    $stmtDeleteStories->close();

    // Delete related rows in the `section` table
    $sqlDeleteSections = "DELETE FROM section WHERE server_id = ?";
    $stmtDeleteSections = $conn->prepare($sqlDeleteSections);
    $stmtDeleteSections->bind_param("i", $serverId);
    $stmtDeleteSections->execute();
    $stmtDeleteSections->close();

    // Finally, delete the server itself
    $sqlDeleteServer = "DELETE FROM servers WHERE id = ?";
    $stmtDeleteServer = $conn->prepare($sqlDeleteServer);
    $stmtDeleteServer->bind_param("i", $serverId);
    $stmtDeleteServer->execute();
    $stmtDeleteServer->close();

    // Commit the transaction
    $conn->commit();
    $response['success'] = true;
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

echo json_encode($response);

$conn->close();
?>