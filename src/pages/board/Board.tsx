// imports
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeColor, ButtonVariant, Status } from '../../types';

//#region imports components
import AddNewColumn from '../../components/add-new-column/AddNewColumn';
import { PlusIcon } from '../../components/icons/Icons';
import Column from '../../components/column/Column';
import Button from '../../components/button/Button';
import NewTask from '../../components/new-task/Newtask';
import useGetCollection from '../../hooks/useGetCollection';

type Statuses = [string, Status];

const Board = () => {
   const { id: boardId } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const { hash: routeHash } = useLocation();
   const statuses = useGetCollection({ path: `statuses/${boardId}` }) as Statuses[];
   const [showNewTask, setShowNewTask] = useState(false);

   useEffect(() => {
      const isNewTask = routeHash === '#new-task';
      setShowNewTask(isNewTask);
   }, [routeHash]);

   const handleClickShowNewTask = () => {
      navigate({ hash: '#new-task' });
   };

   const handleClosedNewTask = () => {
      navigate({ hash: '' });
   };

   return (
      <div className="h-full flex flex-col">
         <header className="p-4 pb-5 flex justify-end items-center">
            {statuses.length > 0 && (
               <Button
                  variant={ButtonVariant.SOLID}
                  color={ThemeColor.PRIMARY}
                  icon={<PlusIcon size={20} />}
                  onClick={handleClickShowNewTask}
               >
                  Add New Task
               </Button>
            )}
         </header>

         <div className="w-full h-full relative overflow-x-auto overflow-y-hidden scroll-smooth pb-4 mb-4">
            <ol
               data-board-id={boardId}
               className="h-full p-4 flex flex-row gap-10 overflow-x-auto overflow-y-hidden absolute top-0 left-0"
            >
               {statuses.map(([statusId, statusItem]) => (
                  <Column key={statusId} data-status-id={statusId} column={statusItem} />
               ))}

               <AddNewColumn />
               <NewTask isOpen={showNewTask} onClose={handleClosedNewTask} />
            </ol>
         </div>
      </div>
   );
};

export default Board;
