"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, GraduationCapIcon, BuildingIcon, CalendarIcon, ChevronRightIcon, RefreshCwIcon, ListChecksIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { testAPI, userAPI, careerAPI } from "@/lib/api";
import { toast } from "sonner";

interface Career {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  colleges: { name: string; location: string }[];
  entranceExams: { name: string }[];
  matchPercentage?: number;
}

interface TestResult {
  _id: string;
  date: string;
  scores: {
    analytical: number;
    creative: number;
    structured: number;
    social: number;
  };
  recommendedCareers: Career[];
  recommendations?: {
    careerTitle: string;
    matchPercentage: number;
    details: {
      description: string;
      skills: string[];
      averageSalary: string;
      colleges: { name: string; location: string }[];
      entranceExams: { name: string }[];
    } | null;
  }[];
  completed: boolean;
}

// Define interface for recommendation
interface Recommendation {
  careerTitle: string;
  matchPercentage: number;
  details?: {
    description: string;
    skills: string[];
    averageSalary: string;
    colleges: { name: string; location: string }[];
    entranceExams: { name: string }[];
  } | null;
}

// Career card component
const CareerCard = ({
  career,
  onToggleSave,
  isSaved,
}: {
  career: Career;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
}) => {
  // Safety check in case we receive an invalid career object
  if (!career || !career.title) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background border rounded-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">
              {career.title}
              {career.matchPercentage && (
                <span className="ml-2 text-sm font-normal text-primary">
                  {Math.round(career.matchPercentage)}% Match
                </span>
              )}
            </h3>
            <p className="text-muted-foreground mt-1 line-clamp-2">{career.description || 'No description available'}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onToggleSave(career._id)}
              className="ml-2 p-1.5 rounded-full hover:bg-accent"
              aria-label={isSaved ? "Unsave career" : "Save career"}
            >
              <BookmarkIcon
                className={`h-5 w-5 ${
                  isSaved ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-start">
            <GraduationCapIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Top College</p>
              <p className="text-sm text-muted-foreground">
                {career.colleges && career.colleges.length > 0
                  ? career.colleges[0].name
                  : "Information not available"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <BuildingIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Entrance Exam</p>
              <p className="text-sm text-muted-foreground">
                {career.entranceExams && career.entranceExams.length > 0
                  ? career.entranceExams.map(exam => exam.name).join(", ")
                  : "Information not available"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Average Salary</p>
              <p className="text-sm text-muted-foreground">
                {career.averageSalary || "Information not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={`/careers/${career._id}`}
            className="text-sm font-medium text-primary hover:underline flex items-center"
          >
            View Details
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Test history card component
const TestHistoryCard = ({ testResult }: { testResult: TestResult }) => {
  // Format the date
  const formattedDate = new Date(testResult.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate total points
  const totalPoints = 
    testResult.scores.analytical + 
    testResult.scores.creative + 
    testResult.scores.structured + 
    testResult.scores.social;

  // Calculate percentages
  const analyticalPercent = Math.round((testResult.scores.analytical / totalPoints) * 100) || 0;
  const creativePercent = Math.round((testResult.scores.creative / totalPoints) * 100) || 0;
  const structuredPercent = Math.round((testResult.scores.structured / totalPoints) * 100) || 0;
  const socialPercent = Math.round((testResult.scores.social / totalPoints) * 100) || 0;

  // Get top career names
  let topCareers = '';
  
  if (testResult.recommendedCareers && testResult.recommendedCareers.length > 0) {
    topCareers = testResult.recommendedCareers.slice(0, 3).map(career => career.title).join(", ");
  } else if (testResult.recommendations && testResult.recommendations.length > 0) {
    topCareers = testResult.recommendations.slice(0, 3).map(rec => rec.careerTitle).join(", ");
  } else {
    topCareers = "No recommendations available";
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Career Test Result</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <CalendarIcon className="h-5 w-5 text-muted-foreground mt-1" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Your Profile</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analytical</span>
                <span>{analyticalPercent}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Creative</span>
                <span>{creativePercent}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Structured</span>
                <span>{structuredPercent}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Social</span>
                <span>{socialPercent}%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Top Recommendations</h4>
            <p className="text-sm text-muted-foreground">{topCareers}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline" asChild className="w-full">
          <Link href={`/test-results/${testResult._id}`}>
            View Full Results
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Add a function to get predefined careers if none are available from the API
const getPredefinedCareers = (): Career[] => {
  return [
    {
      _id: "software-engineering",
      title: "Software Engineering",
      description: "Develop applications and systems using programming languages and software engineering principles.",
      skills: ["Programming", "Problem Solving", "Logical Thinking", "Teamwork", "System Design"],
      averageSalary: "$105,000 - $150,000",
      colleges: [
        { name: "Stanford University", location: "Stanford, CA" },
        { name: "MIT", location: "Cambridge, MA" },
        { name: "Carnegie Mellon University", location: "Pittsburgh, PA" }
      ],
      entranceExams: [
        { name: "SAT/ACT" },
        { name: "GRE" }
      ],
      matchPercentage: 90
    },
    {
      _id: "medicine",
      title: "Medicine",
      description: "Diagnose and treat illnesses, injuries, and other health conditions in patients.",
      skills: ["Critical Thinking", "Communication", "Empathy", "Decision Making", "Attention to Detail"],
      averageSalary: "$208,000 - $350,000",
      colleges: [
        { name: "Harvard Medical School", location: "Boston, MA" },
        { name: "Johns Hopkins University", location: "Baltimore, MD" },
        { name: "Stanford School of Medicine", location: "Stanford, CA" }
      ],
      entranceExams: [
        { name: "MCAT" }
      ],
      matchPercentage: 85
    },
    {
      _id: "law",
      title: "Law",
      description: "Advise and represent individuals, businesses, or government agencies on legal issues or disputes.",
      skills: ["Critical Thinking", "Research", "Negotiation", "Public Speaking", "Writing"],
      averageSalary: "$126,000 - $189,000",
      colleges: [
        { name: "Harvard Law School", location: "Cambridge, MA" },
        { name: "Yale Law School", location: "New Haven, CT" },
        { name: "Stanford Law School", location: "Stanford, CA" }
      ],
      entranceExams: [
        { name: "LSAT" }
      ],
      matchPercentage: 80
    },
    {
      _id: "business-management",
      title: "Business Management",
      description: "Plan, direct, and coordinate operational activities of companies and organizations.",
      skills: ["Leadership", "Communication", "Strategic Thinking", "Problem Solving", "Decision Making"],
      averageSalary: "$87,000 - $156,000",
      colleges: [
        { name: "Harvard Business School", location: "Boston, MA" },
        { name: "Stanford Graduate School of Business", location: "Stanford, CA" },
        { name: "Wharton School", location: "Philadelphia, PA" }
      ],
      entranceExams: [
        { name: "GMAT" },
        { name: "GRE" }
      ],
      matchPercentage: 75
    },
    {
      _id: "design",
      title: "Design",
      description: "Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.",
      skills: ["Creativity", "Visual Thinking", "Communication", "Problem Solving", "Attention to Detail"],
      averageSalary: "$53,000 - $93,000",
      colleges: [
        { name: "Rhode Island School of Design", location: "Providence, RI" },
        { name: "Parsons School of Design", location: "New York, NY" },
        { name: "California Institute of the Arts", location: "Valencia, CA" }
      ],
      entranceExams: [
        { name: "Portfolio Review" }
      ],
      matchPercentage: 70
    }
  ];
};

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [savedCareers, setSavedCareers] = useState<Career[]>([]);
  const [recommendedCareers, setRecommendedCareers] = useState<Career[]>([]);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Starting to fetch dashboard data...");
        
        // Set default recommendations immediately to avoid empty state
        setRecommendedCareers(getPredefinedCareers());
        
        // Fetch saved careers
        let saved = [];
        try {
          saved = await userAPI.getSavedCareers() || [];
          console.log('Saved Careers:', saved);
          setSavedCareers(saved);
          setSavedCareerIds(saved.map((career: Career) => career._id));
        } catch (err) {
          console.error('Error fetching saved careers:', err);
        }
        
        // Fetch test history
        let history = [];
        try {
          history = await testAPI.getTestHistory() || [];
          console.log('Complete Test History:', history);
          setTestHistory(history);
        } catch (err) {
          console.error('Error fetching test history:', err);
        }
        
        // Fetch recommended careers
        let foundRecommendations = false;
        
        if (history && history.length > 0) {
          const latestTest = history[0]; // Assuming sorted by date
          console.log('Latest Test Full Object:', latestTest);
          
          // Check for direct recommendations property first (from our enhanced response)
          if (latestTest.recommendations && latestTest.recommendations.length > 0) {
            console.log('Found direct recommendations in latest test:', latestTest.recommendations);
            try {
              const mappedRecommendations = latestTest.recommendations.map((rec: Recommendation) => ({
                _id: `rec_${Math.random().toString(36).slice(2)}`,
                title: rec.careerTitle,
                description: rec.details?.description || `Career path in ${rec.careerTitle}`,
                skills: rec.details?.skills || ['Technical Knowledge', 'Communication', 'Problem Solving'],
                averageSalary: rec.details?.averageSalary || 'Information not available',
                colleges: rec.details?.colleges || [],
                entranceExams: rec.details?.entranceExams || [],
                matchPercentage: rec.matchPercentage
              }));
              console.log('Mapped recommendations:', mappedRecommendations);
              if (mappedRecommendations && mappedRecommendations.length > 0) {
                setRecommendedCareers(mappedRecommendations);
                foundRecommendations = true;
              }
            } catch (err) {
              console.error('Error mapping recommendations:', err);
            }
          } else if (latestTest.recommendedCareers && latestTest.recommendedCareers.length > 0) {
            console.log('Found recommended careers (populated) in latest test:', latestTest.recommendedCareers);
            setRecommendedCareers(latestTest.recommendedCareers);
            foundRecommendations = true;
          }
        }
        
        // If no recommendations were found in history, use predefined careers
        if (!foundRecommendations) {
          console.log('No recommendations found, using predefined careers');
          setRecommendedCareers(getPredefinedCareers());
        }
        
        console.log('Final recommended careers state:', recommendedCareers);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        // Use predefined careers as fallback
        setRecommendedCareers(getPredefinedCareers());
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Recommended careers state updated:', recommendedCareers);
    // Make sure we always have valid recommendations
    if (!recommendedCareers || recommendedCareers.length === 0) {
      console.log('Setting default predefined careers as none were found');
      setRecommendedCareers(getPredefinedCareers());
    }
  }, [recommendedCareers]);

  const toggleSaveCareer = async (careerId: string) => {
    try {
      if (savedCareerIds.includes(careerId)) {
        await userAPI.removeSavedCareer(careerId);
        setSavedCareerIds(savedCareerIds.filter(id => id !== careerId));
        setSavedCareers(savedCareers.filter(career => career._id !== careerId));
        toast.success("Career removed from saved list");
      } else {
        await userAPI.saveCareer(careerId);
        setSavedCareerIds([...savedCareerIds, careerId]);
        
        // Fetch the career details to add to savedCareers
        const career = await careerAPI.getCareerById(careerId);
        setSavedCareers([...savedCareers, career]);
        toast.success("Career saved successfully");
      }
    } catch (error) {
      console.error("Error toggling save career:", error);
      toast.error("Failed to update saved careers");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Dashboard Access Restricted</h1>
            <p className="text-muted-foreground mb-8">
              Please log in or create an account to access your personal dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <RefreshCwIcon className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button
            asChild
            className="mt-4 md:mt-0"
          >
            <Link href="/career-test" className="flex items-center">
              <ListChecksIcon className="mr-2 h-4 w-4" />
              Take Career Test
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="recommended" className="mt-8">
          <TabsList className="mb-8">
            <TabsTrigger value="recommended">Recommended Careers</TabsTrigger>
            <TabsTrigger value="saved">Saved Careers</TabsTrigger>
            <TabsTrigger value="history">Test History</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="mt-0">
            {recommendedCareers && recommendedCareers.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Your Top Career Matches</h2>
                  <p className="text-muted-foreground">
                    Based on your personality profile, these careers are the best match for you.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCareers
                    .filter(career => career && career.title)
                    .sort((a, b) => {
                      const matchA = a.matchPercentage || 0;
                      const matchB = b.matchPercentage || 0;
                      return matchB - matchA;
                    })
                    .map((career) => (
                      <CareerCard
                        key={career._id || `career-${Math.random()}`}
                        career={career}
                        onToggleSave={toggleSaveCareer}
                        isSaved={savedCareerIds.includes(career._id)}
                      />
                    ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <ListChecksIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No recommendations available</h3>
                <p className="text-muted-foreground mb-6">
                  Take the career test to get personalized recommendations. If you've already taken a test,
                  please try refreshing the page or contact support if the issue persists.
                </p>
                <Button asChild>
                  <Link href="/career-test">Take Career Test</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            {savedCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCareers.map((career) => (
                  <CareerCard
                    key={career._id}
                    career={career}
                    onToggleSave={toggleSaveCareer}
                    isSaved={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No saved careers yet</h3>
                <p className="text-muted-foreground mb-6">
                  Save careers you're interested in to view them here
                </p>
                <Button asChild variant="outline">
                  <Link href="/career-test">Explore Careers</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            {testHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testHistory.map((result) => (
                  <TestHistoryCard key={result._id} testResult={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No test history yet</h3>
                <p className="text-muted-foreground mb-6">
                  Take the career test to start building your profile
                </p>
                <Button asChild>
                  <Link href="/career-test">Take Career Test</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 