import { FC, useEffect } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { Task } from '../../types';
import useGetCollection from '../../hooks/useGetCollection';

interface TaskProps {
   statusId: string;
}

const Tasks: FC<TaskProps> = ({ statusId }) => {
   const tasksCollection = useGetCollection({ path: `tasks/${statusId}` }) as [string, Task][];

   const [taskList, tasks, setValues] = useDragAndDrop<HTMLOListElement, [string, Task]>(tasksCollection, {
      group: 'tasks',
      plugins: [animations()],
      dropZoneClass: 'border-dashed border-slate-500 border-2 opacity-50',
      draggingClass: 'border-slate-900 cursor-grabbing shadow-lg opacity-100 z-50'
   });

   useEffect(() => {
      setValues(tasksCollection);
   }, [tasksCollection, setValues]);

   return (
      <div className="flex-1 overflow-y-auto scroll-smooth pr-2">
         <ol data-status-id={statusId} className="flex flex-col gap-4 h-full transition-all ease-in-out" ref={taskList}>
            {!!tasks?.length &&
               tasks.map(([taskId, task]) => (
                  <li
                     role="task"
                     data-task-id={taskId}
                     key={taskId}
                     className="p-4 bg-gray-400 shadow-md rounded-md active:cursor-grabbing cursor-grab transition-all ease-in-out"
                  >
                     <div role="task-item" className="min-w-full pointer-events-none overflow-hidden">
                        <header className="flex items-center justify-between">
                           <h3 className="font-bold text-slate-700 text-lg">{task.title}</h3>
                        </header>
                        <p className="text-sm text-slate-600 truncate">{task.description}</p>
                     </div>
                  </li>
               ))}
         </ol>
      </div>
   );
};

export default Tasks;
