import { FC, useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import NewBoardForm from './NewBoardForm';

interface NewBoardProps {
   isOpen: boolean;
   onClose?: () => void;
}

const NewBoard: FC<NewBoardProps> = ({ isOpen, onClose }) => {
   const [showModal, setShowModal] = useState(isOpen);

   const handleClose = () => {
      setShowModal(false);
      if (onClose) onClose();
   };

   const handleSubmit = () => {
      handleClose();
   };

   const handleCancel = () => {
      handleClose();
   };

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   return (
      <Modal hideActions title="New Board" onClose={handleClose} isOpen={showModal}>
         <NewBoardForm onSave={handleSubmit} onReset={handleCancel} />
      </Modal>
   );
};

export default NewBoard;
