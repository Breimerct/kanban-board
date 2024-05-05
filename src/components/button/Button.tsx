import { ButtonHTMLAttributes, FC } from 'react';
import { type ThemeColor, type ButtonVariant } from '../../types';
import { colors } from '../../consts/buttonTheme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   color: ThemeColor;
   variant: ButtonVariant;
   icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
   const { color, variant } = props;

   const className =
      'p-2 rounded-md px-10 shadow-sm font-semibold uppercase transition-all active:animate-jump animate-once animate-duration-1000 animate-ease-in-out animate-normal animate-fill-both flex items-center justify-center gap-2';

   return (
      <button
         {...props}
         className={`
            ${className}
            ${props.className}
            ${colors[color][variant]}
         `}
      >
         {props?.icon}
         <span>{children}</span>
      </button>
   );
};

export default Button;
