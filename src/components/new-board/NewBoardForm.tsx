import { FC } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../button/Button';
import Input from '../form-control/input/Input';
import { useBoardStore } from '../../store/board.store';

interface NewBoardFormProps {
   onReset?: () => void;
   onSave?: () => void;
}

type FormData = {
   boardName: string;
};

const NewBoardForm: FC<NewBoardFormProps> = ({ onReset, onSave }) => {
   const createBoard = useBoardStore((state) => state.createBoard);

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
         createBoard(data.boardName);
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
      <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(onSaveNewBoard)} onReset={onCancel}>
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
            <Button variant="outline" color="negative" type="reset">
               Cancel
            </Button>

            <Button variant="solid" color="primary" type="submit">
               save
            </Button>
         </div>
      </form>
   );
};

export default NewBoardForm;
