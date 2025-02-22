import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import './Quiz.css';

function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 for user form, 1-4 for quiz
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState({
    1: [],
    2: [],
    3: [],
    4: []
  });

  const questions = {
    1: {
      title: "How do you prefer to solve problems?",
      type: "multiSelect",
      options: [
        "Breaking down complex problems into smaller parts",
        "Finding creative and innovative solutions",
        "Following step-by-step procedures",
        "Discussing and collaborating with others",
        "Analyzing data and patterns",
        "Using visual aids and diagrams",
        "Learning from practical experiments",
        "Reading and researching thoroughly"
      ]
    },
    2: {
      title: "In which situations do you feel most energized?",
      type: "multiSelect",
      options: [
        "Working with numbers and calculations",
        "Helping and caring for others",
        "Creating or designing something new",
        "Leading a team or project",
        "Solving technical problems",
        "Expressing ideas through writing or speaking",
        "Working with hands-on tasks",
        "Analyzing and researching information"
      ]
    },
    3: {
      title: "What type of activities interest you the most?",
      type: "multiSelect",
      options: [
        "Understanding how things work",
        "Exploring artistic and creative pursuits",
        "Managing and organizing resources",
        "Caring for people's health and wellbeing",
        "Working with computers and technology",
        "Teaching and explaining concepts to others",
        "Building or fixing things",
        "Investigating and discovering new things"
      ]
    },
    4: {
      title: "How do you prefer to learn new things?",
      type: "multiSelect",
      options: [
        "Through practical experiments",
        "By reading and researching",
        "Through visual demonstrations",
        "By discussing with others",
        "Through hands-on experience",
        "By solving problems",
        "Through creative projects",
        "By analyzing patterns"
      ]
    }
  };

  const handleUserSubmit = async (data) => {
    setUserData(data);
    setStep(1);
  };

  const handleAnswer = (questionType, value) => {
    setAnswers(prev => {
      if (questionType === "multiSelect") {
        const questionKey = step;
        return {
          ...prev,
          [questionKey]: prev[questionKey].includes(value)
            ? prev[questionKey].filter(item => item !== value)
            : [...prev[questionKey], value]
        };
      }
      return prev;
    });
  };

  const handleNext = async () => {
    if (step < Object.keys(questions).length) {
      setStep(step + 1);
    } else {
      try {
        const transformedAnswers = {
          thinkingStyle: answers[1] || [],
          problemSolving: answers[2] || [],
          workPreference: answers[3] || [],
          interests: answers[4] || []
        };

        const response = await fetch('http://localhost:5000/api/users/submit-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...userData,
            quizResponses: transformedAnswers
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          navigate('/results', { 
            state: { 
              email: userData.email 
            } 
          });
        } else {
          throw new Error(data.error || 'Failed to submit quiz');
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
        alert('There was an error submitting your quiz. Please try again.');
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (step === 0) {
    return <UserForm onSubmit={handleUserSubmit} />;
  }

  const currentQuestion = questions[step];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-wrapper">
          <div className="progress-info">
            <span className="step-number">Step {step}</span>
            <span className="step-total">of {Object.keys(questions).length}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(step / Object.keys(questions).length) * 100}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-title">{currentQuestion.title}</h2>
        
        <div className="options-grid">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`option-button ${
                answers[step]?.includes(option) ? 'selected' : ''
              }`}
              onClick={() => handleAnswer(currentQuestion.type, option)}
            >
              <div className="option-content">
                <span className="option-text">{option}</span>
                <div className="selection-indicator"></div>
              </div>
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button back"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            <span className="button-icon">←</span>
            Previous
          </button>
          <button 
            className="nav-button next"
            onClick={handleNext}
          >
            {step === Object.keys(questions).length ? 'Finish' : 'Next'}
            <span className="button-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;