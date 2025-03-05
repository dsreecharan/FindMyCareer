const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Question } = require('../models/assessment.model');

// Load environment variables
dotenv.config();

const questions = [
  // Teamwork and Leadership
  {
    text: 'Imagine you are given a team project at school. One of your team members consistently misses deadlines and isn\'t contributing much. What do you do?',
    category: 'personality',
    options: [
      { text: 'I would try to understand why they are struggling and offer to help them catch up.', score: 5 },
      { text: 'I would take on the extra work myself to ensure the project gets done.', score: 4 },
      { text: 'I would discuss it with the teacher or a supervisor to resolve the situation.', score: 3 },
      { text: 'I would get frustrated and express my dissatisfaction with the team member publicly.', score: 1 },
    ],
  },
  {
    text: 'You are assigned a difficult task that requires creativity. However, you don\'t have much guidance or clear instructions. How do you approach it?',
    category: 'personality',
    options: [
      { text: 'I would analyze the problem and create a structured plan to solve it.', score: 5 },
      { text: 'I would start brainstorming ideas and testing them, even without clear direction.', score: 4 },
      { text: 'I would seek advice from others and collaborate on finding a solution.', score: 3 },
      { text: 'I would feel unsure and might struggle to make any progress.', score: 1 },
    ],
  },

  // Academic Interests
  {
    text: 'Which subjects do you enjoy most in school?',
    category: 'interests',
    options: [
      { text: 'Math and Science', score: 5 },
      { text: 'English and Social Studies', score: 4 },
      { text: 'Art, Music, or Drama', score: 3 },
      { text: 'Physical Education or Health', score: 2 },
    ],
  },

  // Decision Making
  {
    text: 'If you had to choose between a challenging academic program at school or a fun, low-pressure part-time job, which would you choose?',
    category: 'values',
    options: [
      { text: 'I would choose the academic program because it will help me in the future.', score: 5 },
      { text: 'I would go for the part-time job because I value the experience and flexibility.', score: 3 },
      { text: 'I would try to balance both, even if it means working harder.', score: 4 },
      { text: 'I would feel torn and might delay making a decision until I know more.', score: 1 },
    ],
  },

  // Motivation
  {
    text: 'What drives you to do your best in school or activities?',
    category: 'values',
    options: [
      { text: 'Achieving personal success', score: 5 },
      { text: 'Helping others or making a difference', score: 4 },
      { text: 'Competing and winning', score: 3 },
      { text: 'Gaining praise from teachers or parents', score: 2 },
    ],
  },

  // Problem Solving
  {
    text: 'You\'re working on a project, but halfway through, you realize that the approach you\'re taking isn\'t going to work. What do you do next?',
    category: 'personality',
    options: [
      { text: 'I would stop, rethink the project, and come up with a new approach.', score: 5 },
      { text: 'I would try to fix the issues without changing the entire approach.', score: 4 },
      { text: 'I would ask for advice from others to help me solve the problem.', score: 3 },
      { text: 'I would feel overwhelmed and might procrastinate on finding a solution.', score: 1 },
    ],
  },

  // Analytical Thinking
  {
    text: 'When solving a complex problem, do you prefer to:',
    category: 'skills',
    options: [
      { text: 'Break it down step-by-step and analyze each part', score: 5 },
      { text: 'Think about the big picture and tackle the issue from a broader perspective', score: 4 },
      { text: 'Get others\' opinions before proceeding', score: 3 },
      { text: 'Jump in and try different solutions until something works', score: 2 },
    ],
  },

  // Stress Management
  {
    text: 'You\'re in a stressful situation, and things aren\'t going as planned. How do you handle it?',
    category: 'personality',
    options: [
      { text: 'I stay calm, take a deep breath, and focus on finding a solution.', score: 5 },
      { text: 'I feel overwhelmed and need to talk to someone to calm down.', score: 3 },
      { text: 'I focus on the task at hand and ignore any distractions.', score: 4 },
      { text: 'I would get anxious and might not know how to move forward.', score: 1 },
    ],
  },

  // Team Dynamics
  {
    text: 'In a group project, one of your team members isn\'t pulling their weight, but the group is depending on them for a crucial part of the project. How do you handle this situation?',
    category: 'personality',
    options: [
      { text: 'I would try to motivate them and see if I can help them with their part.', score: 5 },
      { text: 'I would take over their part to ensure the project doesn\'t fail.', score: 4 },
      { text: 'I would address the issue directly and ask the team member to do their share.', score: 3 },
      { text: 'I would get frustrated and might just go along with the group\'s decision, even if it\'s not ideal.', score: 1 },
    ],
  },

  // Emotional Intelligence
  {
    text: 'How would you describe your typical mood?',
    category: 'personality',
    options: [
      { text: 'I\'m usually calm and relaxed', score: 5 },
      { text: 'I tend to be energetic and optimistic', score: 4 },
      { text: 'I\'m often serious and focused', score: 3 },
      { text: 'I feel more anxious or worried than others', score: 1 },
    ],
  },

  // Career Values
  {
    text: 'What\'s more important to you in a career?',
    category: 'values',
    options: [
      { text: 'High salary and financial stability', score: 5 },
      { text: 'Helping others or making a difference', score: 4 },
      { text: 'Creative expression and freedom', score: 3 },
      { text: 'Job security and a clear career path', score: 2 },
    ],
  },

  // Leadership and Responsibility
  {
    text: 'You\'re faced with a decision to either join a club at school where you could develop your leadership skills but would be expected to take on a lot of responsibility, or stay in a more relaxed environment with little pressure. What\'s your choice?',
    category: 'personality',
    options: [
      { text: 'I would join the leadership club because I enjoy challenges and growing my skills.', score: 5 },
      { text: 'I would prefer the relaxed environment because I like to take things easy.', score: 2 },
      { text: 'I would try to balance both, taking leadership in the club but not overcommitting.', score: 4 },
      { text: 'I would avoid both, not feeling confident about either option.', score: 1 },
    ],
  },

  // Work Environment Preference
  {
    text: 'Which type of work environment do you think you would thrive in?',
    category: 'interests',
    options: [
      { text: 'An office with structured hours and tasks', score: 5 },
      { text: 'A flexible, creative environment with open-ended projects', score: 4 },
      { text: 'A field or hands-on environment with physical activity', score: 3 },
      { text: 'A service-oriented environment where I can directly help others', score: 2 },
    ],
  },

  // Adaptability
  {
    text: 'Your plans for the weekend suddenly change because your friends canceled. How do you react?',
    category: 'personality',
    options: [
      { text: 'I would adapt quickly and find something new to do on my own or with others.', score: 5 },
      { text: 'I would feel disappointed but try to make the best of it.', score: 4 },
      { text: 'I would become upset and not know how to spend my time.', score: 1 },
      { text: 'I would look for another group of friends to make alternate plans.', score: 3 },
    ],
  },

  // Social Interaction
  {
    text: 'Imagine you\'re at a social gathering, and you don\'t know many people. What do you do?',
    category: 'personality',
    options: [
      { text: 'I would find a few people to talk to and try to make new connections.', score: 5 },
      { text: 'I would stay in the background and observe until I feel comfortable.', score: 3 },
      { text: 'I would focus on finding someone I know and stick with them.', score: 2 },
      { text: 'I would feel uncomfortable and try to leave early.', score: 1 },
    ],
  },
];

const seedQuestions = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/findmycareer';
    console.log('Connecting to MongoDB at:', mongoUri);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing questions
    const deleteResult = await Question.deleteMany({});
    console.log('Cleared existing questions:', deleteResult.deletedCount);

    // Insert new questions
    const insertedQuestions = await Question.insertMany(questions);
    console.log(`Successfully inserted ${insertedQuestions.length} questions`);

    // Verify the questions were inserted
    const count = await Question.countDocuments();
    console.log('Total questions in database:', count);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
};

seedQuestions(); 