import { FC } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeColor, ButtonVariant } from '../../types';
import useCurrentUser from '../../hooks/useCurrentUser';
import { setDB } from '../../plugins/firebase';

import Button from '../button/Button';
import Input from '../input/Input';

interface NewBoardFormProps {
   onReset?: () => void;
   onSave?: () => void;
}

type FormData = {
   boardName: string;
};

const NewBoardForm: FC<NewBoardFormProps> = ({ onReset, onSave }) => {
   const { currentUser } = useCurrentUser();

   const defaultValues = {
      boardName: ''
   };

   const schema = yup
      .object({
         boardName: yup
            .string()
            .trim()
            .min(3, 'Board name must be at least 3 characters')
            .max(50, 'Board name must be at most 50 characters')
            .required('Board name is required')
      })
      .required();

   const resolver = yupResolver(schema);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm<FormData>({ defaultValues, resolver });

   const onSaveNewBoard = async (data: FormData) => {
      try {
         const id = crypto.randomUUID();

         await setDB(`boards/${id}`, {
            title: data.boardName,
            userId: currentUser?.uid
         });
         onSave && onSave();
      } catch (error) {
         console.error(error);
      }
   };

   const onCancel = () => {
      reset();
      onReset && onReset();
   };

   return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSaveNewBoard)} onReset={onCancel}>
         <div>
            <Input
               {...register('boardName')}
               label="Board Name"
               isError={!!errors.boardName}
               errorMessage={errors.boardName?.message}
               type="text"
               id="boardName"
               placeholder='e.g. "Project Management"'
            />
         </div>

         <div className="flex gap-2 justify-end">
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

export default NewBoardForm;
