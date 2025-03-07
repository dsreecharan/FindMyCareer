"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { careerAPI, userAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkCheck, Building, GraduationCap, Calendar, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface College {
  name: string;
  location: string;
  ranking?: number;
}

interface EntranceExam {
  name: string;
  description?: string;
  website?: string;
}

interface EligibilityCriteria {
  minGrade?: string;
  subjects?: string[];
  requirements?: string[];
}

interface ApplicationProcess {
  steps: string[];
  deadlines?: string[];
  documents?: string[];
}

interface Career {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  personalityTraits: string[];
  educationRequirements: string[];
  jobOutlook: string;
  averageSalary: string;
  colleges: College[];
  entranceExams: EntranceExam[];
  eligibility: EligibilityCriteria;
  applicationProcess: ApplicationProcess;
  relatedCareers: any[];
  createdAt: string;
  updatedAt: string;
}

export default function CareerDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [career, setCareer] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCareerDetails = async () => {
      try {
        setIsLoading(true);
        const data = await careerAPI.getCareerById(id as string);
        setCareer(data);

        // Check if career is saved (if user is authenticated)
        if (isAuthenticated) {
          try {
            const savedCareers = await userAPI.getSavedCareers();
            const savedCareerIds = savedCareers.map((career: any) => career._id);
            setIsSaved(savedCareerIds.includes(id));
          } catch (saveErr) {
            console.error("Error checking saved status:", saveErr);
            // Don't set error state for this secondary error
          }
        }
      } catch (err: any) {
        console.error("Error fetching career details:", err);
        setError(err.message || 'Failed to load career details');
        
        // Add a fallback for predefined careers that might not be in the database
        const predefinedCareerIds = ['software-engineering', 'medicine', 'law', 'business-management', 'design'];
        
        if (predefinedCareerIds.includes(id as string)) {
          // Create a fallback career object
          const careerTitle = (id as string)
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
          const fallbackCareer = {
            _id: id as string,
            title: careerTitle,
            description: `Career path in ${careerTitle}`,
            skills: ['Technical Knowledge', 'Communication', 'Problem Solving'],
            personalityTraits: ['Analytical', 'Creative', 'Detail-oriented'],
            educationRequirements: ['Bachelor\'s degree in relevant field'],
            jobOutlook: 'Growing field with many opportunities',
            averageSalary: 'Varies by location and experience',
            colleges: [
              { name: 'Contact an advisor for specific college recommendations', location: '' }
            ],
            entranceExams: [
              { name: 'Varies by institution' }
            ],
            eligibility: {
              minGrade: 'Varies by institution',
              subjects: ['Contact an advisor for specific requirements'],
              requirements: ['Strong academic background']
            },
            applicationProcess: {
              steps: ['Research programs', 'Prepare application materials', 'Submit applications', 'Interview if required'],
              deadlines: ['Varies by institution'],
              documents: ['Transcripts', 'Letters of recommendation', 'Personal statement']
            },
            relatedCareers: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setCareer(fallbackCareer);
          setError(null); // Clear error if we can provide fallback data
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCareerDetails();
    }
  }, [id, isAuthenticated]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save careers");
      return;
    }

    try {
      setIsSaving(true);
      if (isSaved) {
        await userAPI.removeSavedCareer(id as string);
        toast.success("Career removed from saved list");
      } else {
        await userAPI.saveCareer(id as string);
        toast.success("Career saved successfully");
      }
      setIsSaved(!isSaved);
    } catch (err: any) {
      toast.error(err.message || "Error saving career");
    } finally {
      setIsSaving(false);
    }
  };

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

  if (error || !career) {
    return (
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error || "Career not found"}</p>
            <Button asChild>
              <Link href="/dashboard">Go Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{career.title}</h1>
              <p className="text-muted-foreground mt-1">{career.averageSalary} avg. salary</p>
            </div>
            <Button
              variant="outline"
              onClick={handleToggleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-5 w-5" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Save Career
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{career.description}</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Personality Traits</h3>
                    <div className="flex flex-wrap gap-2">
                      {career.personalityTraits.map((trait, index) => (
                        <span 
                          key={index} 
                          className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Job Outlook</h3>
                  <p>{career.jobOutlook}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education Requirements</CardTitle>
                <CardDescription>
                  Qualifications needed for a career in {career.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Required Education
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {career.educationRequirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Top Colleges & Universities
                  </h3>
                  <div className="space-y-4">
                    {career.colleges.map((college, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{college.name}</h4>
                          {college.ranking && (
                            <span className="text-sm text-muted-foreground">
                              Ranking: #{college.ranking}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">{college.location}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Entrance Exams</h3>
                  <div className="space-y-4">
                    {career.entranceExams.map((exam, index) => (
                      <div key={index} className="border p-4 rounded-lg">
                        <h4 className="font-medium">{exam.name}</h4>
                        {exam.description && (
                          <p className="text-sm mt-1">{exam.description}</p>
                        )}
                        {exam.website && (
                          <a 
                            href={exam.website.startsWith('http') ? exam.website : `https://${exam.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            Visit Website
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="application" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>
                  Steps to apply for programs in {career.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Eligibility Criteria
                  </h3>
                  
                  {career.eligibility.minGrade && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Minimum Grade</p>
                      <p>{career.eligibility.minGrade}</p>
                    </div>
                  )}
                  
                  {career.eligibility.subjects && career.eligibility.subjects.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Required Subjects</p>
                      <ul className="list-disc pl-6 space-y-1">
                        {career.eligibility.subjects.map((subject, index) => (
                          <li key={index}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {career.eligibility.requirements && career.eligibility.requirements.length > 0 && (
                    <div>
                      <p className="text-sm font-medium">Other Requirements</p>
                      <ul className="list-disc pl-6 space-y-1">
                        {career.eligibility.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Application Steps
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    {career.applicationProcess.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {career.applicationProcess.documents && career.applicationProcess.documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Required Documents</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {career.applicationProcess.documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {career.applicationProcess.deadlines && career.applicationProcess.deadlines.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Important Deadlines</h3>
                    <ul className="space-y-2">
                      {career.applicationProcess.deadlines.map((deadline, index) => (
                        <li key={index} className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {deadline}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Careers</CardTitle>
                <CardDescription>
                  Similar career paths you might be interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                {career.relatedCareers && career.relatedCareers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {career.relatedCareers.map((relatedCareer: any) => (
                      <Link 
                        key={relatedCareer._id} 
                        href={`/careers/${relatedCareer._id}`}
                        className="block"
                      >
                        <div className="border p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <h3 className="font-medium text-primary">{relatedCareer.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {relatedCareer.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No related careers found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 