#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to check if a port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
    return $?
}

# Function to find an available port
find_available_port() {
    local port=$1
    while check_port $port; do
        port=$((port + 1))
    done
    echo $port
}

# Function to check if a service is running
check_service() {
    local port=$1
    local service=$2
    local max_attempts=30
    local attempt=1
    
    print_message "Waiting for $service to start..." "$YELLOW"
    while ! check_port $port; do
        if [ $attempt -ge $max_attempts ]; then
            print_message "Error: $service failed to start after $max_attempts attempts" "$RED"
            return 1
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    print_message "$service is running!" "$GREEN"
    return 0
}

# Function to handle cleanup on script exit
cleanup() {
    print_message "\nShutting down services..." "$YELLOW"
    
    # Kill all background processes
    kill $(jobs -p) 2>/dev/null
    
    # Remove temporary files
    rm -f .env.bak
    
    print_message "All services stopped." "$GREEN"
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM EXIT

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { print_message "Node.js is required but not installed. Please install Node.js first." "$RED"; exit 1; }
command -v npm >/dev/null 2>&1 || { print_message "npm is required but not installed. Please install npm first." "$RED"; exit 1; }
command -v mongod >/dev/null 2>&1 || { print_message "MongoDB is required but not installed. Please install MongoDB first." "$RED"; exit 1; }
command -v ollama >/dev/null 2>&1 || { print_message "Ollama is required but not installed. Please install Ollama first." "$RED"; exit 1; }

# Create backup of .env files if they exist
if [ -f frontend/.env ]; then
    cp frontend/.env frontend/.env.bak
fi
if [ -f backend/.env ]; then
    cp backend/.env backend/.env.bak
fi

# Create frontend .env if it doesn't exist
if [ ! -f frontend/.env ]; then
    print_message "Creating frontend .env file..." "$BLUE"
    cat > frontend/.env << EOL
PORT=3000
REACT_APP_API_URL=http://localhost:5001
NODE_OPTIONS=--max-old-space-size=8192
REACT_APP_OLLAMA_URL=http://localhost:11434
EOL
fi

# Create backend .env if it doesn't exist
if [ ! -f backend/.env ]; then
    print_message "Creating backend .env file..." "$BLUE"
    cat > backend/.env << EOL
PORT=5001
MONGODB_URI=mongodb://localhost:27017/findmycareer
JWT_SECRET=your_jwt_secret
NODE_ENV=development
DEBUG=true
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1:8b
EOL
fi

# Find available ports if default ports are in use
FRONTEND_PORT=$(find_available_port 3000)
BACKEND_PORT=$(find_available_port 5001)

# Update .env files with available ports
sed -i '' "s/PORT=3000/PORT=$FRONTEND_PORT/" frontend/.env
sed -i '' "s/PORT=5001/PORT=$BACKEND_PORT/" backend/.env
sed -i '' "s|REACT_APP_API_URL=http://localhost:5001|REACT_APP_API_URL=http://localhost:$BACKEND_PORT|" frontend/.env

# Create data directory for MongoDB if it doesn't exist
mkdir -p ./data/db

# Start MongoDB
print_message "Starting MongoDB..." "$BLUE"
mongod --dbpath ./data/db &

# Wait for MongoDB to start
check_service 27017 "MongoDB" || exit 1

# Function to launch a new terminal window with a command
launch_terminal() {
    local title=$1
    local command=$2
    osascript -e "tell application \"Terminal\"
        do script \"$command\"
        activate
        set title of window 1 to \"$title\"
    end tell"
}

# Start Ollama AI server in a new terminal
print_message "Starting Ollama AI server..." "$BLUE"
launch_terminal "Ollama AI Server" "ollama run deepseek-r1:8b"

# Wait for Ollama to start
check_service 11434 "Ollama AI Server" || exit 1

# Start backend server in a new terminal
print_message "Starting backend server..." "$BLUE"
launch_terminal "Backend Server" "cd '$(pwd)/backend' && NODE_ENV=development DEBUG=true PORT=$BACKEND_PORT nodemon --max-old-space-size=8192 server.js"

# Wait for backend to start
check_service $BACKEND_PORT "Backend Server" || exit 1

# Start frontend server in a new terminal
print_message "Starting frontend server..." "$BLUE"
launch_terminal "Frontend Server" "cd '$(pwd)/frontend' && npm start"

# Wait for frontend to start
check_service $FRONTEND_PORT "Frontend Server" || exit 1

# Open browser after a short delay to ensure frontend is ready
sleep 5
print_message "Opening browser..." "$BLUE"
open "http://localhost:$FRONTEND_PORT"

# Print service URLs
print_message "\nServices are running at:" "$GREEN"
print_message "Frontend: http://localhost:$FRONTEND_PORT" "$GREEN"
print_message "Backend API: http://localhost:$BACKEND_PORT" "$GREEN"
print_message "Ollama AI: http://localhost:11434" "$GREEN"
print_message "\nPress Ctrl+C to stop all services" "$YELLOW"

# Keep the script running
while true; do
    sleep 1
done 