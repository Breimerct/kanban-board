import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/main-layout/MainLayout';
import Home from '../pages/home/Home';
import Board from '../pages/board/Board';

const routes = createBrowserRouter([
   {
      path: '/',
      Component: MainLayout,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: '/board/:id',
            element: <Board />
         }
      ]
   }
]);

export default routes;
