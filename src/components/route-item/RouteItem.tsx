import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BoardIcon } from '../icons/Icons';

interface RouteItemProps {
   boardId?: string;
   title: string;
   onClick?: () => void;
}

const RouteItem: FC<RouteItemProps> = ({ boardId, title, onClick }) => {
   const handleClick = () => {
      onClick && onClick();
   };

   return (
      <li onClick={handleClick}>
         <Link
            to={boardId ? `/board/${boardId}` : '#create-board'}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
         >
            <BoardIcon />
            <span className="ms-3">{title}</span>
         </Link>
      </li>
   );
};

export default RouteItem;
