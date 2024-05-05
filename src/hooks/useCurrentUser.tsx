import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../plugins/firebase';
import { useNavigate } from 'react-router-dom';

type CurrentUser = User | null;

const useCurrentUser = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
   const [error, setError] = useState<Error | null>(null);
   const navigate = useNavigate();

   const handleSetUser = (user: CurrentUser) => {
      user && localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, handleSetUser, setError);

      return unsubscribe;
   }, [navigate]);

   return {
      currentUser,
      error
   };
};

export default useCurrentUser;
