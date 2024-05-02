import { FC, useEffect, useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { getDB } from '../../plugins/firebase';
import { Task } from '../../types';

interface TaskProps {
   statusId: string;
}

const Tasks: FC<TaskProps> = ({ statusId }) => {
   const [tasksData, setTasksData] = useState<[string, Task][]>([]);

   useEffect(() => {
      getDB(
         `tasks/${statusId}`,
         (snapshot) => {
            const _tasksData = snapshot.val() as Record<string, Task>;
            const tasksDataArray = Object.entries(_tasksData || {});

            setTasksData(tasksDataArray);
         },
         (error) => {
            console.log(error);
         }
      );
   }, [statusId]);

   const [taskList, tasks, setValues] = useDragAndDrop<HTMLOListElement, [string, Task]>(tasksData, {
      group: 'tasks',
      plugins: [animations()],
      dropZoneClass: 'border-dashed border-slate-500 border-2 opacity-50',
      draggingClass: 'border-slate-900 cursor-grabbing shadow-lg opacity-100 z-50'
   });

   useEffect(() => {
      setValues(tasksData);
   }, [tasksData, setValues]);

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
                     <div role="task-item" className="min-w-full pointer-events-none">
                        <header className="flex items-center justify-between">
                           <h3 className="font-bold text-slate-700 text-lg">{task.title}</h3>
                        </header>
                        <p className="text-sm text-slate-600">{task.description}</p>
                     </div>
                  </li>
               ))}
         </ol>
      </div>
   );
};

export default Tasks;
