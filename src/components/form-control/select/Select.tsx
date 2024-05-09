import { FC, forwardRef } from 'react';

type Option = Record<string, string | number>;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
   label?: string;
   isError?: boolean;
   errorMessage?: string;
   containerClassName?: string;
   defaultOption?: string;
   options: Option[];
   displayValue: string;
   returnValueKey?: string;
}

const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
   (
      {
         label,
         isError,
         errorMessage,
         className,
         containerClassName,
         displayValue,
         returnValueKey,
         defaultOption,
         options,
         ...props
      },
      ref
   ) => {
      const errorClasses = isError ? 'form-control-error' : '';

      const returnValue = (obj: Option) => (returnValueKey ? String(obj[returnValueKey]) : JSON.stringify(obj));

      const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
         if (props.onChange) {
            const selectedOption = options.find((option) => option[displayValue] === e.target.value);
            selectedOption && props.onChange({ ...e, target: { ...e.target, value: returnValue(selectedOption) } });
         }
      };

      return (
         <>
            <label
               htmlFor={props.id}
               className={`form-control ${errorClasses} ${containerClassName} ${label ? '!pt-7' : 'pt-2'}`}
            >
               {label && <span className="form-control-label">{label}</span>}
               <select {...props} ref={ref} onChange={handleChanges} className={`form-control-field ${className}`}>
                  {defaultOption && (
                     <option disabled value="">
                        {defaultOption}
                     </option>
                  )}
                  {options.map((option, index) => (
                     <option key={option?.id || index} value={returnValue(option)}>
                        {option[displayValue]}
                     </option>
                  ))}
               </select>
            </label>
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </>
      );
   }
);

export default Select;
