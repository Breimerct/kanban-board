import { ButtonHTMLAttributes, FC } from 'react';
import { type ThemeColor, type ButtonVariant } from '../../types';
import { colors } from '../../consts/buttonTheme';
import { LoadingIcon } from '../icons/Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   color: ThemeColor;
   variant: ButtonVariant;
   icon?: React.ReactNode;
   isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
   const { color, variant } = props;

   const className =
      'rounded-md py-3 px-10 shadow-sm font-semibold uppercase transition-all active:animate-jump animate-once animate-duration-1000 animate-ease-in-out animate-normal animate-fill-both flex items-center justify-center gap-2 text-xs md:text-base hover:shadow-md';

   const disabledClasses = 'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

   return (
      <button
         {...props}
         className={`
            ${className}
            ${disabledClasses}
            ${props.className}
            ${colors[color][variant]}
         `}
      >
         {props?.icon}
         {!!children && !isLoading ? (
            <span>{children}</span>
         ) : (
            <span className="animate-spin">
               <LoadingIcon size={30} />
            </span>
         )}
      </button>
   );
};

export default Button;
