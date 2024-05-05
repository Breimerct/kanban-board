//#region Imports
// Import firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, ref, set, update } from 'firebase/database';
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
export const auth = getAuth(app);

//#region Functions
export const getProviderResult = getRedirectResult.bind(null, auth);

export const signInWithGitHub = signInWithRedirect.bind(null, auth, githubProvider);

export const signInWithGoogle = signInWithRedirect.bind(null, auth, googleProvider);

export const logout = signOut.bind(null, auth);

export const updateData: UpdateData = (path, data) => {
   const rootPath = `users/${auth.currentUser?.uid}`;
   const dbRef = ref(db);

   if (!data && typeof path === 'object') {
      const updates = Object.entries(path).reduce(
         (acc, [key, value]) => ({ ...acc, [`${rootPath}/${key}`]: value }),
         {} as Record<string, unknown>
      );

      update(dbRef, updates);

      return;
   }

   if (typeof path === 'string') {
      const updates: Record<string, unknown> = {};
      updates[`${rootPath}/${path}`] = data;

      update(dbRef, updates);
   }
};

export const setDB: SetDB = async (path, data) => {
   try {
      const rootPath = `users/${auth.currentUser?.uid}/${path}`;
      const pushRef = push(ref(db, rootPath));

      await set(pushRef, { id: pushRef.key, ...data });

      return pushRef.key;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getDB: GetDB = (path, snapshot, error) => {
   const rootPath = `users/${auth.currentUser?.uid}/${path}`;
   const starCountRef = ref(db, rootPath);

   return onValue(starCountRef, snapshot, error);
};
