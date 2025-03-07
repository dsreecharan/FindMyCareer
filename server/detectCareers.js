const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// File paths
const masterCareerDatasetPath = path.join(__dirname, 'uploads/master_career_dataset.csv');
const logFilePath = path.join(__dirname, 'logs/career_detection.log');

// Function to log messages
function logMessage(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  fs.appendFileSync(logFilePath, logEntry);
  console.log(message);
}

// Function to detect careers from CSV
async function detectCareers() {
  logMessage('Starting career detection from CSV files...');
  
  try {
    // Check if the file exists
    if (!fs.existsSync(masterCareerDatasetPath)) {
      logMessage(`Error: File not found at ${masterCareerDatasetPath}`);
      return;
    }
    
    logMessage(`Reading file from ${masterCareerDatasetPath}`);
    
    // Parse the CSV file
    const results = [];
    fs.createReadStream(masterCareerDatasetPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        logMessage(`Parsed ${results.length} rows from CSV file`);
        
        // Extract unique careers
        const uniqueCareers = new Set();
        results.forEach(row => {
          if (row['career_name']) {
            uniqueCareers.add(row['career_name']);
          }
        });
        
        const careersList = Array.from(uniqueCareers);
        logMessage(`Detected ${careersList.length} unique careers: ${careersList.join(', ')}`);
        
        // Create career objects with details
        const careersWithDetails = careersList.map(careerTitle => {
          // Find all rows for this career
          const careerRows = results.filter(row => row['career_name'] === careerTitle);
          
          // Get colleges
          const colleges = [];
          careerRows.forEach(row => {
            if (row['colleges']) {
              const collegesList = row['colleges'].split(';');
              collegesList.forEach(college => {
                colleges.push({
                  name: college.trim(),
                  location: 'Not specified'
                });
              });
            }
          });
          
          // Get entrance exams
          const entranceExams = new Set();
          careerRows.forEach(row => {
            if (row['entrance_exams']) {
              row['entrance_exams'].split(';').forEach(exam => entranceExams.add(exam.trim()));
            }
          });
          
          // Create career object
          return {
            title: careerTitle,
            description: careerRows.length > 0 && careerRows[0]['description'] ? careerRows[0]['description'] : `Career path in ${careerTitle}`,
            skills: careerRows.length > 0 && careerRows[0]['skills_required'] ? careerRows[0]['skills_required'].split(',').map(skill => skill.trim()) : ['Technical Knowledge', 'Communication', 'Problem Solving'],
            averageSalary: careerRows.length > 0 && careerRows[0]['average_salary'] ? careerRows[0]['average_salary'] : 'Varies by location and experience',
            colleges: colleges,
            entranceExams: Array.from(entranceExams).map(exam => ({ name: exam }))
          };
        });
        
        // Write to a JSON file for future use
        const outputPath = path.join(__dirname, 'data/careers.json');
        
        // Create data directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, 'data'))) {
          fs.mkdirSync(path.join(__dirname, 'data'));
        }
        
        fs.writeFileSync(outputPath, JSON.stringify(careersWithDetails, null, 2));
        logMessage(`Career data written to ${outputPath}`);
        
        // Log results
        logMessage('Career detection completed successfully.');
        logMessage(`Detected Careers: ${JSON.stringify(careersWithDetails, null, 2)}`);
      });
  } catch (error) {
    logMessage(`Error detecting careers: ${error.message}`);
  }
}

// Run the function
detectCareers(); 