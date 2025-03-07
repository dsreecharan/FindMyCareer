"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const csvParser_1 = require("../utils/csvParser");
const Career_model_1 = __importDefault(require("../models/Career.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default
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
function processData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create uploads directory if it doesn't exist
            const uploadsDir = path_1.default.join(__dirname, '../../uploads');
            if (!fs_1.default.existsSync(uploadsDir)) {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
            }
            // Copy CSV files from the project root to the uploads directory
            const sourceDir = path_1.default.join(__dirname, '../../../..');
            const files = ['career_recommendation_dataset.csv', 'master_career_dataset.csv'];
            for (const file of files) {
                const sourcePath = path_1.default.join(sourceDir, file);
                const destPath = path_1.default.join(uploadsDir, file);
                if (fs_1.default.existsSync(sourcePath)) {
                    fs_1.default.copyFileSync(sourcePath, destPath);
                    console.log(`Copied ${file} to uploads directory`);
                }
                else {
                    console.error(`File not found: ${sourcePath}`);
                }
            }
            // Process master career dataset and populate Career collection
            const careerDataPath = path_1.default.join(uploadsDir, 'master_career_dataset.csv');
            if (fs_1.default.existsSync(careerDataPath)) {
                const careerData = yield (0, csvParser_1.parseCSV)(careerDataPath);
                // Process each career and save to database
                for (const data of careerData) {
                    // Split comma-separated values into arrays
                    const skills = data.skills ? data.skills.split(',').map((s) => s.trim()) : [];
                    const personalityTraits = data.personalityTraits
                        ? data.personalityTraits.split(',').map((t) => t.trim())
                        : [];
                    const educationRequirements = data.educationRequirements
                        ? data.educationRequirements.split(',').map((e) => e.trim())
                        : [];
                    // Parse college data
                    const colleges = data.colleges
                        ? data.colleges.split(';').map((c) => {
                            const [name, location, rankingStr] = c.split(',').map((s) => s.trim());
                            return {
                                name,
                                location,
                                ranking: rankingStr ? parseInt(rankingStr, 10) : undefined,
                            };
                        })
                        : [];
                    // Parse entrance exam data
                    const entranceExams = data.entranceExams
                        ? data.entranceExams.split(';').map((e) => {
                            const [name, description, website] = e.split(',').map((s) => s.trim());
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
                            ? data.requiredSubjects.split(',').map((s) => s.trim())
                            : [],
                        requirements: data.otherRequirements
                            ? data.otherRequirements.split(',').map((r) => r.trim())
                            : [],
                    };
                    // Parse application process
                    const applicationProcess = {
                        steps: data.applicationSteps
                            ? data.applicationSteps.split(',').map((s) => s.trim())
                            : [],
                        deadlines: data.applicationDeadlines
                            ? data.applicationDeadlines.split(',').map((d) => d.trim())
                            : [],
                        documents: data.requiredDocuments
                            ? data.requiredDocuments.split(',').map((d) => d.trim())
                            : [],
                    };
                    // Create or update career
                    yield Career_model_1.default.findOneAndUpdate({ title: data.title }, {
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
                    }, { upsert: true, new: true });
                }
                console.log(`Processed ${careerData.length} careers`);
            }
            // Create sample questions if none exist
            const questionCount = yield Question_model_1.default.countDocuments();
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
                yield Question_model_1.default.insertMany(sampleQuestions);
                console.log(`Created ${sampleQuestions.length} sample questions`);
            }
            console.log('Data processing completed successfully');
            process.exit(0);
        }
        catch (error) {
            console.error('Data processing error:', error);
            process.exit(1);
        }
    });
}
