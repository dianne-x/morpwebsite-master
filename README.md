# MORP Web Application

Setup guide for the MORP web app — covering installation, configuration, and local run.

## Structure

- **api:** PHP WebSocket server  
- **client:** Web interface  
- **server:** Socket.IO backend  
- **storage:** Uploaded image storage  
- **db_scripts:** MySQL database scripts  

## Database Setup (MySQL)

Run these in order:

1. `db_scripts/morpdb.sql`
2. `db_scripts/cascade` (run separately for constraints)

## Local Installation

1. Move `morpwebsite-master` into your XAMPP `htdocs` folder.  
2. **API:**
   ```bash
   cd morpwebsite-master/api
   c:/xampp/php/php.exe composer.phar install
    ```
    Copy .env.example → .env and set credentials.
3. Client:
    ```bash
    
    cd client
    npm i
    yarn install
    ```
    Copy .env.example → .env and set environment variables.
4. Server:

    ```bash
    cd server
    npm i
    yarn install

## Running

Use runDevelopment.bat in the root folder to start servers and database connections.

Local Ports

    Client: http://localhost:3000

    Socket.IO: http://localhost:3001

    WebSocket: ws://localhost:8080

Deployment Notes

* Build the client folder for production.
* Update all .env files (api, client) with real credentials.
* In server/index.js:

    * Set MySQL connection (around line 12).
    * Adjust port if needed.

* If using a different WebSocket port, update it in api/php/WebSocketServer.php.
