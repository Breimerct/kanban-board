// import { FC } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/main-layout/MainLayout';
import Board from '../pages/board/Board';
import Home from '../pages/home/Home';

// interface ProtectedRouteProps {
//    children: React.ReactNode;
// }

// export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
//    if (!sessionStorage?.user) {
//       return <Navigate to="/" />; // Redirecciona a la ruta de inicio de sesión
//    }

//    return children; // Renderiza los componentes hijo
// };

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
