const path = require('path');
const parseCSV = require('./src/utils/csvParser').parseCSV;

// Load career data from CSV
const loadCareerData = async () => {
  const filePath = path.join(__dirname, 'uploads/career_recommendation_dataset.csv');
  const careerData = await parseCSV(filePath);
  return careerData;
};

// Load master career data from CSV
const loadMasterCareerData = async () => {
  const filePath = path.join(__dirname, 'uploads/master_career_dataset.csv');
  const masterCareerData = await parseCSV(filePath);
  return masterCareerData;
};

// Load career recommendation data from CSV
const loadCareerRecommendationData = async () => {
  const filePath = path.join(__dirname, 'uploads/career_recommendation_dataset.csv');
  const careerRecommendationData = await parseCSV(filePath);
  return careerRecommendationData;
};

// Calculate match percentages based on user scores
const calculateMatches = (scores, careerData) => {
  return careerData.map((career) => {
    let totalMatchPoints = 0;
    let totalPossiblePoints = 0;

    // Compare scores with threshold values in the recommendation data
    Object.keys(scores).forEach((scoreKey) => {
      const userScore = scores[scoreKey];
      const thresholdKey = `${scoreKey}Threshold`;

      if (career[thresholdKey]) {
        const threshold = parseFloat(career[thresholdKey]);
        const weight = career[`${scoreKey}Weight`] ? parseFloat(career[`${scoreKey}Weight`]) : 1;

        totalPossiblePoints += weight;

        if (userScore >= threshold) {
          totalMatchPoints += weight;
        }
      }
    });

    const matchPercentage = totalPossiblePoints > 0
      ? (totalMatchPoints / totalPossiblePoints) * 100
      : 0;

    return {
      careerId: career.careerId,
      careerTitle: career.careerTitle,
      matchPercentage: Math.round(matchPercentage),
    };
  });
};

// Recommend the best-matched career
const recommendCareer = (availableCareers) => {
  if (availableCareers.length === 0) {
    console.log('No careers available for recommendation.');
    return;
  }

  // Sort careers by match percentage in descending order
  const sortedCareers = availableCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Recommend the career with the highest match percentage
  const recommendedCareer = sortedCareers[0];
  console.log('Recommended Career:', recommendedCareer);
  return recommendedCareer;
};

// Get additional details for the recommended career
const getCareerDetails = async (recommendedCareer) => {
  const masterCareerData = await loadMasterCareerData();
  // Consider similar titles for matching
  const careerDetails = masterCareerData.find(career => {
    return career['Career Recommendation'] === recommendedCareer.careerTitle ||
           (recommendedCareer.careerTitle === 'Software Developer' && career['Career Recommendation'] === 'Software Engineer') ||
           (recommendedCareer.careerTitle === 'Data Scientist' && career['Career Recommendation'] === 'Data Analyst') ||
           (recommendedCareer.careerTitle === 'Mechanical Engineer' && career['Career Recommendation'] === 'Mechanical Engineering');
  });
  if (careerDetails) {
    console.log('Career Details:');
    console.log(`Matched Career Path: ${careerDetails['Matched Career Path']}`);
    console.log(`College Name: ${careerDetails['College Name']}`);
    console.log(`Location: ${careerDetails['Location']}`);
    console.log(`Ranking: ${careerDetails['Ranking']}`);
    console.log(`Eligibility Criteria: ${careerDetails['Eligibility Criteria']}`);
    console.log(`Entrance Exams: ${careerDetails['Entrance Exams']}`);
    console.log(`Application Process & Deadlines: ${careerDetails['Application Process & Deadlines']}`);
  } else {
    console.log('No additional details found for the recommended career.');
  }
};

// Detect available careers, recommend the best match, and get additional details
const detectRecommendAndDetailCareer = async (userScores) => {
  const careerRecommendationData = await loadCareerRecommendationData();
  const matches = calculateMatches(userScores, careerRecommendationData);
  const availableCareers = matches.filter(match => match.matchPercentage > 0);
  console.log('Available Careers:', availableCareers);

  // Recommend the best-matched career
  const recommendedCareer = recommendCareer(availableCareers);

  // Get additional details for the recommended career
  if (recommendedCareer) {
    await getCareerDetails(recommendedCareer);
  }
};

// Example user scores
const userScores = {
  analytical: 7,
  creative: 5,
  social: 6,
  structured: 8,
};

detectRecommendAndDetailCareer(userScores); 