function CollegeRecommendations({ recommendations }) {
  return (
    <div className="college-recommendations">
      <h2>Recommended Colleges</h2>
      
      <CollegeSection 
        title="Top Government Colleges" 
        colleges={recommendations.government}
        type="government"
      />
      
      <CollegeSection 
        title="Top Private Colleges" 
        colleges={recommendations.private}
        type="private"
      />
    </div>
  );
} 