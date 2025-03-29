<?php
require __DIR__ . '/../vendor/autoload.php';

header('Access-Control-Allow-Origin: *');

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


class WebSocketServer implements MessageComponentInterface {
    protected $clients; // Stores all connections
    protected $userConnections; // Maps userId to ConnectionInterface

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->userConnections = []; // Initialize the userId-to-connection map
        echo "WebSocket server started...\n";
    }

    public function onOpen(ConnectionInterface $conn) {
        try {
            // Parse query parameters
            $query = $conn->httpRequest->getUri()->getQuery();
            parse_str($query, $params);

            if (isset($params['userId'])) {
                $userId = $params['userId'];
                echo "New connection! ({$conn->resourceId}) with userId: {$userId}\n";

                // Store the connection and map it to the userId
                $this->clients->attach($conn);
                $this->userConnections[$userId] = $conn; // Map userId to connection
            } else {
                echo "New connection! ({$conn->resourceId}) with no userId\n";
            }

            echo "Total connected clients: " . count($this->clients) . "\n";
        } catch (\Exception $e) {
            echo "Error during onOpen: " . $e->getMessage() . "\n";
            $conn->close();
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message received from connection {$from->resourceId}: $msg\n";

        // Decode the JSON message
        $data = json_decode($msg, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "Error decoding JSON: " . json_last_error_msg() . "\n";
            $from->send(json_encode(['error' => 'Invalid JSON format']));
            return;
        }

        echo "Parsed message data: " . print_r($data, true) . "\n";

        // Handle the "kick" action
        if (isset($data['action']) && $data['action'] === 'kick') {
            $userId = $data['userId'] ?? null;

            if (!$userId) {
                echo "Error: 'userId' is missing in the message\n";
                $from->send(json_encode(['error' => "'userId' is required for the 'kick' action"]));
                return;
            }

            // Find the connection by userId
            if (isset($this->userConnections[$userId])) {
                $client = $this->userConnections[$userId];
                echo "Kicking user with userId: {$userId}\n";
                $client->send(json_encode(['action' => 'kicked', 'message' => 'You have been kicked.']));
                $client->close();

                // Remove the user from the mapping
                unset($this->userConnections[$userId]);
            } else {
                echo "User with userId {$userId} not found\n";
                $from->send(json_encode(['error' => "User with userId {$userId} not found"]));
            }
        } else {
            echo "Unknown action received: " . ($data['action'] ?? 'none') . "\n";
            $from->send(json_encode(['error' => 'Unknown action']));
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove the connection from the clients list
        $this->clients->detach($conn);

        // Remove the connection from the userConnections map
        foreach ($this->userConnections as $userId => $connection) {
            if ($connection === $conn) {
                unset($this->userConnections[$userId]);
                echo "User with userId {$userId} has disconnected\n";
                break;
            }
        }

        echo "Connection {$conn->resourceId} has disconnected\n";
        echo "Total connected clients: " . count($this->clients) . "\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred with connection {$conn->resourceId}: {$e->getMessage()}\n";
        $conn->close();
    }

    
}

// Run the WebSocket server
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new WebSocketServer()
        )
    ),
    8080 // Port number
);

$server->run();