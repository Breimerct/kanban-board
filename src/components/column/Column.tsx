import { FC, useEffect, useRef } from 'react';

import Tasks from '../tasks/Tasks';
import { Status } from '../../types/types';

interface ColumnProps {
   column: Status;
}

const Column: FC<ColumnProps> = ({ column }) => {
   const circle = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      const bgClass = `bg-[${column?.color.toString().toUpperCase()}]`;

      circle && circle?.current?.classList.add(bgClass);
   }, [column?.color, circle]);

   return (
      <li className="p-4 bg-gray-200 shadow-md rounded-md">
         <div className="w-80 h-full overflow-hidden flex flex-col gap-4">
            <header className="flex items-center justify-between">
               <h3 className="font-bold text-gray-500 text-lg">{column?.title}</h3>
               <span ref={circle} className={`w-4 h-4 rounded-full`}></span>
            </header>

            <Tasks statusId={column.id} />
         </div>
      </li>
   );
};

export default Column;
