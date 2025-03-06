# FindMyCareer Startup and Shutdown Scripts

This document explains how to use the provided macOS shell scripts to easily start and stop the FindMyCareer application.

## Prerequisites

- macOS operating system
- MongoDB installed (preferably via Homebrew)
- Node.js and npm installed

## Available Scripts

### Start Script (`start.sh`)

This script starts the entire FindMyCareer application, including:
- Checking if MongoDB is running and starting it if needed
- Setting up environment files if they don't exist
- Starting the backend server
- Starting the frontend application
- Opening the browser to the application URL

#### Usage

```bash
./start.sh
```

The script will:
1. Check if MongoDB is running (and attempt to start it using Homebrew if not)
2. Start the backend Express.js server
3. Start the frontend Next.js application
4. Open your default browser to http://localhost:3000
5. Display information about both servers
6. Wait for Ctrl+C to gracefully shut down all services

### Stop Script (`stop.sh`)

This script safely stops all components of the FindMyCareer application:
- Stops the frontend Next.js server
- Stops the backend Express.js server
- Optionally stops MongoDB (asks for confirmation)

#### Usage

```bash
./stop.sh
```

The script will:
1. Stop any running Next.js development servers
2. Stop any running backend Node.js servers
3. Ask if you want to stop MongoDB as well
4. Confirm when all services have been stopped

## Troubleshooting

### The scripts won't run

Make sure both scripts are executable:

```bash
chmod +x start.sh stop.sh
```

### MongoDB issues

If the scripts fail to start or stop MongoDB, you can do it manually:

```bash
# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community
```

### Port conflicts

If you encounter port conflicts (3000 or 5000 already in use), modify the port numbers in:
- `my-app/.env.local` for the frontend port
- `server/.env` for the backend port
- Update corresponding port numbers in the startup script

## Additional Notes

- The startup script saves both server processes' PIDs to ensure proper shutdown when using Ctrl+C
- Both scripts use color output to make status information more readable
- If either script fails, check the console output for error messages 