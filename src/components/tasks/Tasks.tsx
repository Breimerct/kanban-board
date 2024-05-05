import { DragEvent, FC, useEffect } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { Task } from '../../types';
import useGetCollection from '../../hooks/useGetCollection';
import { updateData } from '../../plugins/firebase';

interface TaskProps {
   statusId: string;
}

const Tasks: FC<TaskProps> = ({ statusId }) => {
   const tasksCollection = useGetCollection({
      path: `tasks/${statusId}`
   }) as Task[];

   const [taskList, tasks, setValues] = useDragAndDrop<HTMLOListElement, Task>(tasksCollection, {
      group: 'tasks',
      dropZoneClass: 'border-dashed border-2 border-gray-300 opacity-50',
      plugins: [animations({ duration: 250 })]
   });

   useEffect(() => {
      setValues(tasksCollection);
   }, [tasksCollection, setValues]);

   const handleDrop = () => async (event: DragEvent<HTMLUListElement>) => {
      const $liElement = event.target as HTMLLIElement;

      const { parentStatusId } = event.currentTarget.dataset;
      const { taskStatusId, taskId } = $liElement.dataset;

      if (!parentStatusId || parentStatusId === taskStatusId) {
         tasks.forEach((task, index) => {
            updateData(`tasks/${task.statusId}/${task.id}/orderNumber`, index + 1);
         });

         return;
      }

      const taskResult = tasks.find(({ id }) => id === taskId);

      if (!taskResult) return;

      const task = {
         ...taskResult,
         statusId: parentStatusId
      };

      const updated: Record<string, unknown> = {};

      updated[`tasks/${parentStatusId}/${taskId}`] = task;
      updated[`tasks/${taskStatusId}/${taskId}`] = null;

      updateData(updated);
   };

   return (
      <div className="flex-1 overflow-y-auto scroll-smooth pr-2">
         <ul
            className="flex flex-col gap-4 h-full transition-all ease-in-out"
            data-parent-status-id={statusId}
            onDrop={handleDrop()}
            ref={taskList}
            role="card"
         >
            {tasks.map((task, index) => (
               <li
                  className="p-4 bg-gray-400 shadow-md rounded-md active:cursor-grabbing cursor-grab transition-all ease-in-out"
                  id={`task-${index + 1}`}
                  data-task-id={task.id}
                  data-task-status-id={task.statusId}
                  role="card-section"
                  key={task.id}
               >
                  <div role="task-item" className="min-w-full pointer-events-none overflow-hidden">
                     <header className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-700 text-lg">{task.title}</h3>
                     </header>
                     <p className="text-sm text-slate-600 truncate">{task.description}</p>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Tasks;
