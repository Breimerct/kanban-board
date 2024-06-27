//#region Imports
// Import firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, ref, set, update, get } from 'firebase/database';
import {
   getAuth,
   getRedirectResult,
   GithubAuthProvider,
   GoogleAuthProvider,
   signInWithRedirect,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   User
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
import { NewUser, UpdateData, type GetDB, type SetDB } from '../types';
import { UI_AVATAR_URL_BASE } from '../consts/consts';
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

export const authStateChange = (callback: (user: User | null) => void) => {
   onAuthStateChanged(auth, callback);
};

export const signInWithEmailAndPass = async (email: string, password: string) => {
   const { user } = await signInWithEmailAndPassword(auth, email, password);
   const rootPath = `users/${user.uid}/profile`;
   const userRef = ref(db, rootPath);
   const userProfile = await get(userRef);

   return {
      ...user,
      ...userProfile.val()
   } as User;
};

export const createAccount = async ({ email, password, name }: NewUser) => {
   const { user } = await createUserWithEmailAndPassword(auth, email, password);

   const rootPath = `users/${user.uid}/profile`;
   const pushRef = ref(db, rootPath);

   const newUser: Partial<User> = {
      ...user,
      displayName: name.trim().toLowerCase(),
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: `${UI_AVATAR_URL_BASE}&name=${name}`
   };

   await set(pushRef, newUser);

   return newUser as User;
};

export const logout = signOut.bind(null, auth);

export const updateData: UpdateData = (path, data) => {
   let updates: Record<string, unknown> = {};
   const rootPath = `users/${auth.currentUser?.uid}`;
   const dbRef = ref(db);

   if (!data && typeof path === 'object') {
      updates = Object.entries(path).reduce(
         (acc, [updatePath, value]) => ({ ...acc, [`${rootPath}/${updatePath}`]: value }),
         {}
      );
   }

   if (typeof path === 'string') {
      updates[`${rootPath}/${path}`] = data;
   }

   update(dbRef, updates);
};

export const setDB: SetDB = async <T>(path: string, data: T) => {
   try {
      const rootPath = `users/${auth.currentUser?.uid}/${path}`;
      const pushRef = push(ref(db, rootPath));
      const newData = { uid: pushRef.key, ...data };

      await set(pushRef, newData);

      return newData as T;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const getDB: GetDB = (path, userId, snapshot, error) => {
   const rootPath = `users/${userId}/${path}`;
   const starCountRef = ref(db, rootPath);

   return onValue(starCountRef, snapshot, error);
};
