"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { testAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CalendarIcon, CheckCircle, ChevronRightIcon } from "lucide-react";
import { toast } from "sonner";

interface Career {
  _id: string;
  title: string;
  description: string;
}

interface QuestionResponse {
  questionId: string;
  question: string;
  answerId: string;
  answer: string;
}

interface TestResult {
  _id: string;
  user: string;
  responses: QuestionResponse[];
  scores: {
    analytical: number;
    creative: number;
    structured: number;
    social: number;
    [key: string]: number;
  };
  recommendedCareers: Career[];
  date: string;
  completed: boolean;
}

export default function TestResultPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestResult = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      try {
        setIsLoading(true);
        const data = await testAPI.getTestResultById(id as string);
        setTestResult(data);
      } catch (err: any) {
        console.error("Error fetching test result:", err);
        setError(err.message || "Failed to load test result");
        toast.error("Failed to load test result");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTestResult();
    }
  }, [id, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-muted rounded mb-4"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !testResult) {
    return (
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error || "Test result not found"}</p>
            <Button asChild>
              <Link href="/dashboard">Go Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate percentages for score visualization with safety checks
  const totalScore = testResult.scores ? 
    Object.values(testResult.scores).reduce((a, b) => a + b, 0) : 0;
  
  // Default to 0 if scores are missing or totalScore is 0
  const analyticalPercent = totalScore > 0 && testResult.scores?.analytical ? 
    Math.round((testResult.scores.analytical / totalScore) * 100) : 0;
  
  const creativePercent = totalScore > 0 && testResult.scores?.creative ? 
    Math.round((testResult.scores.creative / totalScore) * 100) : 0;
  
  const structuredPercent = totalScore > 0 && testResult.scores?.structured ? 
    Math.round((testResult.scores.structured / totalScore) * 100) : 0;
  
  const socialPercent = totalScore > 0 && testResult.scores?.social ? 
    Math.round((testResult.scores.social / totalScore) * 100) : 0;

  // Format date
  const testDate = new Date(testResult.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Test Result Details</h1>
              <p className="text-muted-foreground mt-1 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {testDate}
              </p>
            </div>

            <Button asChild>
              <Link href="/career-test">Take Test Again</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
            <TabsTrigger value="profile">Your Profile</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="responses">Your Responses</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personality Profile</CardTitle>
                <CardDescription>
                  Based on your test responses, here's a breakdown of your personality traits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Analytical Thinking</h3>
                        <span>{analyticalPercent}%</span>
                      </div>
                      <Progress value={analyticalPercent} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Your ability to analyze complex problems and find logical solutions.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Creative Thinking</h3>
                        <span>{creativePercent}%</span>
                      </div>
                      <Progress value={creativePercent} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Your ability to think outside the box and generate innovative ideas.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Structured Thinking</h3>
                        <span>{structuredPercent}%</span>
                      </div>
                      <Progress value={structuredPercent} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Your ability to organize information and follow systematic procedures.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Social Skills</h3>
                        <span>{socialPercent}%</span>
                      </div>
                      <Progress value={socialPercent} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Your ability to connect with others and work collaboratively.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">What This Means</h3>
                  <p className="mb-4">
                    {!isNaN(analyticalPercent) && analyticalPercent >= 30 && (
                      <span>
                        You have strong analytical skills, indicating you'd excel in fields requiring 
                        logical thinking and problem-solving.{" "}
                      </span>
                    )}
                    {!isNaN(creativePercent) && creativePercent >= 30 && (
                      <span>
                        Your creative mindset allows you to think innovatively and develop unique solutions.{" "}
                      </span>
                    )}
                    {!isNaN(structuredPercent) && structuredPercent >= 30 && (
                      <span>
                        You exhibit strong organizational skills and ability to follow systematic procedures.{" "}
                      </span>
                    )}
                    {!isNaN(socialPercent) && socialPercent >= 30 && (
                      <span>
                        Your social skills make you well-suited for careers involving teamwork and communication.{" "}
                      </span>
                    )}
                    {/* Fallback text if no percentages are above 30% */}
                    {(!analyticalPercent || analyticalPercent < 30) && 
                     (!creativePercent || creativePercent < 30) && 
                     (!structuredPercent || structuredPercent < 30) && 
                     (!socialPercent || socialPercent < 30) && (
                      <span>
                        Your profile shows a balanced set of skills across different areas. Consider exploring various
                        career paths to find what best matches your interests and abilities.
                      </span>
                    )}
                  </p>
                  <p>
                    Based on your profile, we've recommended careers that align with your strengths and 
                    preferences. Explore the recommendations tab to learn more.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Recommendations</CardTitle>
                <CardDescription>
                  Careers that align with your personality profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testResult.recommendedCareers.length > 0 ? (
                    <div className="divide-y">
                      {testResult.recommendedCareers.map((career, index) => (
                        <div key={career._id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium flex items-center">
                              <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                                {index + 1}
                              </span>
                              {career.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground mb-3">{career.description}</p>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/careers/${career._id}`} className="flex items-center">
                              View Details <ChevronRightIcon className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No career recommendations available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Test Responses</CardTitle>
                <CardDescription>
                  A record of your answers to the career test questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 divide-y">
                  {testResult.responses.map((response, index) => (
                    <div key={index} className={index === 0 ? "" : "pt-6"}>
                      <div className="flex items-start">
                        <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">{response.question}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            {response.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 