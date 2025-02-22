export function generateAIAnalysis(quizResponses) {
  // Personality traits analysis
  const traits = analyzePersonalityTraits(quizResponses);
  
  // Learning style analysis
  const learningStyle = analyzeLearningStyle(quizResponses);
  
  // Strength areas
  const strengths = analyzeStrengths(quizResponses);
  
  // Career compatibility
  const compatibility = analyzeCareerCompatibility(quizResponses);

  return {
    personalityTraits: traits,
    learningStyle,
    strengths,
    careerCompatibility: compatibility,
    recommendations: generateRecommendations(traits, learningStyle, strengths)
  };
}

function analyzePersonalityTraits(responses) {
  const traits = {
    analytical: 0,
    creative: 0,
    practical: 0,
    social: 0
  };

  // Analyze all response categories
  Object.values(responses).forEach(categoryResponses => {
    categoryResponses.forEach(response => {
      // Analytical traits
      if (response.includes("Breaking down") || 
          response.includes("Analyzing") || 
          response.includes("numbers") ||
          response.includes("research")) {
        traits.analytical += 1;
      }
      // Creative traits
      if (response.includes("creative") || 
          response.includes("innovative") ||
          response.includes("design") ||
          response.includes("artistic")) {
        traits.creative += 1;
      }
      // Practical traits
      if (response.includes("step-by-step") || 
          response.includes("practical") ||
          response.includes("hands-on") ||
          response.includes("fixing")) {
        traits.practical += 1;
      }
      // Social traits
      if (response.includes("collaborating") || 
          response.includes("discussing") ||
          response.includes("helping") ||
          response.includes("teaching")) {
        traits.social += 1;
      }
    });
  });

  // Calculate percentages
  const totalResponses = Object.values(responses)
    .reduce((sum, category) => sum + category.length, 0);

  return Object.entries(traits)
    .reduce((acc, [trait, score]) => {
      acc[trait] = (score / totalResponses) * 100;
      return acc;
    }, {});
}

function analyzeLearningStyle(responses) {
  const styles = {
    visual: [
      "visual aids",
      "demonstrations",
      "diagrams",
      "watching",
      "observing"
    ],
    auditory: [
      "discussing",
      "expressing ideas",
      "speaking",
      "listening",
      "explaining"
    ],
    kinesthetic: [
      "practical experiments",
      "hands-on",
      "building",
      "creating",
      "physical"
    ],
    reading: [
      "reading",
      "researching",
      "writing",
      "analyzing",
      "studying"
    ]
  };

  const scores = Object.entries(styles)
    .map(([style, keywords]) => {
      const score = Object.values(responses)
        .flat()
        .filter(response => 
          keywords.some(keyword => 
            response.toLowerCase().includes(keyword)
          )
        ).length;
      return { style, score };
    })
    .sort((a, b) => b.score - a.score);

  // Return primary and secondary learning styles
  return {
    primary: scores[0].style,
    secondary: scores[1].style,
    description: generateLearningStyleDescription(scores[0].style)
  };
}

function generateLearningStyleDescription(style) {
  const descriptions = {
    visual: "You learn best through visual aids, diagrams, and demonstrations. Visual representation of information helps you understand and retain concepts better.",
    auditory: "You learn effectively through listening and discussion. Verbal explanations and group discussions are your strongest learning methods.",
    kinesthetic: "You are a hands-on learner who benefits from practical experience and physical engagement with the subject matter.",
    reading: "You excel at learning through reading and writing. Text-based information and note-taking are your preferred learning methods."
  };
  return descriptions[style];
}

function analyzeStrengths(responses) {
  const strengthAreas = {
    "Problem Solving": responses.problemSolving.length,
    "Technical Skills": responses.workPreference.filter(r => 
      r.includes("technical") || r.includes("computer")
    ).length,
    "Creative Thinking": responses.interests.filter(r => 
      r.includes("creative") || r.includes("design")
    ).length,
    "Communication": responses.workPreference.filter(r => 
      r.includes("expressing") || r.includes("teaching")
    ).length
  };

  return Object.entries(strengthAreas)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([strength]) => strength);
}

function analyzeCareerCompatibility(responses) {
  const careerFields = {
    "Technology": ["computers", "technical", "programming"],
    "Healthcare": ["caring", "health", "helping"],
    "Design": ["creative", "design", "artistic"],
    "Research": ["analyzing", "research", "investigating"]
  };

  return Object.entries(careerFields)
    .map(([field, keywords]) => {
      const score = Object.values(responses)
        .flat()
        .filter(response => 
          keywords.some(keyword => 
            response.toLowerCase().includes(keyword)
          )
        ).length;
      return { field, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ field }) => field);
}

function generateRecommendations(traits, learningStyle, strengths) {
  return {
    studyTips: generateStudyTips(learningStyle),
    skillDevelopment: generateSkillDevelopmentPlan(strengths),
    nextSteps: generateNextSteps(traits)
  };
}

function generateStudyTips(learningStyle) {
  const tips = {
    visual: [
      "Use mind maps and diagrams",
      "Watch educational videos",
      "Create visual summaries"
    ],
    auditory: [
      "Record and listen to lectures",
      "Participate in group discussions",
      "Explain concepts to others"
    ],
    kinesthetic: [
      "Use hands-on experiments",
      "Take frequent study breaks",
      "Create physical models"
    ],
    reading: [
      "Take detailed notes",
      "Use flashcards",
      "Create summary sheets"
    ]
  };

  return tips[learningStyle];
}

function generateSkillDevelopmentPlan(strengths) {
  const plans = {
    "Problem Solving": [
      "Practice competitive programming",
      "Join mathematics clubs",
      "Work on puzzle-solving"
    ],
    "Technical Skills": [
      "Learn basic programming",
      "Take online tech courses",
      "Work on DIY projects"
    ],
    "Creative Thinking": [
      "Start an art project",
      "Join design workshops",
      "Practice brainstorming"
    ],
    "Communication": [
      "Join debate club",
      "Practice public speaking",
      "Write blog posts"
    ]
  };

  return strengths.map(strength => ({
    area: strength,
    activities: plans[strength]
  }));
}

function generateNextSteps(traits) {
  const steps = [];
  
  if (traits.analytical > 50) {
    steps.push("Research specific college requirements");
    steps.push("Create a structured study plan");
  }
  
  if (traits.creative > 50) {
    steps.push("Build a portfolio of projects");
    steps.push("Explore internship opportunities");
  }
  
  if (traits.practical > 50) {
    steps.push("Gain hands-on experience through workshops");
    steps.push("Connect with professionals in your field");
  }
  
  if (traits.social > 50) {
    steps.push("Join relevant student organizations");
    steps.push("Attend career networking events");
  }

  return steps.slice(0, 3);
}

function generateCareerSpecificTips(careerPath) {
  const tips = {
    technical: [
      "Focus on building strong mathematical foundations",
      "Start learning a programming language",
      "Participate in science and technology fairs",
      "Join robotics or coding clubs"
    ],
    medical: [
      "Strengthen your biology and chemistry knowledge",
      "Volunteer at healthcare facilities",
      "Join health science clubs",
      "Prepare for medical entrance exams early"
    ],
    creative: [
      "Build a diverse portfolio of creative work",
      "Learn industry-standard design software",
      "Participate in art exhibitions or design competitions",
      "Take specialized creative workshops"
    ]
  };

  return tips[careerPath] || [];
} 