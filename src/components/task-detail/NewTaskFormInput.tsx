import { ButtonVariant, ThemeColor } from '../../types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PlusIcon } from '../icons/Icons';
import Button from '../button/Button';
import Input from '../form-control/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';

const NewTaskFormInput = () => {
   const defaultValues = { title: '' };

   const schema = yup.object({
      title: yup
         .string()
         .trim()
         .required('Subtask title is required')
         .min(3, 'Subtask title must be at least 3 characters')
         .max(50, 'Subtask title must not exceed 50 characters')
   });

   const resolver = yupResolver(schema);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      reset
   } = useForm({ defaultValues, resolver });

   const onsubmit = handleSubmit((data) => console.log(data));

   const onBlur = () => {
      const { title } = getValues();

      if (errors.title?.message && !title) {
         reset();
      }
   };

   return (
      <form onSubmit={onsubmit}>
         <div>
            <Input
               {...register('title')}
               placeholder="e.g. New Task"
               errorMessage={errors.title?.message}
               isError={!!errors.title?.message}
               onBlur={onBlur}
               append={
                  <Button
                     className={`!p-0 !rounded-full w-7 h-7 ${errors.title?.message ? 'outline-red-500 text-red-500 hover:text-white hover:bg-red-500' : 'bg-primary'}`}
                     variant={ButtonVariant.OUTLINE}
                     icon={<PlusIcon size={20} />}
                     color={ThemeColor.PRIMARY}
                     type="submit"
                  />
               }
            />
         </div>
      </form>
   );
};

export default NewTaskFormInput;
