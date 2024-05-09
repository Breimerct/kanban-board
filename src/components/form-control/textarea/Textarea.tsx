import { FC, forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   label?: string;
   isError?: boolean;
   errorMessage?: string;
   containerClassName?: string;
}

const Textarea: FC<TextareaProps> = forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ label, isError, errorMessage, className, containerClassName, ...props }, ref) => {
      const errorClasses = isError ? 'form-control-error' : '';

      const readOnlyClasses = props.readOnly ? 'form-control-read-only' : '';

      return (
         <>
            <label
               htmlFor={props.id}
               className={`form-control ${errorClasses} ${readOnlyClasses} ${containerClassName} ${label ? '!pt-7' : 'pt-2'}`}
            >
               {label && <span className="form-control-label">{label}</span>}
               <textarea {...props} ref={ref} className={`form-control-field ${className}`} />
            </label>
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </>
      );
   }
);

export default Textarea;
