import { Link, Outlet } from 'react-router-dom';

import KanbanBoard from '../../assets/scrum_board.svg';
import { toast } from 'sonner';

const AuthLayout = () => {
   const handleAlert = () => {
      toast.warning('You will have limitations within the application if you have not logged in.', {
         duration: 8000,
         position: 'top-center',
         closeButton: true
      });
   };

   return (
      <div className="auth-layout min-h-screen flex flex-col justify-center lg:flex-row lg:items-center gap-2 px-4 md:px-10">
         <header className="w-full h-full text-center">
            <Link to="/" className="transition-all" onClick={handleAlert}>
               <img src={KanbanBoard} alt="kanban board" className="w-auto h-60 lg:h-80 mx-auto" />
               <h3 className="font-bold text-4xl">Breco Board Agile</h3>
            </Link>
         </header>

         <main className="w-full h-full flex flex-col items-center justify-center">
            <Outlet />
         </main>
      </div>
   );
};

export default AuthLayout;
