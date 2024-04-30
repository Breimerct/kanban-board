//#region Imports
import './MainLayout.scss';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import KanbanBoard from '/kanban.svg';
//#endregion

const MainLayout: FC = () => {
   return (
      <div className="h-screen w-screen grid place-content-center">
         <img src={KanbanBoard} alt="kanban board" className="w-1/2 mx-auto" />
         <h1 className="text-3xl font-extrabold">kanban board</h1>
         <Outlet />
      </div>
   );
};

export default MainLayout;
