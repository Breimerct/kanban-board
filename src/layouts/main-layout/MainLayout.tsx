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
   const [showNewBoard, setShowNewBoard] = useState(false);
   const [showSidebar, setShowSidebar] = useState(false);
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();

   const closeIconClasses = showSidebar
      ? 'before:rotate-[45deg] before:top-[44%] after:rotate-[-45deg] after:bottom-[50%]'
      : '';

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
               <Link to="/app/home">
                  <img src={KanbanBoard} alt="kanban board" className="w-auto h-10 dark:hidden" />
                  <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-10 hidden dark:block" />
               </Link>
            </div>

            <div className="flex items-center gap-4">
               {currentUser && (
                  <div className="flex items-center gap-3">
                     <p className="capitalize font-semibold text-xl">{currentUser.displayName}</p>

                     <picture className="flex items-center gap-2">
                        <img
                           src={currentUser.photoURL || ''}
                           alt={currentUser.displayName || ''}
                           className="w-12 h-12 rounded-full"
                        />
                     </picture>
                  </div>
               )}

               <div className="md:hidden">
                  <button className="!w-7 !h-7 rounded-md" onClick={() => setShowSidebar(!showSidebar)}>
                     <div
                        className={`w-full h-full relative before:transition-all after:transition-all ease-in-out before:w-full before:h-[2px] before:absolute before:top-[30%] before:left-0 after:w-full after:h-[2px] after:absolute after:bottom-[30%] after:left-0 before:bg-black after:bg-black before:rounded-md after:rounded-md ${closeIconClasses}`}
                     />
                  </button>
               </div>
            </div>
         </header>

         <div className="flex flex-1">
            <SideBar className="h-auto" boards={boards} showSidebar={showSidebar} />

            <main className="h-full w-full relative overflow-hidden">
               <Outlet />
            </main>
         </div>

         <NewBoard isOpen={showNewBoard} onClose={handleCloseNewBoard} />
      </div>
   );
};

export default MainLayout;
