//#region imports
import { FC } from 'react';
import { Board } from '../../types';
import { useAuthStore } from '../../store/auth.store';

//#region Imports Components
import RouteItem from '../route-item/RouteItem';
import { HomeIcon, LoginIcon, LogoutIcon, PlusIcon, SettingsIcon } from '../icons/Icons';
//#endregion

interface SideBarProps {
   boards: Board[];
   className?: string;
   showSidebar?: boolean;
}

const SideBar: FC<SideBarProps> = ({ boards, className, showSidebar }) => {
   const logout = useAuthStore((state) => state.logout);
   const currentUser = useAuthStore((state) => state.currentUser);
   const show = showSidebar ? 'translate-x-0' : '-translate-x-full';

   const handleClick = () => {
      currentUser && logout();
   };

   const icon = currentUser ? <LogoutIcon size={30} /> : <LoginIcon size={30} />;

   return (
      <aside
         className={`w-64 h-full transition-transform z-20 absolute top-0 md:relative md:translate-x-0 ${show} ${className}`}
         aria-label="Sidebar"
      >
         <div className="h-full w-[inherit] overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="h-full px-3 py-4 font-medium flex flex-col justify-between gap-2">
               <div className="flex flex-col gap-2">
                  <RouteItem to="/app/home" icon={<HomeIcon size={30} />} title="Home" />

                  <RouteItem to="#" icon={<SettingsIcon size={30} />} title="Settings" />

                  {boards.map(({ id, title }) => (
                     <RouteItem key={id} boardId={id} to={`/app/board/${id}`} title={title} />
                  ))}
                  <RouteItem
                     to="#new-board"
                     title="New board"
                     icon={<PlusIcon size={30} />}
                     className="bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-700 dark:bg-gray-900"
                  />
               </div>

               <RouteItem
                  onClick={handleClick}
                  to={!currentUser ? '/auth/login' : '/app/home'}
                  title={currentUser ? 'Logout' : 'Login'}
                  icon={icon}
                  className="bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-700 dark:bg-gray-900"
               />
            </ul>
         </div>
      </aside>
   );
};

export default SideBar;
