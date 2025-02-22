import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Check if we have email in state
        if (!location.state?.email) {
          throw new Error('No quiz data found. Please take the quiz first.');
        }

        const response = await fetch(`http://localhost:5000/api/users/results/${location.state.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        if (data.success) {
          setResults(data.data.recommendedPaths);
        } else {
          throw new Error(data.error || 'Failed to load results');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.state?.email]);

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading your results...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
      <button onClick={handleRetakeQuiz} className="retry-button">
        Take Quiz Again
      </button>
    </div>
  );

  if (!results || results.length === 0) return (
    <div className="error-container">
      <h2>No Results Found</h2>
      <p>We couldn't find any career recommendations. Please try taking the quiz again.</p>
      <button onClick={handleRetakeQuiz} className="retry-button">
        Take Quiz Again
      </button>
    </div>
  );

  return (
    <div className="results-container">
      <h1>Your Career Analysis</h1>
      
      <div className="recommendations-grid">
        {results.map((result, index) => (
          <div key={index} className="recommendation-card">
            <h2>{result.career}</h2>
            <div className="score">
              Match Score: {Math.round(result.score)}%
            </div>
            
            <div className="subjects">
              <h3>Recommended Subjects</h3>
              <ul>
                {result.subjects?.map((subject, idx) => (
                  <li key={idx}>{subject}</li>
                ))}
              </ul>
            </div>
            
            <div className="exams">
              <h3>Required Exams</h3>
              <ul>
                {result.exams?.map((exam, idx) => (
                  <li key={idx}>{exam}</li>
                ))}
              </ul>
            </div>

            {result.colleges && (
              <div className="colleges">
                <h3>Top Colleges</h3>
                <div className="colleges-grid">
                  {result.colleges.map((college, idx) => (
                    <div key={idx} className="college-card">
                      <h4>{college.name}</h4>
                      <p className="college-location">{college.location}</p>
                      <p className="college-ranking">Rank: #{college.ranking}</p>
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="college-link"
                      >
                        Visit Website →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Analysis Section */}
      <div className="ai-analysis-section">
        <h2>Personalized Analysis</h2>
        
        <div className="analysis-grid">
          {/* Personality Traits */}
          <div className="analysis-card">
            <h3>Your Personality Traits</h3>
            <div className="traits-chart">
              {Object.entries(results[0]?.aiAnalysis?.personalityTraits || {}).map(([trait, score]) => (
                <div key={trait} className="trait-bar">
                  <span className="trait-name">{trait}</span>
                  <div className="trait-progress">
                    <div 
                      className="trait-fill" 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="trait-score">{Math.round(score)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="analysis-card">
            <h3>Your Learning Style</h3>
            <p className="learning-style">
              {results[0]?.aiAnalysis?.learningStyle}
            </p>
            <div className="study-tips">
              <h4>Recommended Study Tips</h4>
              <ul>
                {results[0]?.aiAnalysis?.recommendations?.studyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skill Development */}
          <div className="analysis-card">
            <h3>Skill Development Plan</h3>
            {results[0]?.aiAnalysis?.recommendations?.skillDevelopment.map((skill, idx) => (
              <div key={idx} className="skill-section">
                <h4>{skill.area}</h4>
                <ul>
                  {skill.activities.map((activity, actIdx) => (
                    <li key={actIdx}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="analysis-card">
            <h3>Recommended Next Steps</h3>
            <div className="next-steps">
              {results[0]?.aiAnalysis?.recommendations?.nextSteps.map((step, idx) => (
                <div key={idx} className="step-item">
                  <span className="step-number">{idx + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleRetakeQuiz} className="retake-button">
        Take Quiz Again
      </button>
    </div>
  );
}

export default Results; 