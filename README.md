# FindMyCareer

An AI-powered career recommendation platform that helps students discover their ideal career path through psychological assessments and personalized recommendations.

## Features

- 🤖 AI-powered career recommendations based on psychological assessments
- 🎨 Modern, responsive UI with dark/light mode
- 🔐 Secure user authentication
- 📊 Comprehensive career assessment system
- 👨‍👩‍👧‍👦 Parent counseling integration
- 📱 Mobile-first, responsive design
- 🎮 Gamified user experience
- 📚 Entrance exam guides
- 👨‍💼 Admin dashboard

## Tech Stack

### Frontend

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- React.js

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

### AI/ML

- Decision Trees
- Natural Language Processing
- Rule-Based AI System

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/FindMyCareer.git
cd FindMyCareer
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables

```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development servers

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Project Structure

```
FindMyCareer/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── backend/                 # Node.js backend application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── package.json
│
└── README.md
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

- Thanks to all contributors who have helped shape FindMyCareer
- Special thanks to the open-source community for the amazing tools and libraries
