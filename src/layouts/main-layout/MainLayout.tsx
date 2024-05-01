//#region Imports
import './MainLayout.scss';
import { Board } from '../../types/types';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getDB, signInWithGitHub, logout } from '../../plugins/firebase';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import SideBar from '../../components/sidebar/SideBar';
import useCurrentUser from '../../hooks/useCurrentUser';
import Modal from '../../components/modal/Modal';
//#endregion

const MainLayout: FC = () => {
   const { currentUser } = useCurrentUser();
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();
   const [boards, setBoards] = useState<[string, Board][]>([]);
   const [showCreateBoard, setShowCreateBoard] = useState(false);

   const handleLogin = async () => {
      await signInWithGitHub();
   };

   const handleLogout = () => {
      logout();
   };

   useEffect(() => {
      setShowCreateBoard(routeHash === '#create-board');
      console.log(routeHash, routeHash === '#create-board');
   }, [routeHash]);

   useEffect(() => {
      if (currentUser) {
         getDB(`boards/${currentUser.uid}`, (snapshot) => {
            const boardsData = snapshot.val() as Record<string, Board>;
            const boardsDataArray = Object.entries(boardsData || {});

            setBoards(boardsDataArray);
         });
      }
   }, [currentUser]);

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
                     <button className="ml-auto p-2 rounded-md bg-gray-100 dark:bg-gray-700" onClick={handleLogout}>
                        <span className="material-icons">logout</span>
                     </button>

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
                  <button className="ml-4 p-2 rounded-md bg-gray-100 dark:bg-gray-700" onClick={handleLogin}>
                     <span className="material-icons">login</span>
                  </button>
               )}
            </div>
         </header>

         <div className="flex flex-1">
            <SideBar className="h-auto" boards={boards} />

            <main className="h-full w-full relative overflow-hidden">
               <Outlet />
            </main>
         </div>

         <Modal
            title="Create a new board"
            isOpen={showCreateBoard}
            onClose={() => {
               setShowCreateBoard(false);
               navigate('/');
            }}
         >
            <h1 className="text-2xl font-bold">Create a new board</h1>
         </Modal>
      </div>
   );
};

export default MainLayout;
