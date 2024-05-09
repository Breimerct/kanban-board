import { FC } from 'react';
import { updateData } from '../../plugins/firebase';
import { ButtonVariant, Subtask, ThemeColor } from '../../types';

import ContentEditable from '../content-editable/ContentEditable';
import { TrashIcon } from '../icons/Icons';
import Button from '../button/Button';

interface SubTaskItemProps {
   subtask: Subtask;
   taskId: string;
}

const SubTaskItem: FC<SubTaskItemProps> = ({ subtask, taskId }) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData(`subtasks/${taskId}/${subtask.id}/isCompleted`, e.target.checked);
   };

   const editSubtaskTitle = (text: string) => {
      updateData(`subtasks/${taskId}/${subtask.id}/title`, text);
   };

   const handleDeleteSubtask = () => {
      updateData(`subtasks/${taskId}/${subtask.id}`, null);
   };

   return (
      <div className="relative gap-2 text-gray-800">
         <input
            type="checkbox"
            checked={subtask.isCompleted}
            onChange={handleChange}
            className="absolute left-2 top-[50%] translate-y-[-60%] z-10 w-5 h-5"
         />

         <Button
            variant={ButtonVariant.SOLID}
            color={ThemeColor.NEGATIVE}
            onClick={handleDeleteSubtask}
            className="absolute right-2 top-[50%] translate-y-[-60%] !p-1 rounded-full z-10 !w-7 !h-7 !animate-none"
            icon={<TrashIcon size={20} />}
         />

         <ContentEditable
            onSave={editSubtaskTitle}
            text={subtask.title}
            disabled={subtask.isCompleted}
            className={`!text-lg !w-full !h-full !px-9 rounded-md border border-gray-400 ${subtask.isCompleted ? 'line-through text-gray-500/80' : ''}`}
         />
      </div>
   );
};

export default SubTaskItem;
