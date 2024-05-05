import { FC } from 'react';
import { ThemeColor, ButtonVariant } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '../input/Input';
import Button from '../button/Button';
import { setDB } from '../../plugins/firebase';

interface NewColumnFormProps {
   boardId?: string;
   onSave?: () => void;
   onReset?: () => void;
}

type FormData = {
   title: string;
   color: string;
};

const NewColumnForm: FC<NewColumnFormProps> = ({ boardId, onReset, onSave }) => {
   const defaultValues: FormData = {
      title: '',
      color: '#000000'
   };

   const schema = yup
      .object({
         title: yup
            .string()
            .trim()
            .min(3, 'Column title must be at least 3 characters')
            .max(50, 'Column title must be at most 50 characters')
            .required('Column title is required'),
         color: yup.string().trim().required('Column color is required')
      })
      .required();

   const resolver = yupResolver(schema);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm<FormData>({ defaultValues, resolver });

   const onSubmit = async ({ title, color }: FormData) => {
      try {
         setDB(`statuses/${boardId}`, {
            boardId,
            title,
            color
         });
         onSave?.();
      } catch (error) {
         console.error(error);
      }
   };

   const handleReset = () => {
      reset();
      onReset?.();
   };

   return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
         <div>
            <Input
               {...register('title')}
               label="Title"
               isError={!!errors.title}
               errorMessage={errors.title?.message}
               type="text"
               placeholder='e.g. "To Do"'
            />
         </div>

         <div>
            <Input
               {...register('color')}
               label="Color"
               isError={!!errors.color}
               errorMessage={errors.color?.message}
               type="color"
               className="h-14"
            />
         </div>

         <div className="flex gap-2 justify-end mt-2">
            <Button variant={ButtonVariant.OUTLINE} color={ThemeColor.NEGATIVE} type="reset">
               Cancel
            </Button>
            <Button variant={ButtonVariant.SOLID} color={ThemeColor.PRIMARY} type="submit">
               save
            </Button>
         </div>
      </form>
   );
};

export default NewColumnForm;
