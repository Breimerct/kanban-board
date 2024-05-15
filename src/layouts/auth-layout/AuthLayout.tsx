import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import useCurrentUser from '../../hooks/useCurrentUser';

const AuthLayout = () => {
   const { currentUser } = useCurrentUser();
   const navigate = useNavigate();

   useEffect(() => {
      if (currentUser) {
         navigate('/');
      }
   }, [currentUser, navigate]);

   return (
      <div className="auth-layout min-h-screen flex flex-col justify-center lg:flex-row lg:items-center gap-2 px-4 md:px-10">
         <header className="w-full h-full text-center">
            <img src={KanbanBoard} alt="kanban board" className="w-auto h-40 mx-auto dark:hidden" />
            <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-40 hidden mx-auto dark:block" />
            <h3 className="font-extrabold text-4xl">Kanban Board</h3>
         </header>

         <main className="w-full h-full flex flex-col items-center justify-center">
            <Outlet />
         </main>
      </div>
   );
};

export default AuthLayout;
