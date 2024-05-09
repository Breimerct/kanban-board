import { User } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
   user: User | null;
};

type AuthAction = {
   login: () => void;
   logout: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
   persist(
      (set) => ({
         user: null,

         login: () => {
            set({ user: null });
         },

         logout: () => {
            set({ user: null });
         }
      }),
      { name: 'auth-store' }
   )
);
