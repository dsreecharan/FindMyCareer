import { useState } from 'react';
import './UserForm.css';

function UserForm({ onSubmit }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    grade: '',
    school: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="user-form-container">
      <h2>Before we begin...</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            name="grade"
            value={userData.grade}
            onChange={handleChange}
            required
          >
            <option value="">Select Grade</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="school">School Name</label>
          <input
            type="text"
            id="school"
            name="school"
            value={userData.school}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default UserForm; 