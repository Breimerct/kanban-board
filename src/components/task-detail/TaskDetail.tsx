import { FC } from 'react';
import useGetCollection from '../../hooks/useGetCollection';
import { useTaskStore } from '../../store/task.store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Status, Subtask } from '../../types';

import NewTaskFormInput from './NewTaskFormInput';
import Modal from '../modal/Modal';
import SubTaskItem from './SubTaskItem';
import ContentEditable from '../content-editable/ContentEditable';
import { updateData } from '../../plugins/firebase';
import useGetOne from '../../hooks/useGetOne';

interface TaskDetailProps {}

const TaskDetail: FC<TaskDetailProps> = () => {
   const { id: boardId } = useParams<{ id: string }>();
   const { hash: routehash } = useLocation();
   const navigate = useNavigate();

   const task = useTaskStore((state) => state.task);
   const setTask = useTaskStore((state) => state.setTask);
   const status = useGetOne({ path: `statuses/${boardId}/${task?.statusId}` }) as Status;
   const subtasks = useGetCollection({ path: `subtasks/${task?.id}` }) as Subtask[];

   const handleCloseModal = () => {
      setTask(null);
      navigate({ hash: '' });
   };

   const updateTask = (property: string) => (value: string) => {
      updateData(`tasks/${task?.statusId}/${task?.id}/${property}`, value);
   };

   return (
      <Modal
         isOpen={routehash === `#task*${task?.id}`}
         onClose={handleCloseModal}
         classNameModalContent="!max-w-5xl"
         buttonSuccessClassName="hidden"
         buttonCancelText="close"
         buttonCancelClassName="!rounded-full !py-2"
      >
         {task && (
            <div className="p-12 w-full" style={{ borderTopColor: status?.color, borderTopWidth: 6 }}>
               <ContentEditable
                  onSave={updateTask('title')}
                  text={task.title}
                  className="text-3xl py-2 text-gray-900 font-bold"
               />
               <ContentEditable
                  onSave={updateTask('description')}
                  text={task.description}
                  className="text-xl py-2 text-gray-800"
               />

               <div className="mt-10 flex flex-col gap-3 px-2">
                  <NewTaskFormInput taskId={task.id} />
                  <div className="flex flex-col gap-3 pb-10 min-h-60 max-h-80 overflow-y-auto">
                     {subtasks.map((subtask) => (
                        <SubTaskItem key={subtask.id} subtask={subtask} taskId={task.id} />
                     ))}
                  </div>
               </div>
            </div>
         )}
      </Modal>
   );
};

export default TaskDetail;
