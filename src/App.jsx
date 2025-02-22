import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz/Quiz';
import Results from './pages/Results';
import CollegeRecommendations from './components/CollegeRecommendations';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all user data? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:5000/api/users/clear-all', {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          alert('All data cleared successfully!');
        } else {
          throw new Error('Failed to clear data');
        }
      } catch (error) {
        alert('Error clearing data: ' + error.message);
      }
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <button onClick={clearAllData} className="admin-clear-button">
          Clear All Data
        </button>
      </div>
    </Router>
  );
}

export default App; 