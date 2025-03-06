"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { testAPI } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Comprehensive test questions
const questions = [
  {
    id: 1,
    question: "How do you approach problem-solving?",
    options: [
      { id: "a", text: "Break it down logically and analyze all possibilities", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Experiment with creative solutions", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Follow instructions and rules precisely", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Work with others to find the best solution", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 2,
    question: "What excites you the most about learning something new?",
    options: [
      { id: "a", text: "Discovering how things work", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Expressing new ideas creatively", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Understanding people and emotions", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
      { id: "d", text: "Applying knowledge in real-life situations", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
    ],
  },
  {
    id: 3,
    question: "How do you handle a stressful situation?",
    options: [
      { id: "a", text: "Stay calm and logically assess the problem", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Use creativity to ease the tension", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Follow a systematic approach to manage it", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Seek support and communicate with others", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 4,
    question: "What type of work environment do you prefer?",
    options: [
      { id: "a", text: "A research lab or technical workspace", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "A dynamic and artistic setting", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "A structured and organized office", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "A team-oriented and social workplace", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 5,
    question: "If given a group project, what role would you take?",
    options: [
      { id: "a", text: "The researcher who ensures accuracy", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "The designer who makes it visually appealing", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "The planner who organizes everything", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "The leader who ensures teamwork", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 6,
    question: "What do you enjoy doing in your free time?",
    options: [
      { id: "a", text: "Solving puzzles, coding, or experimenting", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Drawing, writing, or creating content", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Reading books or analyzing case studies", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Engaging in social activities and debates", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 7,
    question: "What motivates you the most?",
    options: [
      { id: "a", text: "Finding solutions to challenging problems", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Expressing emotions through art and media", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Understanding human behavior and structure", score: { analytical: 2, creative: 1, structured: 2, social: 3 } },
      { id: "d", text: "Influencing and leading others", score: { analytical: 1, creative: 2, structured: 3, social: 4 } },
    ],
  },
  {
    id: 8,
    question: "How do you prefer to learn?",
    options: [
      { id: "a", text: "Through experiments and practical applications", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Through visual and creative representations", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Through detailed reading and structured material", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Through discussions and real-world interactions", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 9,
    question: "If you were to start a business, what would it be?",
    options: [
      { id: "a", text: "A tech startup", score: { analytical: 4, creative: 2, structured: 2, social: 1 } },
      { id: "b", text: "A creative studio", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "A consulting firm", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "A social enterprise", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 10,
    question: "How do you handle failure?",
    options: [
      { id: "a", text: "Analyze and try a new logical approach", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Use failure as a source of creative inspiration", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Learn from mistakes and improve systematically", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Seek guidance and adapt based on feedback", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 11,
    question: "What is your ideal career goal?",
    options: [
      { id: "a", text: "Solving technical and analytical problems", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Expressing creativity and emotions", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Structuring and analyzing business models", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Helping people and making an impact", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 12,
    question: "What type of decision-maker are you?",
    options: [
      { id: "a", text: "Data-driven and logical", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Intuitive and imaginative", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Structured and rule-based", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Empathetic and people-oriented", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 13,
    question: "If you had to give a presentation, what would you focus on?",
    options: [
      { id: "a", text: "Facts, logic, and deep research", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Creative visuals and storytelling", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "A well-organized and structured approach", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Engaging with the audience and emotions", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
  {
    id: 14,
    question: "What excites you the most in a task?",
    options: [
      { id: "a", text: "Finding new ways to solve it", score: { analytical: 4, creative: 2, structured: 1, social: 1 } },
      { id: "b", text: "Adding creativity and uniqueness", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Ensuring it follows correct procedures", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Working with others to complete it", score: { analytical: 1, creative: 1, structured: 2, social: 4 } },
    ],
  },
  {
    id: 15,
    question: "What do you value the most in a job?",
    options: [
      { id: "a", text: "Intellectual challenge and problem-solving", score: { analytical: 4, creative: 1, structured: 2, social: 1 } },
      { id: "b", text: "Freedom to express creativity", score: { analytical: 1, creative: 4, structured: 1, social: 2 } },
      { id: "c", text: "Stability and structured growth", score: { analytical: 2, creative: 1, structured: 4, social: 1 } },
      { id: "d", text: "Social impact and working with people", score: { analytical: 1, creative: 2, structured: 1, social: 4 } },
    ],
  },
];

// Career paths based on score ranges
const careerPaths = [
  {
    range: [50, 60],
    name: "Engineering & Technology",
    description: "Your analytical and problem-solving skills make you perfect for fields requiring technical precision and logical thinking.",
    careers: ["Software Developer", "Data Scientist", "AI Researcher", "Systems Engineer", "Robotics Engineer"],
  },
  {
    range: [40, 49],
    name: "Creative & Design",
    description: "Your creativity and imagination make you well-suited for careers involving expression and innovation.",
    careers: ["UX/UI Designer", "Graphic Designer", "Content Creator", "Media Producer", "Artist"],
  },
  {
    range: [30, 39],
    name: "Business & Management",
    description: "Your structured approach and organizational skills align well with fields requiring systematic thinking and analysis.",
    careers: ["Business Analyst", "Financial Advisor", "Project Manager", "Legal Consultant", "Marketing Strategist"],
  },
  {
    range: [15, 29],
    name: "Social & Psychology",
    description: "Your people skills and empathy make you ideal for careers focused on human connection and support.",
    careers: ["Psychologist", "Human Resources Specialist", "Social Worker", "Teacher", "Healthcare Professional"],
  },
];

export default function CareerTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [responses, setResponses] = useState<Array<{ questionId: number; answerId: string; question: string; answer: string }>>([]);
  const [scores, setScores] = useState({
    analytical: 0,
    creative: 0,
    structured: 0,
    social: 0,
  });
  const [testCompleted, setTestCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultCategory, setResultCategory] = useState<typeof careerPaths[0] | null>(null);
  const { isAuthenticated } = useAuth();
  const [progress, setProgress] = useState(0);

  // Update progress when current question changes
  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      // Get the selected option and question text
      const currentQ = questions[currentQuestion];
      const selectedOpt = currentQ.options.find((opt) => opt.id === selectedOption);
      
      if (selectedOpt) {
        // Add to responses
        const response = {
          questionId: currentQ.id,
          answerId: selectedOption,
          question: currentQ.question,
          answer: selectedOpt.text,
        };
        
        // Update responses array
        setResponses([...responses, response]);
        
        // Update scores
        setScores({
          analytical: scores.analytical + (selectedOpt.score.analytical || 0),
          creative: scores.creative + (selectedOpt.score.creative || 0),
          structured: scores.structured + (selectedOpt.score.structured || 0),
          social: scores.social + (selectedOpt.score.social || 0),
        });
      }

      // Move to next question or complete test
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        completeTest();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Remove the last response
      const newResponses = [...responses];
      const removedResponse = newResponses.pop();
      
      // Update scores by subtracting the scores of the removed response
      if (removedResponse) {
        const removedQ = questions.find(q => q.id === removedResponse.questionId);
        const removedOpt = removedQ?.options.find(opt => opt.id === removedResponse.answerId);
        
        if (removedOpt) {
          setScores({
            analytical: scores.analytical - (removedOpt.score.analytical || 0),
            creative: scores.creative - (removedOpt.score.creative || 0),
            structured: scores.structured - (removedOpt.score.structured || 0),
            social: scores.social - (removedOpt.score.social || 0),
          });
        }
      }
      
      setResponses(newResponses);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const completeTest = async () => {
    // Calculate total score
    const totalScore = scores.analytical + scores.creative + scores.structured + scores.social;
    
    // Determine career category based on score
    const result = careerPaths.find(
      (path) => totalScore >= path.range[0] && totalScore <= path.range[1]
    );
    
    setResultCategory(result || null);
    setTestCompleted(true);
    
    // If user is authenticated, submit test to backend
    if (isAuthenticated) {
      submitTestToBackend();
    }
  };

  const submitTestToBackend = async () => {
    try {
      setIsSubmitting(true);
      await testAPI.submitTest(responses);
      toast.success("Test results saved successfully!");
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("Failed to save test results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{question.question}</CardTitle>
          <CardDescription className="text-center">
            Question {currentQuestion + 1} of {questions.length}
          </CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedOption === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className="font-medium">{option.text}</span>
            </button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentQuestion > 0 ? (
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
            >
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestion === questions.length - 1 ? "Complete Test" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderResults = () => {
    if (!resultCategory) return null;
    
    // Calculate percentages for each category
    const totalPoints = scores.analytical + scores.creative + scores.structured + scores.social;
    const analyticalPercent = Math.round((scores.analytical / totalPoints) * 100);
    const creativePercent = Math.round((scores.creative / totalPoints) * 100);
    const structuredPercent = Math.round((scores.structured / totalPoints) * 100);
    const socialPercent = Math.round((scores.social / totalPoints) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">Your Career Test Results</CardTitle>
            <CardDescription className="text-center text-lg">
              Based on your responses, we recommend careers in:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">{resultCategory.name}</h3>
              <p className="mt-2 text-muted-foreground">{resultCategory.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Your Profile Breakdown</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Analytical Thinking</span>
                      <span>{analyticalPercent}%</span>
                    </div>
                    <Progress value={analyticalPercent} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Creative Thinking</span>
                      <span>{creativePercent}%</span>
                    </div>
                    <Progress value={creativePercent} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Structured Thinking</span>
                      <span>{structuredPercent}%</span>
                    </div>
                    <Progress value={structuredPercent} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Social Skills</span>
                      <span>{socialPercent}%</span>
                    </div>
                    <Progress value={socialPercent} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-4">Recommended Careers</h4>
                <ul className="space-y-2">
                  {resultCategory.careers.map((career, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <div className="text-center mb-4 w-full p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Create an account to save your results and get detailed career information
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <Button asChild>
                <Link href="/dashboard">View in Dashboard</Link>
              </Button>
            )}
            <Button variant="outline" onClick={() => {
              setTestCompleted(false);
              setCurrentQuestion(0);
              setSelectedOption(null);
              setResponses([]);
              setScores({
                analytical: 0,
                creative: 0,
                structured: 0,
                social: 0,
              });
            }}>
              Take Test Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!testCompleted ? renderQuestion() : renderResults()}
      </div>
    </div>
  );
} 