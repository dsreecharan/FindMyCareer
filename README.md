# FindMyCareer - AI-Powered Career Guidance Platform

FindMyCareer is a comprehensive career guidance platform that uses AI to provide personalized career recommendations, college suggestions, and educational path planning. The platform helps students make informed decisions about their future careers and education.

## Features

- 🤖 **AI-Powered Career Assessment**
  - Personality trait analysis
  - Skills and interests evaluation
  - Values and preferences assessment
  - Personalized career recommendations

- 🎓 **College Recommendations**
  - Government institutions
  - Private universities
  - International universities
  - Course-specific recommendations
  - Admission requirements and deadlines

- 📊 **Detailed Analysis**
  - Personality profile visualization
  - Career match scores
  - Strengths and development areas
  - Actionable next steps

- 👥 **Career Counseling**
  - Schedule counseling sessions
  - Expert guidance
  - Personalized advice
  - Career path planning

## Tech Stack

- **Frontend**
  - React.js
  - Material-UI
  - TailwindCSS
  - Axios

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Ollama AI (deepseek-r1:8b model)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Ollama (for AI features)
- npm or yarn

## Quick Start

The easiest way to get started is to use the provided `project.sh` script:

1. Make the script executable:
   ```bash
   chmod +x project.sh
   ```

2. Run the script:
   ```bash
   ./project.sh
   ```

The script will:
- Check for required dependencies
- Set up environment variables
- Start MongoDB
- Launch the Ollama AI server
- Start the backend server
- Start the frontend development server
- Open each service in a separate terminal window

## Manual Installation

If you prefer to set up the project manually:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FindMyCareer.git
   cd FindMyCareer
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

## Configuration

### Frontend Environment Variables
```env
PORT=3000
REACT_APP_API_URL=http://localhost:5001
NODE_OPTIONS=--max-old-space-size=8192
```

### Backend Environment Variables
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/findmycareer
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Running the Application Manually

1. Start the Ollama AI server:
   ```bash
   ollama run deepseek-r1:8b
   ```

2. Start the backend server:
   ```bash
   cd backend
   NODE_ENV=development DEBUG=true PORT=5001 nodemon --max-old-space-size=8192 server.js
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Ollama AI: http://localhost:11434

## Database Setup

1. Populate assessment questions:
   ```bash
   cd backend
   node scripts/seedQuestions.js
   ```

2. Populate college data:
   ```bash
   node scripts/populateColleges.js
   ```

## Project Structure

```
FindMyCareer/
├── frontend/
│   ├── public/
│   │   ├── favicon.png
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── scripts/
│   └── server.js
├── icons/
│   ├── favicon.png
│   ├── fblogo.png
│   ├── instalogo.jpg
│   └── xlogo.png
└── project.sh
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Ollama for the AI capabilities
- MongoDB for the database
- All contributors and users of the platform

## Support

For support, email support@findmycareer.com or join our Slack channel.
