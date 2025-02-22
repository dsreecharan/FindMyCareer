export const collegeDatabase = {
  engineering: {
    government: [
      {
        name: "IIT Madras",
        type: "government",
        location: "Chennai",
        nirfRank: 1,
        accreditation: "NAAC A++",
        courses: ["B.Tech", "B.E."],
        cutoff: 98.6,
        fees: "2.5L/year",
        website: "https://www.iitm.ac.in",
        features: [
          "Top NIRF Ranking",
          "Excellence in Research",
          "100% Placement"
        ]
      },
      {
        name: "IIT Delhi",
        type: "government",
        location: "New Delhi",
        nirfRank: 2,
        accreditation: "NAAC A++",
        fees: "2.5L/year",
        // ... similar structure
      }
    ],
    private: [
      {
        name: "VIT Vellore",
        type: "private",
        location: "Vellore",
        nirfRank: 12,
        accreditation: "NAAC A++",
        courses: ["B.Tech", "B.E."],
        cutoff: 92,
        fees: "4.5L/year",
        website: "https://vit.ac.in",
        features: [
          "Industry Partnerships",
          "Global Recognition",
          "Modern Infrastructure"
        ]
      },
      {
        name: "Manipal Institute of Technology",
        type: "private",
        location: "Manipal",
        nirfRank: 15,
        accreditation: "NAAC A+",
        fees: "5L/year",
        // ... similar structure
      }
    ]
  },
  medical: {
    government: [
      {
        name: "AIIMS Delhi",
        type: "government",
        location: "New Delhi",
        nirfRank: 1,
        accreditation: "NAAC A++",
        courses: ["MBBS", "BDS"],
        cutoff: 99.2,
        fees: "1.5L/year",
        website: "https://www.aiims.edu"
      }
    ],
    private: [
      {
        name: "Kasturba Medical College",
        type: "private",
        location: "Manipal",
        nirfRank: 8,
        accreditation: "NAAC A+",
        courses: ["MBBS", "BDS"],
        cutoff: 95,
        fees: "25L/year",
        website: "https://manipal.edu/kmc"
      }
    ]
  },
  // Add more streams
}; 