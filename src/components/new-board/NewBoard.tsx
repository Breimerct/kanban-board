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

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   return (
      <Modal hideActions title="New Board" onClose={handleClose} isOpen={showModal}>
         <NewBoardForm onSave={handleClose} onReset={handleClose} />
      </Modal>
   );
};

export default NewBoard;
