import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '../icons/Icons';
import NewColumn from './NewColumn';
import { FC } from 'react';

interface AddNewColumnProps extends React.HtmlHTMLAttributes<HTMLLIElement> {}

const AddNewColumn: FC<AddNewColumnProps> = ({ ...props }) => {
   const navigate = useNavigate();

   const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      navigate('#new-column');
      props.onClick?.(e);
   };

   const handleCloseNewColumn = () => {
      navigate({ hash: '' });
   };

   return (
      <>
         <li
            role="card"
            className="w-80 max-h-[inherit] p-4 bg-gray-200 shadow-md rounded-md grid place-content-center hover:shadow-lg hover:scale-105 cursor-pointer transition-all"
            onClick={handleClick}
            {...props}
         >
            <figure className="w-80 flex flex-col justify-center items-center">
               <PlusIcon
                  size={100}
                  className="text-gray-500 dark:text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
               />
               <span className="font-bold text-gray-500 text-center">Add new</span>
            </figure>
         </li>
         <NewColumn onClose={handleCloseNewColumn} />
      </>
   );
};

export default AddNewColumn;
