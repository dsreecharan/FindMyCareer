import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-text">FindMyCareer</span>
          <span className="brand-dot">.</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Career Quiz</Link>
        <button onClick={handleExit} className="exit-button">
          Exit
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 