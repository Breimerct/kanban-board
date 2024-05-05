import { FC } from 'react';

import Tasks from '../tasks/Tasks';
import { Status } from '../../types';

interface ColumnProps extends React.HtmlHTMLAttributes<HTMLLIElement> {
   column: Status;
}

const Column: FC<ColumnProps> = ({ column, ...props }) => {
   return (
      <li {...props} className="p-4 bg-gray-200 shadow-md rounded-md">
         <div className="w-80 h-full overflow-hidden flex flex-col gap-4">
            <header className="flex items-center justify-between">
               <h3 className="font-bold text-gray-500 text-lg capitalize">{column?.title}</h3>
               <span className={`w-4 h-4 rounded-full`} style={{ backgroundColor: column.color }}></span>
            </header>

            <Tasks statusId={column.id} />
         </div>
      </li>
   );
};

export default Column;
