//#region Imports
// Import firebase modules
import { initializeApp } from 'firebase/app';
import { DatabaseReference, getDatabase, onValue, ref, set, update } from 'firebase/database';
import {
   getAuth,
   getRedirectResult,
   GithubAuthProvider,
   GoogleAuthProvider,
   signInWithRedirect,
   signOut
} from 'firebase/auth';

// Import environment variables
import {
   VITE_FB_APP_ID,
   VITE_FB_APY_KEY,
   VITE_FB_AUTH_DOMAIN,
   VITE_FB_MESSAGING_SENDER_ID,
   VITE_FB_PROJECT_ID,
   VITE_FB_STORAGE_BUCKET
} from '../consts/env';
import { UpdateData, type GetDB, type SetDB } from '../types';
//#endregion

const firebaseConfig = {
   apiKey: VITE_FB_APY_KEY,
   authDomain: VITE_FB_AUTH_DOMAIN,
   projectId: VITE_FB_PROJECT_ID,
   storageBucket: VITE_FB_STORAGE_BUCKET,
   messagingSenderId: VITE_FB_MESSAGING_SENDER_ID,
   appId: VITE_FB_APP_ID
};

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export const auth = getAuth(app);

//#region Functions
export const getProviderResult = getRedirectResult.bind(null, auth);

export const signInWithGitHub = signInWithRedirect.bind(null, auth, githubProvider);

export const signInWithGoogle = signInWithRedirect.bind(null, auth, googleProvider);

export const logout = signOut.bind(null, auth);

export const updateData: UpdateData = (updates) => {
   console.log(updates);
   update(dbRef, updates as DatabaseReference);
};

export const setDB: SetDB = (path, data) => {
   return new Promise((resolve, reject) => {
      try {
         const rootPath = `users/${auth.currentUser?.uid}/${path}`;
         set(ref(db, rootPath), data);
         resolve(true);
      } catch (error) {
         reject(error);
      }
   });
};

export const getDB: GetDB = (path, snapshot, error) => {
   const rootPath = `users/${auth.currentUser?.uid}/${path}`;
   const starCountRef = ref(db, rootPath);
   return onValue(starCountRef, snapshot, error);
};
