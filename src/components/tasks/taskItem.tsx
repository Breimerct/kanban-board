import { FC, HTMLAttributes } from 'react';
import { Subtask, Task } from '../../types';
import useGetCollection from '../../hooks/useGetCollection';

interface TaskItemProps extends HTMLAttributes<HTMLLIElement> {
   task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task, className, ...props }) => {
   const subtasks = useGetCollection({ path: `subtasks/${task.id}` }) as Subtask[];

   const subtasksCompleted = subtasks.filter((subtask) => subtask.isCompleted).length;
   const subtasksTotal = subtasks.length;

   return (
      <li
         {...props}
         className={`p-4 bg-gray-400 shadow-md rounded-md active:cursor-grabbing cursor-pointer transition-all ease-in-out ${className}`}
         data-task-status-id={task.statusId}
         data-task-id={task.id}
         role="card-section"
      >
         <div role="task-item" className="min-w-full pointer-events-none overflow-hidden">
            <header className="flex items-center justify-between">
               <h3 className="font-bold text-slate-700 text-lg break-all">{task.title}</h3>
            </header>
            {subtasksTotal <= 0 ? (
               <p className="text-sm text-gray-700 truncate">{task.description || 'No description'}</p>
            ) : (
               <p className="text-sm text-gray-600 flex flex-nowrap gap-1">
                  <span>
                     {subtasksCompleted} of {subtasksTotal} Subtasks
                  </span>
               </p>
            )}
         </div>
      </li>
   );
};

export default TaskItem;
