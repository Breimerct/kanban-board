import { FC, useState } from 'react';
import Modal from '../modal/Modal';
import { useTaskStore } from '../../store/task.store';
import useGetCollection from '../../hooks/useGetCollection';
import { Subtask } from '../../types';
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import { CancelIcon, EditIcon } from '../icons/Icons';
import { updateData } from '../../plugins/firebase';

interface TaskDetailProps {}

const SubTaskItem = ({ subtask, taskId }: { subtask: Subtask; taskId: string }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [title, setTitle] = useState(subtask.title);

   const handleToggleEdit = () => {
      setIsEditing((prev) => !prev);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData(`subtasks/${taskId}/${subtask.id}/isCompleted`, e.target.checked);
   };

   const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      // updateData(`subtasks/${taskId}/${subtask.id}/title`, e.target.value);
      console.log('update title', e.target.value);
      setTitle(e.target.value);
   };

   return (
      <div>
         <Input
            readOnly={!isEditing}
            value={title}
            className={`${subtask.isCompleted ? 'line-through' : ''}`}
            onChange={handleUpdateTitle}
            preppend={
               <input type="checkbox" checked={subtask.isCompleted} onChange={handleChange} className="w-5 h-5" />
            }
            append={
               !subtask.isCompleted && (
                  <div className="cursor-pointer" onClick={handleToggleEdit}>
                     {isEditing ? (
                        <CancelIcon className="w-6 h-6 text-gray-800" />
                     ) : (
                        <EditIcon className="w-6 h-6 text-gray-800" />
                     )}
                  </div>
               )
            }
         />
      </div>
   );
};

const TaskDetail: FC<TaskDetailProps> = () => {
   const task = useTaskStore((state) => state.task);
   const setTask = useTaskStore((state) => state.setTask);
   const subtasks = useGetCollection({ path: `subtasks/${task?.id}` }) as Subtask[];
   const navigate = useNavigate();

   const handleCloseModal = () => {
      setTask(null);
      navigate({ hash: '' });
   };

   return (
      <Modal
         title="Task"
         isOpen={!!task}
         onClose={handleCloseModal}
         classNameModalContent="max-w-2xl"
         buttonSuccessClassName="hidden"
         buttonCancelText="close"
         buttonCancelClassName="!rounded-full !py-2"
      >
         {task && (
            <div className="p-14 w-full">
               <h1 className="text-3xl text-gray-900 font-bold break-all">{task.title}</h1>
               <p className="text-xl text-gray-800 break-all mt-6">{task.description}</p>

               <div className="mt-10 flex flex-col gap-3">
                  {subtasks.map((subtask) => (
                     <SubTaskItem key={subtask.id} subtask={subtask} taskId={task.id} />
                  ))}
               </div>
            </div>
         )}
      </Modal>
   );
};

export default TaskDetail;
