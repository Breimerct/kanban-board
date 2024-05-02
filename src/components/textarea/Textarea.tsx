import { FC, forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   label: string;
   isError?: boolean;
   errorMessage?: string;
   containerClassName?: string;
}

const Textarea: FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ label, isError, errorMessage, className, containerClassName, ...props }, ref) => {
      const errorClasses = isError
         ? 'border-red-500 text-red-500 focus:outline-none placeholder-red-400 placeholder:opacity-50'
         : 'text-gray-800 border-gray-700 focus:outline-gray-600';

      const errorLabelClasses = isError ? 'text-red-500' : 'text-gray-800';

      return (
         <label htmlFor={props.id} className={`font-bold text-gray-800 ${errorLabelClasses} ${containerClassName}`}>
            <span className="block">{label}</span>
            <textarea
               {...props}
               ref={ref}
               className={`p-3 w-full shadow-md  font-semibold border rounded-md transition-all appearance-none resize-none ${className} ${errorClasses}`}
            />
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </label>
      );
   }
);

export default Textarea;
