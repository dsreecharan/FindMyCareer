#!/bin/bash

# ANSI color codes for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}       FindMyCareer Shutdown Script    ${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Kill any running Next.js development server
echo -e "${YELLOW}Stopping frontend server...${NC}"
pkill -f "node.*next"
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Frontend server stopped.${NC}"
else
  echo -e "${YELLOW}No frontend server was running.${NC}"
fi

# Kill any running backend Node server
echo -e "${YELLOW}Stopping backend server...${NC}"
pkill -f "node.*server"
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Backend server stopped.${NC}"
else
  echo -e "${YELLOW}No backend server was running.${NC}"
fi

# Ask if MongoDB should be stopped too
echo -e "${YELLOW}Do you want to stop MongoDB as well? (y/n)${NC}"
read -r stop_mongo

if [[ "$stop_mongo" =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Stopping MongoDB...${NC}"
  if brew services stop mongodb-community; then
    echo -e "${GREEN}MongoDB stopped successfully.${NC}"
  else
    echo -e "${RED}Failed to stop MongoDB. You may need to stop it manually.${NC}"
    echo -e "${YELLOW}Try: brew services stop mongodb-community${NC}"
  fi
fi

echo ""
echo -e "${GREEN}All services have been stopped.${NC}"
echo -e "${BLUE}========================================${NC}" 