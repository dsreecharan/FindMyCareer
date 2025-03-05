@echo off
echo Starting FindMyCareer application...

:: Start backend server
start cmd /k "cd backend && npm start"

:: Wait for 2 seconds to ensure backend starts first
timeout /t 2 /nobreak

:: Start frontend server
start cmd /k "cd frontend && npm start"

echo Both servers are starting...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000 