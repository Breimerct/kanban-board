import { DragEvent, FC, useEffect } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { Task } from '../../types';
import useGetCollection from '../../hooks/useGetCollection';
import { updateData } from '../../plugins/firebase';
import TaskItem from './taskItem';
import { useTaskStore } from '../../store/task.store';
import { useNavigate } from 'react-router-dom';

interface TaskProps {
   statusId: string;
}

const Tasks: FC<TaskProps> = ({ statusId }) => {
   const setTask = useTaskStore((state) => state.setTask);
   const navigate = useNavigate();
   const tasksCollection = useGetCollection({
      path: `tasks/${statusId}`
   }) as Task[];

   const [taskList, tasks, setValues] = useDragAndDrop<HTMLUListElement, Task>([], {
      group: 'tasks',
      dropZoneClass: 'border-dashed border-2 border-gray-300 opacity-50',
      plugins: [animations()]
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

   const handleClickedTask = (task: Task) => {
      setTask(task);
      navigate({ hash: `#task*${task.id}` });
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
            {tasks.map((task) => (
               <TaskItem key={task.id} task={task} onSelectTask={handleClickedTask} />
            ))}
         </ul>
      </div>
   );
};

export default Tasks;
