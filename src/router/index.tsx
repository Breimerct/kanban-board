import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/main-layout/MainLayout';
import AuthLayout from '../layouts/auth-layout/AuthLayout';
import Login from '../pages/login/Login';
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
   },
   {
      path: 'auth',
      Component: AuthLayout,
      children: [
         {
            path: 'login',
            element: <Login />
         },
         {
            path: 'register',
            element: <h1>Register</h1>
         }
      ]
   },
   {
      path: '*',
      element: <Navigate to="/" />
   }
]);

export default routes;
