//#region Imports
import { FC, useEffect, useState } from 'react';
import { ThemeColor, ButtonVariant, Status } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

//#region Imports components
import Button from '../button/Button';
import Input from '../input/Input';
import Select from '../select/Select';
import Textarea from '../textarea/Textarea';
import Subtasks from './SubTasks';
//#endregion

export type FormDataTask = {
   title: string;
   description: string;
   status: string;
   subtasks?: { title?: string }[];
};

interface NewTaskFormProps {
   onSaved?: (data: FormDataTask) => void;
   onReset?: () => void;
   optionsSelectStatus: Status[];
}

const NewTaskForm: FC<NewTaskFormProps> = ({ onReset, onSaved, optionsSelectStatus }) => {
   const [statuses, setStatuses] = useState<Status[]>(optionsSelectStatus);

   useEffect(() => {
      setStatuses(optionsSelectStatus);
   }, [optionsSelectStatus]);

   const defaultValues = {
      title: '',
      description: '',
      status: '',
      subtasks: []
   };

   const schema = yup.object({
      title: yup
         .string()
         .trim()
         .min(3, 'Board name must be at least 3 characters')
         .max(50, 'Board name must be at most 50 characters')
         .required('Board name is required'),
      description: yup
         .string()
         .trim()
         .min(3, 'Description must be at least 3 characters')
         .max(250, 'Description must be at most 500 characters')
         .required('Description is required'),
      status: yup.string().trim().required('Status is required'),
      subtasks: yup.array().of(
         yup.object({
            title: yup
               .string()
               .trim()
               .min(3, 'Subtask name must be at least 3 characters')
               .max(50, 'Subtask name must be at most 50 characters')
               .optional()
         })
      )
   });

   const resolver = yupResolver(schema);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm<FormDataTask>({ defaultValues, resolver });

   const onSubmit = handleSubmit((data) => {
      onSaved?.(data);
   });

   const handleReset = () => {
      reset();
      onReset?.();
   };

   return (
      <form className="p-4 flex flex-col gap-2 h-full" onSubmit={onSubmit} onReset={handleReset}>
         <div className="flex flex-col gap-2 overflow-y-auto pr-4 h-full">
            <div className="form-group">
               <Input
                  {...register('title')}
                  label="Title"
                  isError={!!errors.title?.message}
                  errorMessage={errors.title?.message}
                  placeholder="e.g. 'Task 1"
                  type="text"
                  id="taskName"
               />
            </div>

            <div>
               <Textarea
                  {...register('description')}
                  label="Task Description"
                  isError={!!errors.description?.message}
                  errorMessage={errors.description?.message}
                  placeholder='e.g "This task is about..."'
                  id="taskDescription"
                  rows={3}
               ></Textarea>
            </div>

            <div>
               <Select
                  {...register('status')}
                  label="Status"
                  isError={!!errors.status?.message}
                  errorMessage={errors.status?.message}
                  options={statuses}
                  defaultOption="Select a status"
                  displayValue="title"
                  returnValueKey="id"
                  id="status"
               ></Select>
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
               <Subtasks register={register} errors={errors} />
            </div>
         </div>

         <div className="flex justify-center items-center gap-4 mt-4">
            <Button
               variant={ButtonVariant.OUTLINE}
               color={ThemeColor.NEGATIVE}
               type="reset"
               className="block w-full rounded-3xl"
            >
               cancel
            </Button>
            <Button
               variant={ButtonVariant.SOLID}
               color={ThemeColor.PRIMARY}
               type="submit"
               className="block w-full rounded-3xl"
            >
               Add Task
            </Button>
         </div>
      </form>
   );
};

export default NewTaskForm;
