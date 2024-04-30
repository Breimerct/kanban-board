//#region Imports
import './App.scss';
import { FC } from 'react';

import KanbanBoard from '/kanban.svg';
//#endregion

const App: FC = () => {
   return (
      <div className="h-screen w-screen grid place-content-center">
         <img src={KanbanBoard} alt="kanban board" className="w-1/2 mx-auto" />
         <h1 className="text-3xl font-extrabold">kanban board</h1>
      </div>
   );
};

export default App;
