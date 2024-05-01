//#region Imports
import './MainLayout.scss';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import KanbanBoard from '/kanban.svg';
import KanbanBoardDark from '/kanban-dark-mode.svg';
import SideBar from '../../components/sidebar/SideBar';
//#endregion

const MainLayout: FC = () => {
   const boards = [
      {
         id: '1',
         name: 'Board 1'
      },
      {
         id: '2',
         name: 'Board 2'
      },
      {
         id: '3',
         name: 'Board 3'
      }
   ];

   return (
      <div className="w-screen h-full flex flex-nowrap dark:bg-gray-900 dark:text-white">
         <SideBar boards={boards} />

         <main className="mx-auto flex-1 flex flex-col overflow-hidden">
            <header className="w-full px-4 p-2 shadow-md min-h-20 flex items-center justify-start dark:bg-gray-800">
               <img src={KanbanBoard} alt="kanban board" className="w-auto h-14 dark:hidden" />
               <img src={KanbanBoardDark} alt="kanban board" className="w-auto h-14 hidden dark:block" />
            </header>

            <Outlet />
         </main>
      </div>
   );
};

export default MainLayout;
