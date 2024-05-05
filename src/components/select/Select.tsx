import { FC, forwardRef } from 'react';

type Option = Record<string, string>;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
   label: string;
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
      const errorClasses = isError
         ? 'border-red-500 text-red-500 focus:outline-none placeholder-red-400 placeholder:opacity-50'
         : 'text-gray-800 border-gray-700 focus:outline-gray-600';

      const errorLabelClasses = isError ? 'text-red-500' : 'text-gray-800';

      const returnValue = (obj: Option) => (returnValueKey ? obj[returnValueKey] : JSON.stringify(obj));

      const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
         if (props.onChange) {
            const selectedOption = options.find((option) => option[displayValue] === e.target.value);
            selectedOption && props.onChange({ ...e, target: { ...e.target, value: returnValue(selectedOption) } });
         }
      };

      return (
         <label htmlFor={props.id} className={`font-bold text-gray-800 ${errorLabelClasses} ${containerClassName}`}>
            <span className="block">{label}</span>
            <select
               {...props}
               ref={ref}
               onChange={handleChanges}
               className={`p-3 w-full shadow-md  font-semibold border rounded-md transition-all capitalize appearance-none ${className} ${errorClasses}`}
            >
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
            {isError && <span className="text-red-500 text-sm">{errorMessage}</span>}
         </label>
      );
   }
);

export default Select;
