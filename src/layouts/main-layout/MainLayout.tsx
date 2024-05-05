//#region Imports
import './MainLayout.scss';
import { Board, ThemeColor, ButtonVariant } from '../../types';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signInWithGitHub, logout, signInWithGoogle } from '../../plugins/firebase';
import useGetCollection from '../../hooks/useGetCollection';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import SideBar from '../../components/sidebar/SideBar';
import useCurrentUser from '../../hooks/useCurrentUser';
import NewBoard from '../../components/new-board/NewBoard';
import Button from '../../components/button/Button';
//#endregion

const MainLayout: FC = () => {
   const { currentUser } = useCurrentUser();
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();
   const boards = useGetCollection({ path: `boards` }) as Board[];
   const [showNewBoard, setShowNewBoard] = useState(false);

   const handleLoginGithub = async () => {
      await signInWithGitHub();
   };

   const handleLoginGoogle = async () => {
      await signInWithGoogle();
   };

   const handleLogout = () => {
      logout();
      sessionStorage.removeItem('user');
      navigate('/');
   };

   const handleCloseNewBoard = () => {
      navigate({ hash: '' });
   };

   useEffect(() => {
      const isNewBoard = routeHash === '#new-board';
      setShowNewBoard(isNewBoard);
   }, [routeHash]);

   return (
      <div className="flex flex-col h-screen overflow-hidden">
         <header className="w-full px-4 p-2 shadow-md h-20 flex items-center justify-between bg-gray-50 dark:bg-gray-800 z-50">
            <div>
               <Link to="/">
                  <img src={KanbanBoard} alt="kanban board" className="w-auto h-10 dark:hidden" />
                  <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-10 hidden dark:block" />
               </Link>
            </div>

            <div>
               {currentUser ? (
                  <div className="flex gap-10">
                     <Button variant={ButtonVariant.SOLID} color={ThemeColor.SECONDARY} onClick={handleLogout}>
                        logout
                     </Button>

                     <picture className="flex items-center gap-2">
                        <span className="ms-2">{currentUser.displayName}</span>
                        <img
                           src={currentUser.photoURL || ''}
                           alt={currentUser.displayName || ''}
                           className="w-10 h-10 rounded-full"
                        />
                     </picture>
                  </div>
               ) : (
                  <div className="flex gap-4">
                     <Button variant={ButtonVariant.SOLID} color={ThemeColor.SECONDARY} onClick={handleLoginGithub}>
                        login github
                     </Button>
                     <Button variant={ButtonVariant.SOLID} color={ThemeColor.SECONDARY} onClick={handleLoginGoogle}>
                        login google
                     </Button>
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
