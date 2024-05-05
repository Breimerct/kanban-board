import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { FC, useEffect } from 'react';
import AddNewColumn from '../add-new-column/AddNewColumn';
import Column from '../column/Column';
import { Status } from '../../types';
import { animations } from '@formkit/drag-and-drop';
import { updateData } from '../../plugins/firebase';

interface StatusListProps {
   boardId?: string;
   statuses: Status[];
}

const StatusList: FC<StatusListProps> = ({ statuses, boardId }) => {
   const [statusList, statusData, setValues] = useDragAndDrop<HTMLUListElement, Status>(statuses, {
      dropZoneClass: 'boarder-dashed border-2 border-gray-300 rounded-md opacity-50',
      plugins: [animations({ duration: 250 })],
      draggable: (el) => {
         return !el.classList.contains('no-drag');
      }
   });

   useEffect(() => {
      setValues(statuses);
   }, [statuses, setValues]);

   const handleDrop = () => {
      statusData.forEach(({ id }, index) => {
         updateData(`statuses/${boardId}/${id}/orderNumber`, index + 1);
      });
   };

   return (
      <ul
         ref={statusList}
         className="h-full p-4 flex flex-row gap-10 overflow-x-auto overflow-y-hidden absolute top-0 left-0"
         onDrop={handleDrop}
      >
         {statusData.map((statusItem) => (
            <Column key={statusItem.id} column={statusItem} />
         ))}

         <AddNewColumn className="no-drag" />
      </ul>
   );
};

export default StatusList;
