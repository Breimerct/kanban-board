import { FC, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   isError?: boolean;
   errorMessage?: string;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
   ({ label, isError, errorMessage, className, ...props }, ref) => {
      const errorClasses = isError
         ? 'border-red-500 text-red-500 focus:outline-none placeholder-red-400 placeholder:opacity-50'
         : 'text-gray-800 border-gray-700 focus:outline-gray-600';

      return (
         <label htmlFor={props.id} className="font-bold text-gray-800">
            <span>{label}</span>
            <input
               {...props}
               ref={ref}
               className={`p-3 w-full shadow-md  font-semibold border rounded-md transition-all appearance-none ${className} ${errorClasses}`}
            />
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </label>
      );
   }
);

export default Input;
