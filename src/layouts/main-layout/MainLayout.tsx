//#region Imports
import './MainLayout.scss';
import { Board } from '../../types';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useGetCollection from '../../hooks/useGetCollection';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import SideBar from '../../components/sidebar/SideBar';
import NewBoard from '../../components/new-board/NewBoard';
import { useAuthStore } from '../../store/auth.store';
//#endregion

const MainLayout: FC = () => {
   const boards = useGetCollection({ path: `boards` }) as Board[];
   const currentUser = useAuthStore((state) => state.currentUser);
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();
   const [showNewBoard, setShowNewBoard] = useState(false);

   const handleCloseNewBoard = () => {
      navigate({ hash: '' });
   };

   useEffect(() => {
      const isNewBoard = routeHash === '#new-board';
      setShowNewBoard(isNewBoard);
   }, [routeHash]);

   return (
      <div className="flex flex-col h-screen overflow-hidden">
         <header className="w-full px-4 p-2 shadow-md h-20 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
            <div>
               <Link to="/">
                  <img src={KanbanBoard} alt="kanban board" className="w-auto h-10 dark:hidden" />
                  <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-10 hidden dark:block" />
               </Link>
            </div>

            <div>
               {currentUser && (
                  <div className="flex gap-10">
                     <picture className="flex items-center gap-2">
                        <img
                           src={currentUser.photoURL || ''}
                           alt={currentUser.displayName || ''}
                           className="w-12 h-12 rounded-full"
                        />
                     </picture>
                  </div>
               )}
            </div>
         </header>

         <div className="flex flex-1">
            <SideBar className="h-auto" boards={boards} />

            <main className="h-full w-full relative overflow-hidden">
               <Outlet />
            </main>
         </div>

         <NewBoard isOpen={showNewBoard} onClose={handleCloseNewBoard} />
      </div>
   );
};

export default MainLayout;
