import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authStateChanged } from '../plugins/firebase';

type CurrentUser = User | null;

const useCurrentUser = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

   useEffect(() => {
      const unsubscribe = authStateChanged((user: CurrentUser) => {
         if (user) {
            setCurrentUser(user);
         } else {
            setCurrentUser(null);
         }
      });

      return unsubscribe;
   }, []);

   return currentUser;
};

export default useCurrentUser;
