const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const parseCSV = require('./src/utils/csvParser').parseCSV;
const Career = require('./src/models/Career.model').default;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/findmycareer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Load career data from CSV
const loadCareerData = async () => {
  const filePath = path.join(__dirname, 'uploads/career_recommendation_dataset.csv');
  const careerData = await parseCSV(filePath);
  return careerData;
};

// Insert careers into the database
const insertCareers = async () => {
  try {
    const careers = await loadCareerData();
    for (const career of careers) {
      const newCareer = new Career({
        title: career.careerTitle,
        analyticalThreshold: career.analyticalThreshold,
        analyticalWeight: career.analyticalWeight,
        creativeThreshold: career.creativeThreshold,
        creativeWeight: career.creativeWeight,
        socialThreshold: career.socialThreshold,
        socialWeight: career.socialWeight,
        structuredThreshold: career.structuredThreshold,
        structuredWeight: career.structuredWeight,
      });
      await newCareer.save();
    }
    console.log('Careers inserted successfully');
  } catch (error) {
    console.error('Error inserting careers:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertCareers(); 