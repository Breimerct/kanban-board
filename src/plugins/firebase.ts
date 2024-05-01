//#region Imports
// Import firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import {
   getAuth,
   getRedirectResult,
   GithubAuthProvider,
   onAuthStateChanged,
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
import { type AuthStateChanged, type GetDB, type SetDB } from '../types';
//#endregion

const firebaseConfig = {
   apiKey: VITE_FB_APY_KEY,
   authDomain: VITE_FB_AUTH_DOMAIN,
   projectId: VITE_FB_PROJECT_ID,
   storageBucket: VITE_FB_STORAGE_BUCKET,
   messagingSenderId: VITE_FB_MESSAGING_SENDER_ID,
   appId: VITE_FB_APP_ID
};

const provider = new GithubAuthProvider();
export const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

//#region Functions
export const getProviderResult = getRedirectResult.bind(null, auth);

export const signInWithGitHub = signInWithRedirect.bind(null, auth, provider);

export const logout = signOut.bind(null, auth);

export const setDB: SetDB = (path, data) => {
   return new Promise((resolve, reject) => {
      try {
         set(ref(db, path), data);
         resolve(true);
      } catch (error) {
         reject(error);
      }
   });
};

export const getDB: GetDB = (path, snapshot, error) => {
   const starCountRef = ref(db, path);
   return onValue(starCountRef, snapshot, error);
};

export const authStateChanged: AuthStateChanged = (callback, error) => onAuthStateChanged(auth, callback, error);
