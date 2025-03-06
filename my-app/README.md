# FindMyCareer

FindMyCareer is a web application designed to help Grade 9-12 students identify suitable career paths through a psychological & scenario-based test, and provide guidance on colleges, entrance exams, eligibility criteria, and application processes.

## Features

- **Career Test**: 15 psychological & scenario-based questions with weighted scores
- **Career Recommendation System**: Displays career summaries, top colleges, entrance exams, and application processes
- **User Dashboard**: View past test results and save preferred careers
- **Modern UI**: 3D interactive background, dark/light mode, and responsive design

## Tech Stack

- **Frontend**:
  - Next.js
  - React.js
  - React Three Fiber (3D interactive background)
  - Tailwind CSS
  - Framer Motion (animations)
  - ShadCN UI (components)

- **Backend**:
  - Node.js with Express.js (for API handling)
  - MongoDB (for user authentication and history storage)
  - CSV Parsing (to process career recommendations)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/findmycareer.git
   cd findmycareer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Pages and routes
- `src/components`: Reusable UI components
- `src/lib`: Utility functions and libraries
- `src/hooks`: Custom React hooks
- `public/data`: CSV datasets for career recommendations

## Datasets

The application uses two main datasets:

1. **career_recommendation_dataset.csv**: Evaluates test responses to determine career paths
2. **master_career_dataset.csv**: Maps career paths to colleges, locations, rankings, eligibility, entrance exams, and application processes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all the contributors who have helped with the development of FindMyCareer
- Special thanks to the educational institutions that provided data for our career recommendations
