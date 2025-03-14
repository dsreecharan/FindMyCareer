// MongoDB question insertion script
const sampleQuestions = [
  {
    question: "How do you prefer to solve problems?",
    options: [
      { 
        id: "a", 
        text: "Analyze data and find logical solutions", 
        score: { analytical: 4, creative: 1, social: 1, structured: 2 } 
      },
      { 
        id: "b", 
        text: "Think outside the box and find creative solutions", 
        score: { analytical: 1, creative: 4, social: 1, structured: 0 } 
      },
      { 
        id: "c", 
        text: "Discuss with others and find collaborative solutions", 
        score: { analytical: 1, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "Use practical experience and hands-on approach", 
        score: { analytical: 1, creative: 2, social: 1, structured: 4 } 
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
        score: { analytical: 2, creative: 0, social: 1, structured: 4 } 
      },
      { 
        id: "b", 
        text: "The idea generator who comes up with concepts", 
        score: { analytical: 1, creative: 4, social: 1, structured: 0 } 
      },
      { 
        id: "c", 
        text: "The mediator who ensures everyone works together", 
        score: { analytical: 0, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "The implementer who gets things done", 
        score: { analytical: 1, creative: 1, social: 1, structured: 4 } 
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
        score: { analytical: 2, creative: 0, social: 1, structured: 4 } 
      },
      { 
        id: "b", 
        text: "Dynamic and flexible with room for innovation", 
        score: { analytical: 1, creative: 4, social: 1, structured: 0 } 
      },
      { 
        id: "c", 
        text: "Collaborative with lots of team interaction", 
        score: { analytical: 0, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "Hands-on where I can see the immediate results of my work", 
        score: { analytical: 1, creative: 1, social: 1, structured: 4 } 
      },
    ],
    order: 3,
  },
  {
    question: "How do you approach learning something new?",
    options: [
      { 
        id: "a", 
        text: "Research and analyze all available information", 
        score: { analytical: 4, creative: 1, social: 0, structured: 3 } 
      },
      { 
        id: "b", 
        text: "Experiment with different approaches", 
        score: { analytical: 2, creative: 4, social: 1, structured: 1 } 
      },
      { 
        id: "c", 
        text: "Learn from others' experiences and discussions", 
        score: { analytical: 1, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "Follow established methods and step-by-step guides", 
        score: { analytical: 1, creative: 0, social: 1, structured: 4 } 
      },
    ],
    order: 4,
  },
  {
    question: "What type of activities energize you?",
    options: [
      { 
        id: "a", 
        text: "Solving complex puzzles or problems", 
        score: { analytical: 4, creative: 1, social: 0, structured: 2 } 
      },
      { 
        id: "b", 
        text: "Creating art or brainstorming new ideas", 
        score: { analytical: 1, creative: 4, social: 1, structured: 0 } 
      },
      { 
        id: "c", 
        text: "Engaging in group discussions or social events", 
        score: { analytical: 0, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "Organizing and completing tasks systematically", 
        score: { analytical: 1, creative: 0, social: 1, structured: 4 } 
      },
    ],
    order: 5,
  },
  {
    question: "How do you prefer to make decisions?",
    options: [
      { 
        id: "a", 
        text: "Analyze all facts and data available", 
        score: { analytical: 4, creative: 0, social: 0, structured: 2 } 
      },
      { 
        id: "b", 
        text: "Consider new and unconventional approaches", 
        score: { analytical: 1, creative: 4, social: 1, structured: 0 } 
      },
      { 
        id: "c", 
        text: "Discuss with others and consider their feelings", 
        score: { analytical: 0, creative: 1, social: 4, structured: 1 } 
      },
      { 
        id: "d", 
        text: "Rely on established processes and prior experiences", 
        score: { analytical: 1, creative: 0, social: 1, structured: 4 } 
      },
    ],
    order: 6,
  },
];

// Print out the JSON to copy into MongoDB
console.log(JSON.stringify(sampleQuestions)); 