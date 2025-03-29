@echo off

:: Start XAMPP Control Panel and start Apache and MySQL
start "" "C:\xampp\xampp_start.exe"

:: Wait for Apache and MySQL to start
:wait
ping 127.0.0.1 -n 5 >nul
netstat -an | find ":80" >nul && netstat -an | find "3306" >nul
if errorlevel 1 goto wait

:: Open first CMD, navigate to the server folder, and run the command
start cmd /k "cd /d C:\xampp\htdocs\morpwebsite-master\server && (yarn start || npx yarn start)"

:: Open second CMD, navigate to the API PHP folder, and run the WebSocketServer
start cmd /k "cd /d C:\xampp\htdocs\morpwebsite-master\api\php && C:\xampp\php\php.exe WebSocketServer.php"

:: Open third CMD, navigate to the client folder, and run the command
start cmd /k "cd /d C:\xampp\htdocs\morpwebsite-master\client && (yarn start || npx yarn start)"
