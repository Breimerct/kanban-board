import { Board } from '../../types/types';
import { FC } from 'react';
import RouteItem from '../route-item/RouteItem';

interface SideBarProps {
   boards: [string, Board][];
   className?: string;
}

const SideBar: FC<SideBarProps> = ({ boards, className }) => {
   return (
      <aside
         className={`w-64 transition-transform absolute -translate-x-full lg:relative lg:translate-x-0 ${className}`}
         aria-label="Sidebar"
      >
         <div className="h-full w-[inherit] overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="px-3 py-4 font-medium">
               {boards.map(([boardId, board]) => (
                  <RouteItem key={boardId} boardId={boardId} title={board.title} />
               ))}
               <RouteItem boardId="" title="add new board" />
            </ul>
         </div>
      </aside>
   );
};

export default SideBar;
