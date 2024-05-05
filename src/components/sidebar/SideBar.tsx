//#region imports
import { FC } from 'react';
import { Board } from '../../types';

//#region Imports Components
import RouteItem from '../route-item/RouteItem';
import { HomeIcon, PlusIcon } from '../icons/Icons';
//#endregion

interface SideBarProps {
   boards: Board[];
   className?: string;
}

const SideBar: FC<SideBarProps> = ({ boards, className }) => {
   return (
      <aside
         className={`w-64 transition-transform absolute -translate-x-full lg:relative lg:translate-x-0 ${className}`}
         aria-label="Sidebar"
      >
         <div className="h-full w-[inherit] overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="px-3 py-4 font-medium flex flex-col gap-2">
               <RouteItem to="/" icon={<HomeIcon size={30} />} title="Home" />
               {boards.map(({ id, title }) => (
                  <RouteItem key={id} boardId={id} to={`/board/${id}`} title={title} />
               ))}
               <RouteItem
                  to="#new-board"
                  title="New board"
                  icon={<PlusIcon size={30} />}
                  className="bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-700 dark:bg-gray-900"
               />
            </ul>
         </div>
      </aside>
   );
};

export default SideBar;
