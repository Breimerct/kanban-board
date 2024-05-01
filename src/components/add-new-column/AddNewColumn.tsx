const AddNewColumn = () => {
   return (
      <li role="card" className="w-80 max-h-[inherit] p-4 bg-gray-200 shadow-md rounded-md grid place-content-center">
         <figure className="w-80 flex flex-col justify-center items-center">
            <svg
               className="text-gray-500 dark:text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
               width="100"
               height="100"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
               <path d="M12 5l0 14" />
               <path d="M5 12l14 0" />
            </svg>
            <span className="font-bold text-gray-500 text-center">Add new</span>
         </figure>
      </li>
   );
};

export default AddNewColumn;
