//#region Imports
import { FC, useEffect, useState } from 'react';
import { Status } from '../../types';
import { useParams } from 'react-router-dom';
import { getDB, setDB } from '../../plugins/firebase';

//#region; // Imports components
import Modal from '../modal/Modal';
import NewTaskForm, { FormDataTask } from './NewTaskForm';

interface NewTaskProps {
   isOpen: boolean;
   onClose?: () => void;
}

const NewTask: FC<NewTaskProps> = ({ isOpen, onClose }) => {
   const [showNewTask, setShowNewTask] = useState(isOpen);
   const [statuses, setStatuses] = useState<Status[]>([]);
   const { id: boardId } = useParams<{ id: string }>();

   useEffect(() => {
      setShowNewTask(isOpen);
   }, [isOpen]);

   useEffect(() => {
      getDB(
         `statuses/${boardId}`,
         (snapshot) => {
            const statusData = snapshot.val() as Record<string, Status>;

            const statusDataArray = Object.entries(statusData || {}).map(([key, value]) => ({ ...value, id: key }));
            setStatuses(statusDataArray);
         },
         (error) => {
            console.log(error);
         }
      );
   }, [boardId]);

   const onSubmit = (data: FormDataTask) => {
      console.log(data);
      const id = crypto.randomUUID();
      setDB(`tasks/${data.status}/${id}`, {
         title: data.title,
         description: data.description,
         id
      });
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
