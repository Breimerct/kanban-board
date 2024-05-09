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
      const errorClasses = isError ? 'form-control-error' : '';

      const readOnlyClasses = props.readOnly ? 'form-control-read-only' : '';

      return (
         <>
            <label
               htmlFor={props.id}
               className={`form-control ${errorClasses} ${readOnlyClasses} ${containerClassName} ${label ? '!pt-7' : 'pt-2'}`}
            >
               {label && <span className="form-control-label">{label}</span>}
               {preppend && <div className="form-control-preppend">{preppend}</div>}
               <input {...props} ref={ref} className={`form-control-field ${className} ${errorClasses}}`} />
               {append && <div className="form-control-append">{append}</div>}
            </label>
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </>
      );
   }
);

export default Input;
