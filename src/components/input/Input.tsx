import { FC, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   isError?: boolean;
   errorMessage?: string;
   containerClassName?: string;
   preppend?: React.ReactNode;
   append?: React.ReactNode;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
   ({ label, isError, errorMessage, className, containerClassName, preppend, append, ...props }, ref) => {
      const errorClasses = isError
         ? 'border-red-500 text-red-500 focus:outline-none placeholder-red-400 placeholder:opacity-50'
         : 'text-gray-800 border-gray-700 focus:outline-gray-600';

      const errorLabelClasses = isError ? 'text-red-500' : 'text-gray-800';

      return (
         <label htmlFor={props.id} className={`font-bold text-gray-800 ${errorLabelClasses} ${containerClassName}`}>
            {label && <span className="block">{label}</span>}
            <div className={`relative`}>
               {preppend && <div className="absolute left-3 bottom-[45%] translate-y-[50%] z-20">{preppend}</div>}
               <input
                  {...props}
                  ref={ref}
                  className={`p-3 w-full h-full shadow-md  font-semibold border rounded-md read-only:border-slate-300 read-only:shadow-sm read-only:outline-none read-only:focus:outline-none transition-all appearance-none ${className} ${errorClasses} ${preppend ? 'pl-12' : ''} ${append ? 'pr-12' : ''}`}
               />
               {append && <div className="absolute right-3 bottom-[45%] translate-y-[50%] z-20">{append}</div>}
            </div>
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </label>
      );
   }
);

export default Input;
