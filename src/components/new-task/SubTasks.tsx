import { FC, useState } from 'react';
import { FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type FormDataTask } from './NewTaskForm';

import Button from '../button/Button';
import { MinusIcon, PlusIcon } from '../icons/Icons';
import Input from '../form-control/input/Input';

interface SubtasksProps {
   register: UseFormRegister<FormDataTask>;
   errors: FieldErrors<FormDataTask>;
}

const Subtasks: FC<SubtasksProps> = ({ errors, register }) => {
   const [subtasksNumber, setSubtasksNumber] = useState(1);

   return (
      <>
         <header className="flex justify-between items-center py-2">
            <h2 className="font-bold text-gray-800">Subtasks</h2>

            <div className="flex gap-4">
               <Button
                  type="button"
                  color="primary"
                  variant="outline"
                  disabled={subtasksNumber === 10}
                  className="!rounded-full !p-0 h-8 w-8"
                  onClick={() => setSubtasksNumber((prev) => prev + 1)}
                  icon={<PlusIcon className="w-4 h-4" />}
               />

               <Button
                  type="button"
                  color="primary"
                  variant="outline"
                  disabled={subtasksNumber === 0}
                  className="!rounded-full !p-0 h-8 w-8"
                  onClick={() => setSubtasksNumber((prev) => Math.max(0, prev - 1))}
                  icon={<MinusIcon className="w-4 h-4" />}
               />
            </div>
         </header>

         <div className="flex flex-col gap-3 max-h-60 overflow-y-auto mt-2">
            {Array.from({ length: subtasksNumber }).map((_, index) => (
               <div key={index}>
                  <Input
                     {...register(`subtasks.${index}.title` as const)}
                     label=""
                     isError={!!errors.subtasks?.[index]?.title?.message}
                     errorMessage={errors.subtasks?.[index]?.title?.message}
                     placeholder="e.g. 'Subtask 1'"
                     type="text"
                     id={`subtask-${index}`}
                  />
               </div>
            ))}
         </div>
      </>
   );
};

export default Subtasks;
