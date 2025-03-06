const mongoose = require('mongoose');
const College = require('../models/college.model');
require('dotenv').config();

const sampleColleges = [
    // Government Colleges
    {
        name: 'Indian Institute of Technology Bombay',
        type: 'government',
        country: 'India',
        ranking: {
            india: 1,
            global: 177
        },
        eligibility: ['Class 12 with PCM', 'JEE Advanced qualified'],
        exams: [
            {
                name: 'JEE Advanced',
                description: 'Joint Entrance Examination Advanced',
                required: true
            }
        ],
        applicationProcess: {
            method: 'Online',
            opensOn: '2024-05-01',
            deadline: '2024-06-30',
            portal: 'https://josaa.nic.in'
        },
        careers: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Research Scientist'],
        courses: [
            {
                name: 'Computer Science and Engineering',
                duration: '4 years',
                description: 'B.Tech in Computer Science and Engineering'
            },
            {
                name: 'Electronics Engineering',
                duration: '4 years',
                description: 'B.Tech in Electronics Engineering'
            }
        ],
        isActive: true
    },
    {
        name: 'All India Institute of Medical Sciences',
        type: 'government',
        country: 'India',
        ranking: {
            india: 1,
            global: 231
        },
        eligibility: ['Class 12 with PCB', 'NEET-UG qualified'],
        exams: [
            {
                name: 'NEET-UG',
                description: 'National Eligibility cum Entrance Test',
                required: true
            }
        ],
        applicationProcess: {
            method: 'Online',
            opensOn: '2024-06-01',
            deadline: '2024-07-15',
            portal: 'https://aiimsexams.ac.in'
        },
        careers: ['Doctor', 'Surgeon', 'Medical Researcher', 'Healthcare Administrator'],
        courses: [
            {
                name: 'MBBS',
                duration: '5.5 years',
                description: 'Bachelor of Medicine and Bachelor of Surgery'
            },
            {
                name: 'MD',
                duration: '3 years',
                description: 'Doctor of Medicine'
            }
        ],
        isActive: true
    },
    // Private Colleges
    {
        name: 'Manipal Institute of Technology',
        type: 'private',
        country: 'India',
        ranking: {
            india: 7,
            global: 751
        },
        eligibility: ['Class 12 with PCM', 'MET/JEE Mains qualified'],
        exams: [
            {
                name: 'MET',
                description: 'Manipal Entrance Test',
                required: true
            },
            {
                name: 'JEE Mains',
                description: 'Joint Entrance Examination Mains',
                required: false
            }
        ],
        applicationProcess: {
            method: 'Online',
            opensOn: '2024-04-01',
            deadline: '2024-05-30',
            portal: 'https://manipal.edu/admissions'
        },
        careers: ['Software Engineer', 'Systems Architect', 'Product Manager', 'Technical Consultant'],
        courses: [
            {
                name: 'Computer Science and Engineering',
                duration: '4 years',
                description: 'B.Tech in Computer Science and Engineering'
            },
            {
                name: 'Information Technology',
                duration: '4 years',
                description: 'B.Tech in Information Technology'
            }
        ],
        isActive: true
    },
    // International Colleges
    {
        name: 'Massachusetts Institute of Technology',
        type: 'international',
        country: 'USA',
        ranking: {
            global: 1
        },
        eligibility: ['High School Diploma', 'SAT/ACT', 'TOEFL/IELTS'],
        exams: [
            {
                name: 'SAT',
                description: 'Scholastic Assessment Test',
                required: false
            },
            {
                name: 'ACT',
                description: 'American College Testing',
                required: false
            },
            {
                name: 'TOEFL',
                description: 'Test of English as a Foreign Language',
                required: true
            }
        ],
        applicationProcess: {
            method: 'Common Application',
            opensOn: '2024-08-01',
            deadline: '2024-01-01',
            portal: 'https://apply.mit.edu'
        },
        careers: ['Software Engineer', 'Data Scientist', 'AI Researcher', 'Robotics Engineer'],
        courses: [
            {
                name: 'Computer Science and Engineering',
                duration: '4 years',
                description: 'Bachelor of Science in Computer Science and Engineering'
            },
            {
                name: 'Artificial Intelligence and Machine Learning',
                duration: '4 years',
                description: 'Bachelor of Science in AI and ML'
            }
        ],
        isActive: true
    }
];

async function populateColleges() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing colleges
        await College.deleteMany({});
        console.log('Cleared existing colleges');

        // Insert sample colleges
        const result = await College.insertMany(sampleColleges);
        console.log(`Successfully inserted ${result.length} colleges`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error populating colleges:', error);
        process.exit(1);
    }
}

// Run the script
populateColleges(); 