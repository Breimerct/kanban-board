import { FC, forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../../icons/Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   isError?: boolean;
   errorMessage?: string;
   containerClassName?: string;
   preppend?: React.ReactNode;
   append?: React.ReactNode;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
   (
      {
         label,
         isError,
         errorMessage,
         className = '',
         containerClassName = '',
         preppend,
         append,
         type: inputType,
         ...props
      },
      ref
   ) => {
      const [type, setType] = useState(inputType);
      const errorClasses = isError ? 'form-control-error' : '';

      const readOnlyClasses = props.readOnly ? 'form-control-read-only' : '';

      const isPassword = type === 'password';

      const showPassword = () => {
         const newType = isPassword ? 'text' : 'password';

         setType(newType);
      };

      const passwordIcon =
         inputType === 'password' ? (
            <span className="form-control-append absolute right-0 top-[50%] translate-y-[-50%]" onClick={showPassword}>
               {isPassword ? <EyeIcon size={30} /> : <EyeOffIcon size={30} />}
            </span>
         ) : null;

      return (
         <>
            <label
               htmlFor={props.id}
               className={`form-control ${label ? '!pt-7' : 'pt-2'} ${errorClasses} ${readOnlyClasses} ${containerClassName}`}
            >
               {label && <span className="form-control-label">{label}</span>}
               {preppend && <div className="form-control-preppend">{preppend}</div>}
               <input
                  {...props}
                  type={type}
                  ref={ref}
                  className={`form-control-field ${inputType === 'password' && 'pr-14'} ${className} ${errorClasses}}`}
               />
               {passwordIcon}
               {append && inputType !== 'password' && <div className="form-control-append">{append}</div>}
            </label>
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </>
      );
   }
);

export default Input;
