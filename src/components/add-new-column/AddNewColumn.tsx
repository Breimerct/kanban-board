import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '../icons/Icons';
import { FC } from 'react';

interface AddNewColumnProps extends React.HtmlHTMLAttributes<HTMLLIElement> {}

const AddNewColumn: FC<AddNewColumnProps> = ({ className, ...props }) => {
   const navigate = useNavigate();

   const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      navigate('#new-column');
      props.onClick?.(e);
   };

   return (
      <>
         <li
            role="card"
            className={`w-80 max-h-[inherit] p-4 bg-gray-200 shadow-md rounded-md grid place-content-center hover:shadow-lg hover:scale-105 cursor-pointer transition-all ${className}`}
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
      </>
   );
};

export default AddNewColumn;
