import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

/**
 * Parses a CSV file and returns the data as an array of objects
 * @param filePath Path to the CSV file
 * @returns Promise that resolves to an array of objects
 */
export const parseCSV = async <T>(filePath: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data as T))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Loads career recommendation data from CSV
 * @returns Promise that resolves to career recommendation data
 */
export const loadCareerRecommendationData = async () => {
  const filePath = path.join(__dirname, '../../uploads/career_recommendation_dataset.csv');
  return parseCSV(filePath);
};

/**
 * Loads master career data from CSV
 * @returns Promise that resolves to master career data
 */
export const loadMasterCareerData = async () => {
  const filePath = path.join(__dirname, '../../uploads/master_career_dataset.csv');
  return parseCSV(filePath);
};

/**
 * Maps test scores to career recommendations
 * @param scores User's test scores
 * @param recommendationData Career recommendation data from CSV
 * @returns Array of recommended career IDs sorted by match percentage
 */
export const mapScoresToCareers = (
  scores: { [key: string]: number },
  recommendationData: any[]
) => {
  // Calculate match percentage for each career
  const careerMatches = recommendationData.map((career) => {
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

  // Sort by match percentage (highest first)
  return careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}; 