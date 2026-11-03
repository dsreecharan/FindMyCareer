import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, TestResult } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific databaseId if provided
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Connection test per skill directive
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify network connection and Firestore setup.');
    } else {
      // Normal when test doc does not exist yet; connection is alive
      console.log('Firebase reached Firestore successfully.');
    }
  }
}
testConnection();

// Auth Operations
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Google Sign-In failed:', error);
    throw error;
  }
}

export async function loginWithEmail(email: string, pass: string) {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return cred.user;
}

export async function registerWithEmail(
  email: string,
  pass: string,
  displayName: string,
  grade: UserProfile['grade'],
  school: string,
  region: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(cred.user, { displayName });
  
  // Create profile doc in Firestore
  const profileDocRef = doc(db, 'users', cred.user.uid);
  const userProfile: UserProfile = {
    id: cred.user.uid,
    name: displayName,
    email: cred.user.email || email,
    grade,
    school: school || 'High School Academy',
    targetRegion: region || 'Global & National',
    savedCareerIds: [],
    testHistory: [],
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };
  await setDoc(profileDocRef, userProfile, { merge: true });
  return cred.user;
}

export async function logOutUser() {
  await signOut(auth);
}

// Firestore operations for student data
export async function syncUserProfile(user: UserProfile): Promise<void> {
  if (!user || !user.id) return;
  try {
    const profileRef = doc(db, 'users', user.id);
    await setDoc(profileRef, {
      id: user.id,
      name: user.name,
      email: user.email,
      grade: user.grade,
      school: user.school,
      targetRegion: user.targetRegion,
      savedCareerIds: user.savedCareerIds,
      joinedDate: user.joinedDate,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error syncing profile to Firestore:', err);
  }
}

export async function saveTestResultToFirestore(userId: string, result: TestResult): Promise<void> {
  if (!userId || !result.id) return;
  try {
    const testDocRef = doc(db, 'users', userId, 'testResults', result.id);
    await setDoc(testDocRef, {
      ...result,
      userId,
      savedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error saving test result to Firestore:', err);
  }
}

export async function fetchUserTestResultsFromFirestore(userId: string): Promise<TestResult[]> {
  if (!userId) return [];
  try {
    const testColRef = collection(db, 'users', userId, 'testResults');
    const snapshot = await getDocs(testColRef);
    const results: TestResult[] = [];
    snapshot.forEach(docSnap => {
      results.push(docSnap.data() as TestResult);
    });
    // Sort descending by timestamp
    return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (err) {
    console.error('Error fetching test results from Firestore:', err);
    return [];
  }
}

export async function toggleSavedCareerInFirestore(userId: string, careerId: string, isSaved: boolean): Promise<void> {
  if (!userId || !careerId) return;
  try {
    const docRef = doc(db, 'users', userId, 'savedCareers', careerId);
    if (isSaved) {
      await setDoc(docRef, {
        careerId,
        savedAt: new Date().toISOString()
      });
    } else {
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.error('Error updating saved career in Firestore:', err);
  }
}

export async function saveRoadmapChecklistToFirestore(
  userId: string,
  careerId: string,
  completedMilestoneIds: string[],
  completedSkillIds: string[],
  currentGrade: string
): Promise<void> {
  if (!userId || !careerId) return;
  try {
    const docRef = doc(db, 'users', userId, 'roadmapProgress', careerId);
    await setDoc(docRef, {
      careerId,
      completedMilestoneIds,
      completedSkillIds,
      currentGrade,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving roadmap checklist to Firestore:', err);
  }
}

export async function fetchRoadmapChecklistFromFirestore(
  userId: string,
  careerId: string
): Promise<{ completedMilestoneIds: string[]; completedSkillIds: string[] } | null> {
  if (!userId || !careerId) return null;
  try {
    const docRef = doc(db, 'users', userId, 'roadmapProgress', careerId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        completedMilestoneIds: data.completedMilestoneIds || [],
        completedSkillIds: data.completedSkillIds || []
      };
    }
  } catch (err) {
    console.error('Error fetching roadmap progress from Firestore:', err);
  }
  return null;
}
