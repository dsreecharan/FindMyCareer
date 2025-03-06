import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { parseCSV } from '../utils/csvParser';
import Career from '../models/Career.model';
import Question from '../models/Question.model';

// Define types for the career data
interface CareerData {
  title: string;
  description: string;
  skills?: string;
  personalityTraits?: string;
  educationRequirements?: string;
  jobOutlook?: string;
  averageSalary?: string;
  colleges?: string;
  entranceExams?: string;
  minGrade?: string;
  requiredSubjects?: string;
  otherRequirements?: string;
  applicationSteps?: string;
  applicationDeadlines?: string;
  requiredDocuments?: string;
  [key: string]: any;
}

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findmycareer')
  .then(() => {
    console.log('Connected to MongoDB');
    processData();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

/**
 * Process the CSV data and populate the database
 */
async function processData() {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Copy CSV files from the project root to the uploads directory
    const sourceDir = path.join(__dirname, '../../../..');
    const files = ['career_recommendation_dataset.csv', 'master_career_dataset.csv'];

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(uploadsDir, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${file} to uploads directory`);
      } else {
        console.error(`File not found: ${sourcePath}`);
      }
    }

    // Process master career dataset and populate Career collection
    const careerDataPath = path.join(uploadsDir, 'master_career_dataset.csv');
    if (fs.existsSync(careerDataPath)) {
      const careerData = await parseCSV<CareerData>(careerDataPath);
      
      // Process each career and save to database
      for (const data of careerData) {
        // Split comma-separated values into arrays
        const skills = data.skills ? data.skills.split(',').map((s: string) => s.trim()) : [];
        const personalityTraits = data.personalityTraits 
          ? data.personalityTraits.split(',').map((t: string) => t.trim()) 
          : [];
        const educationRequirements = data.educationRequirements 
          ? data.educationRequirements.split(',').map((e: string) => e.trim()) 
          : [];
        
        // Parse college data
        const colleges = data.colleges 
          ? data.colleges.split(';').map((c: string) => {
              const [name, location, rankingStr] = c.split(',').map((s: string) => s.trim());
              return {
                name,
                location,
                ranking: rankingStr ? parseInt(rankingStr, 10) : undefined,
              };
            })
          : [];
        
        // Parse entrance exam data
        const entranceExams = data.entranceExams 
          ? data.entranceExams.split(';').map((e: string) => {
              const [name, description, website] = e.split(',').map((s: string) => s.trim());
              return {
                name,
                description: description || undefined,
                website: website || undefined,
              };
            })
          : [];
        
        // Parse eligibility criteria
        const eligibility = {
          minGrade: data.minGrade || undefined,
          subjects: data.requiredSubjects 
            ? data.requiredSubjects.split(',').map((s: string) => s.trim()) 
            : [],
          requirements: data.otherRequirements 
            ? data.otherRequirements.split(',').map((r: string) => r.trim()) 
            : [],
        };
        
        // Parse application process
        const applicationProcess = {
          steps: data.applicationSteps 
            ? data.applicationSteps.split(',').map((s: string) => s.trim()) 
            : [],
          deadlines: data.applicationDeadlines 
            ? data.applicationDeadlines.split(',').map((d: string) => d.trim()) 
            : [],
          documents: data.requiredDocuments 
            ? data.requiredDocuments.split(',').map((d: string) => d.trim()) 
            : [],
        };
        
        // Create or update career
        await Career.findOneAndUpdate(
          { title: data.title },
          {
            title: data.title,
            description: data.description,
            skills,
            personalityTraits,
            educationRequirements,
            jobOutlook: data.jobOutlook,
            averageSalary: data.averageSalary,
            colleges,
            entranceExams,
            eligibility,
            applicationProcess,
          },
          { upsert: true, new: true }
        );
      }
      
      console.log(`Processed ${careerData.length} careers`);
    }

    // Create sample questions if none exist
    const questionCount = await Question.countDocuments();
    if (questionCount === 0) {
      const sampleQuestions = [
        {
          question: "How do you prefer to solve problems?",
          options: [
            { 
              id: "a", 
              text: "Analyze data and find logical solutions", 
              score: { analytical: 3, creative: 1, social: 0, structured: 1 } 
            },
            { 
              id: "b", 
              text: "Think outside the box and find creative solutions", 
              score: { analytical: 1, creative: 3, social: 1, structured: 0 } 
            },
            { 
              id: "c", 
              text: "Discuss with others and find collaborative solutions", 
              score: { analytical: 0, creative: 1, social: 3, structured: 1 } 
            },
            { 
              id: "d", 
              text: "Use practical experience and hands-on approach", 
              score: { analytical: 1, creative: 0, social: 1, structured: 3 } 
            },
          ],
          order: 1,
        },
        {
          question: "In a group project, which role do you naturally take?",
          options: [
            { 
              id: "a", 
              text: "The organizer who plans everything", 
              score: { analytical: 2, creative: 0, social: 1, structured: 2 } 
            },
            { 
              id: "b", 
              text: "The idea generator who comes up with concepts", 
              score: { analytical: 1, creative: 3, social: 0, structured: 0 } 
            },
            { 
              id: "c", 
              text: "The mediator who ensures everyone works together", 
              score: { analytical: 0, creative: 1, social: 3, structured: 0 } 
            },
            { 
              id: "d", 
              text: "The implementer who gets things done", 
              score: { analytical: 1, creative: 0, social: 0, structured: 3 } 
            },
          ],
          order: 2,
        },
        {
          question: "What kind of work environment do you prefer?",
          options: [
            { 
              id: "a", 
              text: "Structured and organized with clear rules", 
              score: { analytical: 2, creative: 0, social: 1, structured: 2 } 
            },
            { 
              id: "b", 
              text: "Dynamic and flexible with room for innovation", 
              score: { analytical: 1, creative: 3, social: 1, structured: 0 } 
            },
            { 
              id: "c", 
              text: "Collaborative with lots of team interaction", 
              score: { analytical: 0, creative: 1, social: 3, structured: 0 } 
            },
            { 
              id: "d", 
              text: "Hands-on where I can see the immediate results of my work", 
              score: { analytical: 0, creative: 1, social: 0, structured: 3 } 
            },
          ],
          order: 3,
        },
      ];

      await Question.insertMany(sampleQuestions);
      console.log(`Created ${sampleQuestions.length} sample questions`);
    }

    console.log('Data processing completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Data processing error:', error);
    process.exit(1);
  }
} 