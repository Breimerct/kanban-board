import { FC, useState } from 'react';
import { updateData } from '../../plugins/firebase';
import { Subtask } from '../../types';

import { CancelIcon, EditIcon } from '../icons/Icons';
import Input from '../form-control/input/Input';

interface SubTaskItemProps {
   subtask: Subtask;
   taskId: string;
}

const SubTaskItem: FC<SubTaskItemProps> = ({ subtask, taskId }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [title, setTitle] = useState(subtask.title);

   const handleToggleEdit = () => {
      console.log('toggle edit', subtask.title);
      setIsEditing(!isEditing);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData(`subtasks/${taskId}/${subtask.id}/isCompleted`, e.target.checked);
      setIsEditing(false);
   };

   const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      // updateData(`subtasks/${taskId}/${subtask.id}/title`, e.target.value);
      console.log('update title', e.target.value);
      setTitle(e.target.value);
   };

   return (
      <div>
         <Input
            id={`task-${taskId}`}
            readOnly={!isEditing || subtask.isCompleted}
            value={title}
            className={`${subtask.isCompleted ? 'line-through' : ''}`}
            onChange={handleUpdateTitle}
            preppend={
               <label>
                  <input type="checkbox" checked={subtask.isCompleted} onChange={handleChange} className="w-5 h-5" />
               </label>
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

export default SubTaskItem;
