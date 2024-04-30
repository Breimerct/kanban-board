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
   signOut,
   signInWithPopup
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
import { type AuthStateChanged, type GetDB, type SetDB } from 'src/types/types';
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth.bind(app);

//#region Functions
export const getProviderResult = getRedirectResult.bind(null, auth());

export const signInWithGitHub = signInWithRedirect.bind(null, auth(), provider);

export const signInWithPopupGitHub = signInWithPopup.bind(null, auth(), provider);

export const logout = signOut.bind(null, auth());

export const setDB: SetDB = (path, data) => {
   return set(ref(db, path), data);
};

export const getDB: GetDB = (path, snapshot, error) => {
   const starCountRef = ref(db, path);
   onValue(starCountRef, snapshot, error);
};

export const authStateChanged: AuthStateChanged = (callback, error) => onAuthStateChanged(auth(), callback, error);
