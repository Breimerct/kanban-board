import { User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
   logout,
   signInWithGitHub,
   signInWithGoogle,
   getProviderResult,
   signInWithEmailAndPass,
   createAccount
} from '../plugins/firebase';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERRORS } from '../consts/firebaseErros';
import { toast } from 'sonner';
import { NewUser } from '../types';

type AuthState = {
   currentUser: User | null;
};

type AuthAction = {
   setCurrentUser: (user: User | null) => void;
   signInWithEmailAndPass: (email: string, pass: string) => Promise<void>;
   signInWithGitHub: () => void;
   signInWithGoogle: () => void;
   getUserByProvider: () => Promise<void>;
   createAccount: (newUser: NewUser) => Promise<void>;
   logout: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
   persist(
      (set) => ({
         currentUser: null,

         setCurrentUser: (user) => set({ currentUser: user }),

         signInWithEmailAndPass: async (email, pass) => {
            try {
               const result = await signInWithEmailAndPass(email, pass);
               set({ currentUser: result });
               console.log(result);
            } catch (error) {
               const { code } = error as FirebaseError;

               if (code) {
                  toast.error(FIREBASE_ERRORS[code]);
                  console.error(FIREBASE_ERRORS[code]);
               }

               throw new Error(FIREBASE_ERRORS[code]);
            }
         },

         signInWithGitHub: () => {
            signInWithGitHub();
         },

         signInWithGoogle: () => {
            signInWithGoogle();
         },

         getUserByProvider: async () => {
            try {
               const result = await getProviderResult();
               result?.user && set({ currentUser: result?.user });
            } catch (error) {
               const { code } = error as FirebaseError;
               toast.error(FIREBASE_ERRORS[code]);
               console.error(FIREBASE_ERRORS[code]);
            }
         },

         createAccount: async (newUser) => {
            try {
               const result = await createAccount(newUser);
               set({ currentUser: result });
               console.log(result);
            } catch (error) {
               const { code } = error as FirebaseError;
               toast.error(FIREBASE_ERRORS[code]);
               console.error(FIREBASE_ERRORS[code], code, error);
               throw new Error(FIREBASE_ERRORS[code]);
            }
         },

         logout: async () => {
            await logout().then(() => set({ currentUser: null }));
         }
      }),
      {
         name: 'auth-store',
         storage: createJSONStorage(() => sessionStorage)
      }
   )
);
