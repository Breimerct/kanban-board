import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useEffect } from 'react';

const RootLayout = () => {
   const getUserByProvider = useAuthStore((state) => state.getUserByProvider);
   const currentUser = useAuthStore((state) => state.currentUser);
   const navigate = useNavigate();
   const { pathname } = useLocation();

   useEffect(() => {
      if (currentUser && pathname.includes('/auth')) {
         navigate('/app/home');
      }

      if (pathname === '/') {
         navigate('/app/home');
      }
   }, [currentUser, pathname]);

   useEffect(() => {
      getUserByProvider();
   }, []);

   return (
      <div>
         <Outlet />
      </div>
   );
};

export default RootLayout;
