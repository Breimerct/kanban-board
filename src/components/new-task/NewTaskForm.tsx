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
//#endregion

export type FormDataTask = {
   title: string;
   description: string;
   status: string;
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

   const defaultValues: FormDataTask = {
      title: '',
      description: '',
      status: ''
   };

   const schema = yup
      .object({
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
         status: yup.string().trim().required('Status is required')
      })
      .required();

   const resolver = yupResolver(schema);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm<FormDataTask>({ defaultValues, resolver });

   const onSubmit = (data: FormDataTask) => {
      onSaved?.(data);
   };

   const handleReset = () => {
      reset();
      onReset?.();
   };

   return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
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

         <div className="form-group">
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

         <div className="form-group">
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

         <div className="flex justify-center items-center gap-4">
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
