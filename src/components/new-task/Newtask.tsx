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
   const [statuses, setStatuses] = useState<Status[]>([]);
   const { id: boardId } = useParams<{ id: string }>();
   const statusData = useGetCollection({ path: `statuses/${boardId}` }) as [string, Status][];

   useEffect(() => {
      setShowNewTask(isOpen);
   }, [isOpen]);

   useEffect(() => {
      setStatuses(statusData.map(([id, status]) => ({ ...status, id })));
   }, [statusData]);

   const onSubmit = (data: FormDataTask) => {
      const id = crypto.randomUUID();
      const newTask = {
         id,
         title: data.title,
         description: data.description,
         status: data.status
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
