import { Task } from '../../types';
import { DragEvent, FC } from 'react';
import { updateData } from '../../plugins/firebase';
import { animations } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

import TaskItem from './taskItem';

interface TaskListProps {
   tasksData: Task[];
   statusId: string;
}

const TasksList: FC<TaskListProps> = ({ tasksData, statusId }) => {
   const [taskList, tasks] = useDragAndDrop<HTMLUListElement, Task>(tasksData, {
      group: 'tasks',
      dropZoneClass: 'border-dashed border-2 border-gray-300 opacity-50',
      plugins: [animations({ duration: 250 })]
   });

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
      <ul
         className="flex flex-col gap-4 h-full transition-all ease-in-out"
         data-parent-status-id={statusId}
         onDrop={handleDrop()}
         ref={taskList}
         role="card"
      >
         {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
         ))}
      </ul>
   );
};

export default TasksList;
