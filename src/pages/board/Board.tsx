import { useParams } from 'react-router-dom';

import AddNewColumn from '../../components/add-new-column/AddNewColumn';
import Column from '../../components/column/Column';
import { useEffect, useState } from 'react';
import { getDB } from '../../plugins/firebase';
import { Status } from '../../types/types';

const Board = () => {
   const { id } = useParams<{ id: string }>();
   const [statusData, setStatusData] = useState<[string, Status][]>([]);

   useEffect(() => {
      getDB(
         `statuses/${id}`,
         (snapshot) => {
            const statusData = snapshot.val() as Record<string, Status>;

            const statusDataArray = Object.entries(statusData || {});

            setStatusData(statusDataArray);
         },
         (error) => {
            console.log(error);
         }
      );
   }, [id]);

   return (
      <div className="h-full flex flex-col">
         <header className="p-4 pb-5 flex justify-end items-center">
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Add Task</button>
         </header>

         <div className="w-full h-full relative overflow-x-auto overflow-y-hidden scroll-smooth pb-4 mb-4">
            <ol className="h-full p-4 flex flex-row gap-10 overflow-x-auto overflow-y-hidden absolute top-0 left-0">
               {!!id &&
                  !!statusData?.length &&
                  statusData.map(([statusId, statusItem]) => <Column key={statusId} column={statusItem} />)}

               <AddNewColumn />
            </ol>
         </div>
      </div>
   );
};

export default Board;
