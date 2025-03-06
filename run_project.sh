#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -i :$port > /dev/null; then
        return 0 # Port is in use
    else
        return 1 # Port is free
    fi
}

# Function to find next available port
find_available_port() {
    local base_port=$1
    local port=$base_port
    while check_port $port; do
        print_message "$YELLOW" "⚠️  Port $port is in use, trying next port..."
        port=$((port + 1))
    done
    echo $port
}

# Function to handle errors
handle_error() {
    print_message "$RED" "⚠️  Error: $1"
    cleanup
    exit 1
}

# Function to cleanup processes on exit
cleanup() {
    print_message "$YELLOW" "\n🛑 Shutting down servers..."
    
    # Shutdown backend gracefully
    if [ ! -z "$backend_pid" ]; then
        print_message "$YELLOW" "Stopping backend server..."
        kill -SIGINT $backend_pid 2>/dev/null
        wait $backend_pid 2>/dev/null
    fi
    
    # Shutdown frontend gracefully
    if [ ! -z "$frontend_pid" ]; then
        print_message "$YELLOW" "Stopping frontend server..."
        kill -SIGINT $frontend_pid 2>/dev/null
        wait $frontend_pid 2>/dev/null
    fi
    
    # Additional cleanup
    print_message "$YELLOW" "Cleaning up temporary files..."
    rm -f ./backend/.env.bak ./frontend/.env.bak
    
    print_message "$GREEN" "👋 Cleanup completed"
}

# Set up trap for cleanup
trap 'cleanup' EXIT
trap 'exit 130' INT

# Create .env files if they don't exist
create_env_files() {
    # Backend .env
    if [ ! -f "./backend/.env" ]; then
        print_message "$YELLOW" "Creating backend .env file..."
        cat > ./backend/.env << EOL
# Server Configuration
PORT=5001
NODE_ENV=development
DEBUG=true

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/findmycareer

# JWT Configuration
JWT_SECRET=findmycareer_secret_key_2024
JWT_EXPIRES_IN=24h

# Ollama Configuration
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=deepseek-r1:8b

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
EOL
    fi

    # Frontend .env
    if [ ! -f "./frontend/.env" ]; then
        print_message "$YELLOW" "Creating frontend .env file..."
        cat > ./frontend/.env << EOL
# Development Settings
PORT=3000
BROWSER=none
GENERATE_SOURCEMAP=false
WDS_SOCKET_PORT=0

# React Settings
REACT_APP_API_URL=http://localhost:5001
REACT_APP_ENV=development

# Performance Settings
NODE_OPTIONS=--max-old-space-size=8192
EOL
    fi
}

# Start MongoDB if not running
start_mongodb() {
    if ! mongod --version >/dev/null 2>&1; then
        print_message "$RED" "❌ MongoDB is not installed. Please install MongoDB first."
        exit 1
    fi

    if ! pgrep mongod >/dev/null; then
        print_message "$YELLOW" "Starting MongoDB..."
        mongod --fork --logpath /dev/null || handle_error "Failed to start MongoDB"
    fi
}

# Main execution starts here
print_message "$BLUE" "🚀 Starting FindMyCareer Application..."

# Create necessary .env files
create_env_files

# Start MongoDB
start_mongodb

# Find available ports
BACKEND_PORT=$(find_available_port 5001)
FRONTEND_PORT=$(find_available_port 3000)

# Update .env files with the correct ports
sed -i.bak "s/PORT=.*/PORT=$BACKEND_PORT/" ./backend/.env
sed -i.bak "s/PORT=.*/PORT=$FRONTEND_PORT/" ./frontend/.env
sed -i.bak "s/FRONTEND_URL=.*/FRONTEND_URL=http:\/\/localhost:$FRONTEND_PORT/" ./backend/.env
sed -i.bak "s/REACT_APP_API_URL=.*/REACT_APP_API_URL=http:\/\/localhost:$BACKEND_PORT/" ./frontend/.env

# Remove backup files
rm -f ./backend/.env.bak ./frontend/.env.bak

# Start Backend
cd backend
print_message "$BLUE" "📡 Starting Backend Server on port $BACKEND_PORT..."
npm install
NODE_ENV=development DEBUG=true PORT=$BACKEND_PORT nodemon --max-old-space-size=8192 server.js &
backend_pid=$!

# Check if backend started successfully
sleep 5
if ! check_port $BACKEND_PORT; then
    handle_error "Backend failed to start"
fi
print_message "$GREEN" "✅ Backend is running on port $BACKEND_PORT"

# Start Frontend
cd ../frontend
print_message "$BLUE" "🎨 Starting Frontend Server on port $FRONTEND_PORT..."
npm install
BROWSER=none NODE_OPTIONS='--max-old-space-size=8192' GENERATE_SOURCEMAP=false WDS_SOCKET_PORT=0 PORT=$FRONTEND_PORT npm start &
frontend_pid=$!

# Check if frontend started successfully
sleep 5
if ! check_port $FRONTEND_PORT; then
    handle_error "Frontend failed to start"
fi
print_message "$GREEN" "✅ Frontend is running on port $FRONTEND_PORT"

print_message "$GREEN" "\n🎉 FindMyCareer is now running!"
print_message "$BLUE" "📱 Frontend: http://localhost:$FRONTEND_PORT"
print_message "$BLUE" "⚙️  Backend: http://localhost:$BACKEND_PORT"
print_message "$YELLOW" "Press Ctrl+C to stop all servers\n"

# Wait for child processes
wait 