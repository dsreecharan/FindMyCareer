import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="animated-title">
            Find Your <span className="gradient-text">Perfect Career</span> Path
          </h1>
          <p className="hero-subtitle">
            AI-Powered Career Guidance for Your Future
          </p>
          <div className="cta-buttons">
            <Link to="/quiz" className="primary-button">
              Start Career Quiz
              <span className="button-icon">→</span>
            </Link>
            <a href="#features" className="secondary-button">
              Explore Features
              <span className="button-icon">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/career-guidance.png" alt="Career Guidance" />
          <div className="floating-cards">
            <div className="stat-card">
              <span className="stat-number">95%</span>
              <span className="stat-text">Career Match Rate</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1000+</span>
              <span className="stat-text">Career Paths</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>How <span className="highlight">FindMyCareer</span> Helps You</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Recommendations</h3>
            <p>Get career path suggestions based on your interests and skills</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Subject Guidance</h3>
            <p>Learn which subjects to focus on for your chosen career</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Exam Information</h3>
            <p>Discover relevant competitive exams and application details</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>College Insights</h3>
            <p>Coming soon: Explore top colleges for your career path</p>
          </div>
        </div>
      </div>

      <div className="why-section">
        <h2>Why Choose <span className="highlight">FindMyCareer</span>?</h2>
        <div className="why-grid">
          <div className="why-item">
            <h3>Data-Driven</h3>
            <p>Our recommendations are based on comprehensive analysis of your preferences</p>
          </div>
          <div className="why-item">
            <h3>Personalized</h3>
            <p>Get guidance tailored specifically to your interests and abilities</p>
          </div>
          <div className="why-item">
            <h3>Comprehensive</h3>
            <p>From career paths to exam details - we've got you covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 