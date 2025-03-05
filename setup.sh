#!/bin/bash

echo "Setting up FindMyCareer project..."

# Create necessary directories if they don't exist
mkdir -p backend frontend

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Copy environment files
cp .env.example .env
echo "Created backend .env file. Please update the values in backend/.env"

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Copy environment files
cp .env.example .env
echo "Created frontend .env file. Please update the values in frontend/.env"

echo "Setup complete! Please follow these steps to run the project:"
echo "1. Update the environment variables in backend/.env and frontend/.env"
echo "2. Start MongoDB (make sure it's installed and running)"
echo "3. Open two terminal windows"
echo "4. In the first terminal, run: cd backend && npm run dev"
echo "5. In the second terminal, run: cd frontend && npm start" 