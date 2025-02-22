const careerPaths = {
  technical: {
    indicators: [
      "Breaking down complex problems into smaller parts",
      "Analyzing data and patterns",
      "Working with numbers and calculations",
      "Solving technical problems",
      "Understanding how things work",
      "Working with computers and technology"
    ],
    careers: [
      {
        name: "Engineering",
        subjects: ["Physics", "Chemistry", "Mathematics"],
        exams: ["JEE Main", "JEE Advanced"],
        colleges: [
          {
            name: "IIT Bombay",
            location: "Mumbai",
            ranking: 1,
            website: "https://www.iitb.ac.in"
          },
          {
            name: "IIT Delhi",
            location: "New Delhi",
            ranking: 2,
            website: "https://www.iitd.ac.in"
          },
          {
            name: "BITS Pilani",
            location: "Pilani",
            ranking: 3,
            website: "https://www.bits-pilani.ac.in"
          }
        ]
      },
      {
        name: "Computer Science",
        subjects: ["Computer Science", "Mathematics", "Physics"],
        exams: ["JEE Main", "BITSAT"],
        colleges: [
          {
            name: "IIT Madras",
            location: "Chennai",
            ranking: 1,
            website: "https://www.iitm.ac.in"
          },
          {
            name: "IIIT Hyderabad",
            location: "Hyderabad",
            ranking: 2,
            website: "https://www.iiit.ac.in"
          },
          {
            name: "NIT Surathkal",
            location: "Mangalore",
            ranking: 3,
            website: "https://www.nitk.ac.in"
          }
        ]
      }
    ]
  },
  medical: {
    indicators: [
      "Following step-by-step procedures",
      "Helping and caring for others",
      "Learning from practical experiments",
      "Caring for people's health and wellbeing"
    ],
    careers: [
      {
        name: "Medicine",
        subjects: ["Biology", "Chemistry", "Physics"],
        exams: ["NEET", "AIIMS"],
        colleges: [
          {
            name: "AIIMS Delhi",
            location: "New Delhi",
            ranking: 1,
            website: "https://www.aiims.edu"
          },
          {
            name: "CMC Vellore",
            location: "Vellore",
            ranking: 2,
            website: "https://www.cmch-vellore.edu"
          },
          {
            name: "AFMC Pune",
            location: "Pune",
            ranking: 3,
            website: "https://www.afmc.nic.in"
          }
        ]
      }
    ]
  },
  creative: {
    indicators: [
      "Finding creative and innovative solutions",
      "Creating or designing something new",
      "Exploring artistic and creative pursuits",
      "Through creative projects"
    ],
    careers: [
      {
        name: "Design",
        subjects: ["Fine Arts", "Psychology", "English"],
        exams: ["UCEED", "NID DAT"],
        colleges: [
          {
            name: "NID Ahmedabad",
            location: "Ahmedabad",
            ranking: 1,
            website: "https://www.nid.edu"
          },
          {
            name: "IIT Bombay - IDC",
            location: "Mumbai",
            ranking: 2,
            website: "http://www.idc.iitb.ac.in"
          },
          {
            name: "NIFT Delhi",
            location: "New Delhi",
            ranking: 3,
            website: "https://www.nift.ac.in"
          }
        ]
      }
    ]
  }
};

export function calculateCareerPaths(quizResponses) {
  const scores = {};
  
  // Calculate score for each career path
  Object.keys(careerPaths).forEach(path => {
    scores[path] = 0;
    const pathIndicators = careerPaths[path].indicators;
    
    // Check each quiz response against path indicators
    Object.values(quizResponses).forEach(responses => {
      responses.forEach(response => {
        if (pathIndicators.includes(response)) {
          scores[path] += 1;
        }
      });
    });
  });

  // Convert scores to recommendations
  const recommendations = [];
  Object.entries(scores)
    .sort(([,a], [,b]) => b - a) // Sort by highest score
    .slice(0, 3) // Take top 3 recommendations
    .forEach(([path, score]) => {
      careerPaths[path].careers.forEach(career => {
        recommendations.push({
          career: career.name,
          score: (score / Object.keys(quizResponses).length) * 100, // Convert to percentage
          subjects: career.subjects,
          exams: career.exams,
          colleges: career.colleges // Add colleges to recommendations
        });
      });
    });

  return recommendations;
} 