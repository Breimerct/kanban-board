import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BoardIcon } from '../icons/Icons';

interface RouteItemProps extends React.HTMLAttributes<HTMLLIElement> {
   boardId?: string;
   title: string;
   onClick?: () => void;
   icon?: React.ReactNode;
   to?: string;
}

const RouteItem: FC<RouteItemProps> = ({ title, onClick, to = '', icon, className }) => {
   const { pathname } = useLocation();

   const handleClick = () => {
      onClick && onClick();
   };

   const activeClass = to === pathname ? 'bg-gray-200 dark:bg-gray-700' : '';
   const defaultClass =
      'flex items-center px-3 py-2 rounded-md transition-all ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700';

   return (
      <li onClick={handleClick}>
         <Link to={to} className={`${defaultClass} ${activeClass} ${className}`}>
            {icon ? icon : <BoardIcon size={30} />}
            <span className="ms-3">{title}</span>
         </Link>
      </li>
   );
};

export default RouteItem;
