import { User } from 'firebase/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
   logout,
   signInWithGitHub,
   signInWithGoogle,
   getProviderResult,
   signInWithEmailAndPass
   // createAccount
} from '../plugins/firebase';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERRORS } from '../consts/firebaseErros';
import { toast } from 'sonner';
import { NewUser } from '../types';

type AuthState = {
   user: User | null;
};

type AuthAction = {
   signInWithEmailAndPass: (email: string, pass: string) => void;
   signInWithGitHub: () => void;
   signInWithGoogle: () => void;
   getUserByProvider: () => Promise<void>;
   createAccount: (newUser: NewUser) => void;
   logout: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
   persist(
      (set) => ({
         user: null,

         signInWithEmailAndPass: (email, pass) => {
            const result = signInWithEmailAndPass(email, pass);
            console.log(result);
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
               set({ user: result?.user ?? null });
            } catch (error) {
               const { code } = error as FirebaseError;
               toast.error(FIREBASE_ERRORS[code]);
               console.error(FIREBASE_ERRORS[code]);
            }
         },

         createAccount: (newUser) => {
            try {
               // const result = createAccount(newUser);
               console.log(newUser);
            } catch (error) {
               const { code } = error as FirebaseError;
               toast.error(FIREBASE_ERRORS[code]);
               console.error(FIREBASE_ERRORS[code]);
            }
         },

         logout: () => {
            logout();
            set({ user: null });
         }
      }),
      {
         name: 'auth-store',
         storage: createJSONStorage(() => sessionStorage)
      }
   )
);
