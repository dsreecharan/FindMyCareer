function CollegeSection({ title, colleges, type }) {
  return (
    <div className={`college-section ${type}`}>
      <h3 className="section-title">{title}</h3>
      <div className="colleges-grid">
        {colleges.map((college, index) => (
          <div key={index} className="college-card">
            <div className="college-header">
              <h3>{college.name}</h3>
              <div className="college-badges">
                <span className="nirf-badge">
                  NIRF #{college.nirfRank}
                </span>
                <span className="accreditation-badge">
                  {college.accreditation}
                </span>
                <span className={`type-badge ${type}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="college-details">
              <div className="match-score">
                <div className="score-circle" 
                     style={{
                       background: `conic-gradient(#2563eb ${college.matchScore}%, 
                                  #e2e8f0 ${college.matchScore}%)`
                     }}>
                  {college.matchScore}%
                </div>
                <span>Match Score</span>
              </div>
              
              <div className="college-info">
                <p><strong>Location:</strong> {college.location}</p>
                <p><strong>Cutoff:</strong> {college.cutoff}%</p>
                <p><strong>Fees:</strong> {college.fees}</p>
                <div className="why-recommended">
                  <h4>Why Recommended:</h4>
                  <ul>
                    {college.whyRecommended.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="college-actions">
              <a href={college.website} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="visit-website">
                Visit Website
              </a>
              <button className="compare-button">
                Add to Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 