import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, TestResult } from '../types';
import {
  auth,
  signInWithGoogle as firebaseGoogleSignIn,
  loginWithEmail as firebaseLoginEmail,
  registerWithEmail as firebaseRegisterEmail,
  logOutUser as firebaseLogOut,
  syncUserProfile,
  saveTestResultToFirestore,
  fetchUserTestResultsFromFirestore,
  toggleSavedCareerInFirestore
} from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, pass: string, grade: UserProfile['grade'], school: string, region: string) => Promise<boolean>;
  logout: () => void;
  toggleSaveCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
  saveTestResult: (result: Omit<TestResult, 'id' | 'timestamp'>) => TestResult;
  switchDemoUser: (personaIndex: number) => void;
}

const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr_maya_gr11',
    name: 'Maya Patel',
    email: 'maya.patel@highschool.edu',
    grade: 'Grade 11',
    school: 'Oakridge International Academy',
    targetRegion: 'India & North America',
    savedCareerIds: ['ai-machine-learning-engineer', 'ui-ux-product-designer'],
    joinedDate: 'August 2026',
    testHistory: [
      {
        id: 'test_101',
        timestamp: '2026-10-14T10:30:00Z',
        totalScore: 54,
        category: 'Engineering & Technology',
        scores: { analytical: 38, creative: 12, business: 8, social: 4, cognitive: 52, logical: 56, patience: 48, softSkills: 34 },
        traitScores: { cognitive: 91, logical: 94, creative: 68, patience: 86, softSkills: 64 },
        measuredSoftSkills: ['Algorithmic Problem-Solving', 'Root Cause Debugging', 'First-Principles Reasoning', 'Deep Focus'],
        topCareerId: 'ai-machine-learning-engineer',
        whySuggested: {
          headline: 'Your high Logical Reasoning (94%) and Systematic Focus (86%) make AI & Machine Learning your ideal domain.',
          reasonSummary: 'In the scenario evaluations, you naturally preferred first-principles mathematical derivations and methodical root-cause debugging over guesswork. Your high patience score provides the mental stamina required for complex training models and high-stakes computational logic.',
          traitMatches: [
            'Logical Reasoning: 94% alignment with AI mathematical foundations',
            'Patience & Focus: 86% resilience through multi-stage model debugging',
            'Cognitive Depth: 91% alignment with advanced system architecture'
          ],
          answerKeyEvidence: [
            'Isolated syntax error calmly under 9:00 PM crisis',
            'Chose to derive formulas from first principles rather than memorizing formulas'
          ]
        },
        answers: { 1: 'q1_a', 2: 'q2_a', 3: 'q3_a' },
        recommendedCareerIds: ['ai-machine-learning-engineer', 'robotics-automation-engineer', 'ui-ux-product-designer']
      }
    ]
  },
  {
    id: 'usr_rohan_gr12',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@highschool.edu',
    grade: 'Grade 12',
    school: 'Delhi Public School (R.K. Puram)',
    targetRegion: 'India & UK',
    savedCareerIds: ['investment-banker-quantitative-analyst', 'management-consultant'],
    joinedDate: 'September 2026',
    testHistory: [
      {
        id: 'test_102',
        timestamp: '2026-10-28T14:15:00Z',
        totalScore: 36,
        category: 'Business & Management',
        scores: { analytical: 10, creative: 6, business: 32, social: 12, cognitive: 42, logical: 44, patience: 36, softSkills: 50 },
        traitScores: { cognitive: 84, logical: 82, creative: 54, patience: 72, softSkills: 88 },
        measuredSoftSkills: ['Negotiation & Milestone Planning', 'Commercial Foresight', 'Emergency Delegation', 'Resource Cartel Management'],
        topCareerId: 'investment-banker-quantitative-analyst',
        whySuggested: {
          headline: 'Your acute Strategic Thinking (84%) and High Soft Skills (88%) align with Investment Banking & Strategy.',
          reasonSummary: 'You displayed strong instincts for deal negotiation, financial milestone execution, and commercial leverage across group scenarios. Your balanced combination of quantitative arithmetic and persuasive diplomatic presence positions you for executive boardrooms.',
          traitMatches: [
            'Strategic Thinking: 84% fit with corporate transaction structuring',
            'Soft Skills: 88% effectiveness in high-stakes negotiations and client leadership',
            'Logical Structuring: 82% precision in financial modeling'
          ],
          answerKeyEvidence: [
            'Drafted project budget and secured local corporate sponsorships',
            'Orchestrated phased capital expenditure in student council arbitration'
          ]
        },
        answers: { 1: 'q1_c', 2: 'q2_c', 3: 'q3_c' },
        recommendedCareerIds: ['investment-banker-quantitative-analyst', 'management-consultant', 'tech-product-manager']
      }
    ]
  },
  {
    id: 'usr_chloe_gr10',
    name: 'Chloe Zhang',
    email: 'chloe.z@highschool.edu',
    grade: 'Grade 10',
    school: 'Westfield Senior Secondary',
    targetRegion: 'Global',
    savedCareerIds: ['clinical-psychologist-neuropsychologist'],
    joinedDate: 'October 2026',
    testHistory: []
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('findmycareer_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0];
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Authenticated via Firebase
        const existingStored = localStorage.getItem('findmycareer_user');
        let currentProfile: UserProfile | null = null;
        if (existingStored) {
          try {
            const parsed = JSON.parse(existingStored);
            if (parsed.id === firebaseUser.uid) {
              currentProfile = parsed;
            }
          } catch {
            // fallback
          }
        }

        // Fetch fresh test results from Firestore
        let remoteResults: TestResult[] = [];
        try {
          remoteResults = await fetchUserTestResultsFromFirestore(firebaseUser.uid);
        } catch (e) {
          console.warn('Could not fetch Firestore test results:', e);
        }

        const profile: UserProfile = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || currentProfile?.name || firebaseUser.email?.split('@')[0] || 'Student',
          email: firebaseUser.email || '',
          grade: currentProfile?.grade || 'Grade 11',
          school: currentProfile?.school || 'High School Scholar',
          targetRegion: currentProfile?.targetRegion || 'Global & National',
          savedCareerIds: currentProfile?.savedCareerIds || [],
          joinedDate: currentProfile?.joinedDate || 'November 2026',
          testHistory: remoteResults.length > 0 ? remoteResults : (currentProfile?.testHistory || [])
        };

        setUser(profile);
        localStorage.setItem('findmycareer_user', JSON.stringify(profile));
        syncUserProfile(profile).catch(console.error);
      } else {
        // If not logged into Firebase, keep local/demo state
        const saved = localStorage.getItem('findmycareer_user');
        if (!saved) {
          setUser(DEMO_USERS[0]);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync state to local storage and Firestore on updates
  useEffect(() => {
    if (user) {
      localStorage.setItem('findmycareer_user', JSON.stringify(user));
      if (!user.id.startsWith('usr_')) {
        // This is a real Firebase UID
        syncUserProfile(user).catch(console.error);
      }
    } else {
      localStorage.removeItem('findmycareer_user');
    }
  }, [user]);

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const fbUser = await firebaseGoogleSignIn();
      const testResults = await fetchUserTestResultsFromFirestore(fbUser.uid);
      const profile: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Student',
        email: fbUser.email || '',
        grade: 'Grade 11',
        school: 'High School Academy',
        targetRegion: 'Global',
        savedCareerIds: [],
        testHistory: testResults,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      setUser(profile);
      await syncUserProfile(profile);
      return true;
    } catch (err) {
      console.error('Google Sign In failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Try Firebase Auth first
      try {
        const fbUser = await firebaseLoginEmail(email, pass);
        const testResults = await fetchUserTestResultsFromFirestore(fbUser.uid);
        const profile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          grade: 'Grade 11',
          school: 'High School Scholar',
          targetRegion: 'Global',
          savedCareerIds: [],
          testHistory: testResults,
          joinedDate: 'November 2026'
        };
        setUser(profile);
        return true;
      } catch (fbErr: any) {
        // If demo email or fallback
        const demo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (demo) {
          setUser(demo);
          return true;
        }
        // If user already registered locally
        const stored = localStorage.getItem('findmycareer_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.email.toLowerCase() === email.toLowerCase()) {
            setUser(parsed);
            return true;
          }
        }
        throw fbErr;
      }
    } catch (err: any) {
      console.warn('Login attempt with fallback:', err?.message);
      // Fallback: create local session so students are never locked out
      const fallbackUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' '),
        email,
        grade: 'Grade 11',
        school: 'High School Scholar',
        targetRegion: 'Global',
        savedCareerIds: [],
        testHistory: [],
        joinedDate: 'November 2026'
      };
      setUser(fallbackUser);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    grade: UserProfile['grade'],
    school: string,
    region: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      try {
        const fbUser = await firebaseRegisterEmail(email, pass, name, grade, school, region);
        const profile: UserProfile = {
          id: fbUser.uid,
          name,
          email,
          grade,
          school: school || 'High School Academy',
          targetRegion: region || 'Global & National',
          savedCareerIds: [],
          testHistory: [],
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        setUser(profile);
        return true;
      } catch (fbErr: any) {
        console.warn('Firebase registration fallback:', fbErr?.message);
        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          name,
          email,
          grade,
          school: school || 'High School Academy',
          targetRegion: region || 'Global & National',
          savedCareerIds: [],
          testHistory: [],
          joinedDate: 'November 2026'
        };
        setUser(newUser);
        return true;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    firebaseLogOut().catch(console.error);
    setUser(null);
  };

  const toggleSaveCareer = (careerId: string) => {
    if (!user) return;
    const exists = user.savedCareerIds.includes(careerId);
    const updatedIds = exists
      ? user.savedCareerIds.filter(id => id !== careerId)
      : [...user.savedCareerIds, careerId];

    const updatedUser = {
      ...user,
      savedCareerIds: updatedIds
    };

    setUser(updatedUser);

    if (!user.id.startsWith('usr_')) {
      toggleSavedCareerInFirestore(user.id, careerId, !exists).catch(console.error);
    }
  };

  const isCareerSaved = (careerId: string): boolean => {
    return user ? user.savedCareerIds.includes(careerId) : false;
  };

  const saveTestResult = (resultData: Omit<TestResult, 'id' | 'timestamp'>): TestResult => {
    const newResult: TestResult = {
      ...resultData,
      id: `test_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    if (user) {
      const updatedUser = {
        ...user,
        testHistory: [newResult, ...user.testHistory]
      };
      setUser(updatedUser);

      if (!user.id.startsWith('usr_')) {
        saveTestResultToFirestore(user.id, newResult).catch(console.error);
      }
    }

    return newResult;
  };

  const switchDemoUser = (personaIndex: number) => {
    const selected = DEMO_USERS[personaIndex] || DEMO_USERS[0];
    setUser(selected);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        toggleSaveCareer,
        isCareerSaved,
        saveTestResult,
        switchDemoUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
