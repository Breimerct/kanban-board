import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
   return (
      <div className="auth-layout">
         <h1 className="text-4xl">Auth Layout</h1>
         <Outlet />
      </div>
   );
};

export default AuthLayout;
