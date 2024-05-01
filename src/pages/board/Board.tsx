import { useParams } from 'react-router-dom';
import AddNewColumn from '../../components/add-new-column/AddNewColumn';
import Tasks from '../../components/tasks/Tasks';

type Status = {
   id: number;
   name: string;
   color: string;
};

const Board = () => {
   const { id } = useParams<{ id: string }>();

   const status: Record<string, Status[]> = {
      '1': [
         {
            id: 1,
            name: 'To Do',
            color: 'bg-red-500'
         },
         {
            id: 2,
            name: 'In Progress',
            color: 'bg-yellow-500'
         },
         {
            id: 3,
            name: 'Done',
            color: 'bg-green-500'
         },
         {
            id: 4,
            name: 'Review',
            color: 'bg-blue-500'
         }
      ]
   };

   return (
      <ul className="h-full p-4 flex flex-row gap-10 overflow-auto overflow-x-auto overflow-y-hidden">
         {id &&
            status[id]?.length &&
            status[id].map((statusItem) => (
               <li
                  role="card"
                  key={statusItem.id}
                  className="block max-h-[inherit] p-4 bg-gray-200 shadow-md rounded-md"
               >
                  <div role="card-item" className="w-80 min-w-full">
                     <header className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-500 text-lg">{statusItem.name}</h3>
                        <span className={`w-4 h-4 rounded-full ${statusItem?.color} dark:text-white`}></span>
                     </header>

                     <main className="mt-4">
                        <Tasks statusId={statusItem.id.toString()} />
                     </main>
                  </div>
               </li>
            ))}

         <AddNewColumn />
      </ul>
   );
};

export default Board;
