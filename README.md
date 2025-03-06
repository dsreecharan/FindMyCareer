# FindMyCareer

FindMyCareer is a comprehensive web application designed to help Grade 9-12 students identify suitable career paths through a psychological & scenario-based test, and provide guidance on colleges, entrance exams, eligibility criteria, and application processes.

## Features Implemented

### 1. User Authentication
- ✅ JWT-based login & registration
- ✅ User profiles with test history & saved careers
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes for authenticated users

### 2. Career Test
- ✅ 15 psychological & scenario-based questions
- ✅ Weighted scoring system (analytical, creative, structured, social)
- ✅ Real-time progress tracking
- ✅ Ability to navigate back and review answers
- ✅ Test history saved to user profile

### 3. Career Recommendation System
- ✅ Evaluation using career_recommendation_dataset.csv
- ✅ Categorization based on score ranges:
  - Engineering & Technology (50-60 points)
  - Creative & Design (40-49 points)
  - Business & Management (30-39 points)
  - Social & Psychology (15-29 points)
- ✅ Detailed career profiles including:
  - Career summary and description
  - Required skills and personality traits
  - Education requirements
  - Job outlook and average salary
  - Top colleges and locations
  - Entrance exams & eligibility criteria
  - Application process & deadlines

### 4. Dashboard
- ✅ View past test results with dates and scores
- ✅ Save and unsave preferred careers
- ✅ Display career recommendations
- ✅ View detailed career information
- ✅ Compare different career options

### 5. Modern UI & Styling
- ✅ 3D Background using React Three Fiber
- ✅ Dark & Light Mode Toggle
- ✅ Animated UI with Framer Motion
- ✅ Responsive design with Tailwind CSS
- ✅ ShadCN UI components for clean interfaces

## Tech Stack

### Frontend:
- **Next.js 14**: for performance optimization and server components
- **React.js**: for dynamic user interface
- **React Three Fiber**: for 3D interactive background
- **Tailwind CSS**: for modern, responsive styling
- **Framer Motion**: for smooth animations and transitions
- **ShadCN UI**: for clean, accessible components
- **TypeScript**: for type safety and better developer experience

### Backend:
- **Node.js with Express.js**: for API handling
- **MongoDB with Mongoose**: for user authentication and data storage
- **JWT**: for secure authentication
- **CSV Parsing**: to process career recommendations
- **TypeScript**: for type safety and maintainability

## Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- MongoDB (local instance or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/findmycareer.git
   cd findmycareer
   ```

2. Set up the backend:
   ```bash
   cd server
   npm install
   # Create a .env file with necessary variables (see .env.example)
   npm run setup-data # Set up initial career data and questions
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd my-app
   npm install
   # Create a .env.local file with necessary variables
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
findmycareer/
├── server/                     # Backend server
│   ├── src/
│   │   ├── controllers/        # API controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # MongoDB models
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utility functions
│   │   ├── scripts/            # Setup scripts
│   │   └── index.ts            # Server entry point
│   ├── uploads/                # Directory for uploaded data files
│   │   ├── career_recommendation_dataset.csv
│   │   └── master_career_dataset.csv
│   └── .env                    # Environment variables
│
├── my-app/                     # Frontend Next.js app
│   ├── public/                 # Static assets
│   │   └── data/               # CSV datasets
│   ├── src/
│   │   ├── app/                # Next.js app router
│   │   │   ├── career-test/    # Career test pages
│   │   │   ├── careers/        # Career detail pages
│   │   │   ├── dashboard/      # User dashboard
│   │   │   ├── login/          # Authentication pages
│   │   │   └── test-results/   # Test result pages
│   │   ├── components/         # React components
│   │   │   ├── 3d/             # 3D components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── providers/      # Context providers
│   │   │   └── ui/             # ShadCN UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility libraries
│   │   └── utils/              # Helper functions
│   └── .env.local              # Environment variables
│
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
└── LICENSE                     # Project license
```

## Datasets Used

1. **career_recommendation_dataset.csv**: Maps personality scores to career paths
2. **master_career_dataset.csv**: Contains detailed information about careers, including colleges, exams, and application processes

## Advanced Features

### 1. Test Result Analysis
- Comprehensive score breakdown with percentage calculations
- Personality profile visualization with progress bars
- Tailored career recommendations based on individual scores

### 2. Career Details Page
- Tabbed interface for easy navigation
- Detailed information sections for all career aspects
- Bookmark functionality for saving careers of interest

### 3. User Dashboard
- Recent test history with score visualizations
- Saved careers library
- Personalized recommendations

## Future Enhancements

1. **Additional Features**:
   - Career comparison tool
   - Mentorship program integration
   - Real-time chat with career counselors
   - Alumni success stories

2. **Performance Optimization**:
   - Server-side rendering for better SEO
   - API response caching
   - Image optimization
   - Mobile performance improvements

3. **Content Expansion**:
   - More career paths and specializations
   - Video content about careers
   - Industry trends and job market analysis
   - Internship and scholarship opportunities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped with the development of FindMyCareer
- Special thanks to the educational institutions that provided data for the career recommendations
- Additional gratitude to the various npm package maintainers that make this project possible 