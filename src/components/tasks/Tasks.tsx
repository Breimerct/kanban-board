import { FC } from 'react';

interface TaskProps {
   statusId: string;
}

type Task = {
   id: number;
   title: string;
   description: string;
   statusId: string;
};

const Tasks: FC<TaskProps> = ({ statusId }) => {
   const tasks: Record<string, Task[]> = {
      '1': [
         {
            id: 1,
            title: 'Task 1',
            description: 'Description 1',
            statusId: '1'
         },
         {
            id: 2,
            title: 'Task 2',
            description: 'Description 2',
            statusId: '1'
         },
         {
            id: 3,
            title: 'Task 3',
            description: 'Description 3',
            statusId: '1'
         }
      ],
      '2': [
         {
            id: 4,
            title: 'Task 4',
            description: 'Description 4',
            statusId: '2'
         },
         {
            id: 5,
            title: 'Task 5',
            description: 'Description 5',
            statusId: '2'
         },
         {
            id: 6,
            title: 'Task 6',
            description: 'Description 6',
            statusId: '2'
         }
      ],
      '3': [
         {
            id: 7,
            title: 'Task 7',
            description: 'Description 7',
            statusId: '3'
         },
         {
            id: 8,
            title: 'Task 8',
            description: 'Description 8',
            statusId: '3'
         },
         {
            id: 9,
            title: 'Task 9',
            description: 'Description 9',
            statusId: '3'
         }
      ],
      '4': [
         {
            id: 10,
            title: 'Task 10',
            description: 'Description 10',
            statusId: '4'
         },
         {
            id: 11,
            title: 'Task 11',
            description: 'Description 11',
            statusId: '4'
         },
         {
            id: 12,
            title: 'Task 12',
            description: 'Description 12',
            statusId: '4'
         }
      ]
   };

   return (
      <ul className="flex flex-col gap-4">
         {tasks[statusId]?.length &&
            tasks[statusId].map((task) => (
               <li role="task" key={task.id} className="block max-h-[inherit] p-4 bg-gray-400 shadow-md rounded-md">
                  <div role="task-item" className="w-80 min-w-full">
                     <header className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-700 text-lg">{task.title}</h3>
                     </header>
                     <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
               </li>
            ))}
      </ul>
   );
};

export default Tasks;
