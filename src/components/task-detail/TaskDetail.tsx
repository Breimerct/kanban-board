import { FC, useEffect } from 'react';
import useGetCollection from '../../hooks/useGetCollection';
import { useTaskStore } from '../../store/task.store';
import { useNavigate, useParams } from 'react-router-dom';
import { Status, Subtask, Task } from '../../types';

import NewTaskFormInput from './NewTaskFormInput';
import Modal from '../modal/Modal';
import SubTaskItem from './SubTaskItem';
import ContentEditable from '../content-editable/ContentEditable';
import { updateData } from '../../plugins/firebase';
import useGetOne from '../../hooks/useGetOne';

interface TaskDetailProps {}

const TaskDetail: FC<TaskDetailProps> = () => {
   const { id: boardId } = useParams<{ id: string }>();
   const storeTask = useTaskStore((state) => state.task);
   const setTask = useTaskStore((state) => state.setTask);
   const task = useGetOne({ path: `tasks/${storeTask?.statusId}/${storeTask?.id}` }) as Task;
   const status = useGetOne({ path: `statuses/${boardId}/${storeTask?.statusId}` }) as Status;
   const subtasks = useGetCollection({ path: `subtasks/${storeTask?.id}` }) as Subtask[];
   const navigate = useNavigate();

   useEffect(() => {
      if (!task) return;
      setTask(task);
   }, [task, setTask]);

   const handleCloseModal = () => {
      setTask(null);
      navigate({ hash: '' });
   };

   const updateTask = (property: string) => (value: string) => {
      updateData(`tasks/${storeTask?.statusId}/${storeTask?.id}/${property}`, value);
   };

   return (
      <Modal
         isOpen={!!storeTask}
         onClose={handleCloseModal}
         classNameModalContent="!max-w-5xl"
         buttonSuccessClassName="hidden"
         buttonCancelText="close"
         buttonCancelClassName="!rounded-full !py-2"
      >
         {storeTask && (
            <div className="p-12 w-full" style={{ borderTopColor: status?.color, borderTopWidth: 6 }}>
               <ContentEditable
                  onSave={updateTask('title')}
                  text={storeTask.title}
                  className="text-3xl py-2 text-gray-900 font-bold"
               />
               <ContentEditable
                  onSave={updateTask('description')}
                  text={storeTask.description}
                  className="text-xl py-2 text-gray-800"
               />

               <div className="mt-10 flex flex-col gap-3 px-2">
                  <NewTaskFormInput taskId={storeTask.id} />
                  <div className="flex flex-col gap-3 pb-10 min-h-60 max-h-80 overflow-y-auto">
                     {subtasks.map((subtask) => (
                        <SubTaskItem key={subtask.id} subtask={subtask} taskId={storeTask.id} />
                     ))}
                  </div>
               </div>
            </div>
         )}
      </Modal>
   );
};

export default TaskDetail;
