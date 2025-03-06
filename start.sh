#!/bin/bash

# ANSI color codes for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}       FindMyCareer Startup Script     ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check if MongoDB is running
check_mongodb() {
  echo -e "${YELLOW}Checking if MongoDB is running...${NC}"
  if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}MongoDB is already running.${NC}"
    return 0
  else
    echo -e "${YELLOW}MongoDB is not running. Attempting to start...${NC}"
    # Try to start MongoDB using Homebrew service
    if brew services start mongodb-community; then
      echo -e "${GREEN}MongoDB started successfully.${NC}"
      return 0
    else
      echo -e "${RED}Failed to start MongoDB. Please start it manually.${NC}"
      echo -e "${YELLOW}You can try: brew services start mongodb-community${NC}"
      echo -e "${YELLOW}Or: mongod --config /usr/local/etc/mongod.conf --fork${NC}"
      return 1
    fi
  fi
}

# Function to start backend
start_backend() {
  echo -e "${YELLOW}Starting backend server...${NC}"
  
  # Check if env file exists, if not create from example
  if [ ! -f "./server/.env" ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp "./server/.env.example" "./server/.env"
    echo -e "${GREEN}Created .env file. Please customize it if needed.${NC}"
  fi
  
  # Navigate to server directory and start
  cd server
  
  # Install dependencies if node_modules doesn't exist
  if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
  fi
  
  # Start the server in background
  echo -e "${GREEN}Starting backend server on http://localhost:5001${NC}"
  npm run dev &
  # Save the server PID
  BACKEND_PID=$!
  
  # Navigate back to root
  cd ..
  
  # Wait for server to start
  echo -e "${YELLOW}Waiting for backend to initialize...${NC}"
  sleep 5
}

# Function to start frontend
start_frontend() {
  echo -e "${YELLOW}Starting frontend application...${NC}"
  
  # Check if env file exists, if not create from example
  if [ ! -f "./my-app/.env.local" ] && [ -f "./my-app/.env.example" ]; then
    echo -e "${YELLOW}Creating .env.local file from example...${NC}"
    cp "./my-app/.env.example" "./my-app/.env.local"
    echo -e "${GREEN}Created .env.local file. Please customize it if needed.${NC}"
  fi
  
  # Navigate to frontend directory and start
  cd my-app
  
  # Install dependencies if node_modules doesn't exist
  if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
  fi
  
  # Start the frontend
  echo -e "${GREEN}Starting frontend on http://localhost:3000${NC}"
  npm run dev &
  # Save the frontend PID
  FRONTEND_PID=$!
  
  # Navigate back to root
  cd ..
}

# Function to open browser
open_browser() {
  echo -e "${YELLOW}Waiting for frontend to initialize...${NC}"
  sleep 7
  echo -e "${GREEN}Opening browser...${NC}"
  open http://localhost:3000
}

# Main execution
check_mongodb
if [ $? -eq 0 ]; then
  start_backend
  start_frontend
  open_browser
  
  echo ""
  echo -e "${GREEN}✓ Both servers are now running!${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo -e "${BLUE}  Frontend: http://localhost:3000      ${NC}"
  echo -e "${BLUE}  Backend:  http://localhost:5001      ${NC}"
  echo -e "${BLUE}========================================${NC}"
  echo ""
  echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
  
  # Wait for user to press Ctrl+C
  trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo -e '${RED}Servers stopped${NC}'; exit" INT
  wait
else
  echo -e "${RED}Cannot start servers without MongoDB. Please start MongoDB manually and try again.${NC}"
  exit 1
fi 