import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

//#region  Import components
import Modal from '../modal/Modal';
import NewColumnForm from './NewColumnForm';
//#endregion

interface NewColumnProps {
   onClose?: () => void;
}

const NewColumn: FC<NewColumnProps> = ({ onClose }) => {
   const { hash: routeHash } = useLocation();
   const [showNewColumn, setShowNewColumn] = useState(false);
   const { id: boardId } = useParams<{ id: string }>();

   const handleOnClose = () => {
      setShowNewColumn(false);
      onClose?.();
   };

   useEffect(() => {
      const isNewColumnRoute = routeHash === '#new-column';

      setShowNewColumn(isNewColumnRoute);
   }, [routeHash]);

   return (
      <Modal hideActions isOpen={showNewColumn} title="New column Status" onClose={handleOnClose}>
         <NewColumnForm onSave={handleOnClose} onReset={handleOnClose} boardId={boardId} />
      </Modal>
   );
};

export default NewColumn;
