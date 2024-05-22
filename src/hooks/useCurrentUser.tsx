import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../plugins/firebase';
import { useAuthStore } from '../store/auth.store';

type CurrentUser = User | null;

const useCurrentUser = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
   const [error, setError] = useState<Error | null>(null);
   const storeUser = useAuthStore((state) => state.user);

   const handleSetUser = (user: CurrentUser) => {
      user && storeUser;
      setCurrentUser(user);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, handleSetUser, setError);

      return unsubscribe;
   }, [currentUser]);

   return {
      currentUser,
      error
   };
};

export default useCurrentUser;
