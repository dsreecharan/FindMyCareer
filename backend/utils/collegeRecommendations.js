import { collegeDatabase } from '../data/colleges.js';

export function getCollegeRecommendations(careerPath, userProfile) {
  const recommendations = {
    government: [],
    private: []
  };
  
  // Get colleges by stream and type
  const streamColleges = getCollegesByStream(careerPath);
  if (!streamColleges) return recommendations;

  // Process government colleges
  recommendations.government = processColleges(
    streamColleges.government,
    userProfile,
    { maxBudget: userProfile.maxBudget || Infinity }
  );

  // Process private colleges
  recommendations.private = processColleges(
    streamColleges.private,
    userProfile,
    { maxBudget: userProfile.maxBudget || Infinity }
  );

  return recommendations;
}

function processColleges(colleges, userProfile, options) {
  return colleges
    .filter(college => {
      const meetsAcademicCriteria = college.cutoff <= (userProfile.academicScore + 2);
      const meetsBudgetCriteria = parseFloat(college.fees) <= options.maxBudget;
      const meetsLocationPreference = !userProfile.preferredLocation || 
        college.location.includes(userProfile.preferredLocation);
      
      return meetsAcademicCriteria && meetsBudgetCriteria && meetsLocationPreference;
    })
    .sort((a, b) => {
      const accreditationDiff = getAccreditationScore(b.accreditation) - 
                               getAccreditationScore(a.accreditation);
      return accreditationDiff || (a.nirfRank - b.nirfRank);
    })
    .slice(0, 5)
    .map(college => ({
      ...college,
      matchScore: calculateMatchScore(college, userProfile),
      whyRecommended: generateRecommendationReason(college, userProfile)
    }));
}

function getAccreditationScore(accreditation) {
  const scores = {
    'NAAC A++': 5,
    'NAAC A+': 4,
    'NAAC A': 3,
    'NAAC B++': 2,
    'NAAC B+': 1
  };
  return scores[accreditation] || 0;
}

function calculateMatchScore(college, userProfile) {
  let score = 0;
  
  // NIRF Ranking consideration (max 40 points)
  score += Math.max(0, 40 - (college.nirfRank * 2));
  
  // Accreditation consideration (max 30 points)
  score += getAccreditationScore(college.accreditation) * 6;
  
  // Academic cutoff match (max 20 points)
  const cutoffDiff = Math.abs(college.cutoff - userProfile.academicScore);
  score += Math.max(0, 20 - (cutoffDiff * 2));
  
  // Location preference (max 10 points)
  if (userProfile.preferredLocation && 
      college.location.includes(userProfile.preferredLocation)) {
    score += 10;
  }
  
  return Math.min(100, score);
}

function generateRecommendationReason(college, userProfile) {
  const reasons = [];
  
  if (college.nirfRank <= 10) {
    reasons.push(`Top ${college.nirfRank} NIRF Ranked Institution`);
  }
  
  if (college.accreditation.includes('A++')) {
    reasons.push('Highest NAAC Accreditation');
  }
  
  if (college.features) {
    reasons.push(...college.features.slice(0, 2));
  }
  
  return reasons;
} 