//#region Imports
import { FC, useEffect, useState } from 'react';
import { Status } from '../../types';
import { useParams } from 'react-router-dom';
import { setDB } from '../../plugins/firebase';

//#region; // Imports components
import Modal from '../modal/Modal';
import NewTaskForm, { FormDataTask } from './NewTaskForm';
import useGetCollection from '../../hooks/useGetCollection';

interface NewTaskProps {
   isOpen: boolean;
   onClose?: () => void;
}

const NewTask: FC<NewTaskProps> = ({ isOpen, onClose }) => {
   const [showNewTask, setShowNewTask] = useState(isOpen);
   const { id: boardId } = useParams<{ id: string }>();
   const statuses = useGetCollection({ path: `statuses/${boardId}` }) as Status[];

   useEffect(() => {
      setShowNewTask(isOpen);
   }, [isOpen]);

   const onSubmit = (data: FormDataTask) => {
      const id = crypto.randomUUID();
      const newTask = {
         id,
         statusId: data.status,
         title: data.title,
         description: data.description
      };

      setDB(`tasks/${data.status}/${id}`, newTask);
      handleReset();
   };

   const handleReset = () => {
      onClose?.();
      setShowNewTask(false);
   };

   return (
      <Modal hideActions isOpen={showNewTask} title="New Task">
         <NewTaskForm onReset={handleReset} onSaved={onSubmit} optionsSelectStatus={statuses} />
      </Modal>
   );
};

export default NewTask;
