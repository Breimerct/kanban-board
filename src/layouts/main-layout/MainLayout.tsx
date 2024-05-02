//#region Imports
import './MainLayout.scss';
import { Board, ThemeColor, ButtonVariant } from '../../types';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signInWithGitHub, logout } from '../../plugins/firebase';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import SideBar from '../../components/sidebar/SideBar';
import useCurrentUser from '../../hooks/useCurrentUser';
import NewBoard from '../../components/new-board/NewBoard';
import Button from '../../components/button/Button';
import useGetCollection from '../../hooks/useGetCollection';
//#endregion

type Boards = [string, Board];

const MainLayout: FC = () => {
   const { currentUser } = useCurrentUser();
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();
   const boardsCollection = useGetCollection({ path: `boards/${currentUser?.uid}` });
   const [boards, setBoards] = useState<Boards[]>(boardsCollection as Boards[]);
   const [showNewBoard, setShowNewBoard] = useState(false);

   const handleLogin = async () => {
      await signInWithGitHub();
   };

   const handleLogout = () => {
      logout();
      navigate('/');
   };

   const handleCloseNewBoard = () => {
      navigate({ hash: '' });
   };

   useEffect(() => {
      const isNewBoard = routeHash === '#new-board';
      setShowNewBoard(isNewBoard);
   }, [routeHash]);

   useEffect(() => {
      setBoards(boardsCollection as Boards[]);
   }, [boardsCollection]);

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
                        <source srcSet={currentUser.photoURL || ''} />
                        <span className="ms-2">{currentUser.displayName}</span>
                        <img
                           src={currentUser.photoURL || ''}
                           alt={currentUser.displayName || ''}
                           className="w-10 h-10 rounded-full"
                        />
                     </picture>
                  </div>
               ) : (
                  <Button variant={ButtonVariant.SOLID} color={ThemeColor.SECONDARY} onClick={handleLogin}>
                     login
                  </Button>
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
