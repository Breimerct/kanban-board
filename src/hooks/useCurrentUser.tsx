import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authStateChanged } from '../plugins/firebase';

type CurrentUser = User | null;

const useCurrentUser = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const unsubscribe = authStateChanged(setCurrentUser, setError);

      return unsubscribe;
   }, []);

   return {
      currentUser,
      error
   };
};

export default useCurrentUser;
