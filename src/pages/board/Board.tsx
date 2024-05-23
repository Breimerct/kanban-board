//#region imports
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeColor, ButtonVariant, type Status } from '../../types';

// imports components
import { PlusIcon } from '../../components/icons/Icons';
import Button from '../../components/button/Button';
import NewTask from '../../components/new-task/Newtask';
import useGetCollection from '../../hooks/useGetCollection';
import StatusList from '../../components/status-list/StatusList';
import NewColumn from '../../components/add-new-column/NewColumn';
import TaskDetail from '../../components/task-detail/TaskDetail';

const Board = () => {
   const { id: boardId } = useParams<{ id: string }>();
   const statuses = useGetCollection({ path: `statuses/${boardId}` }) as Status[];
   const [showNewTask, setShowNewTask] = useState(false);
   const { hash: routeHash } = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const isNewTask = routeHash === '#new-task';
      setShowNewTask(isNewTask);
   }, [routeHash]);

   const handleClickShowNewTask = () => {
      navigate({ hash: '#new-task' });
   };

   const handleCloseModal = () => {
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
            <StatusList statuses={statuses} boardId={boardId} />
         </div>

         <NewTask isOpen={showNewTask} onClose={handleCloseModal} />
         <NewColumn onClose={handleCloseModal} />
         <TaskDetail />
      </div>
   );
};

export default Board;
