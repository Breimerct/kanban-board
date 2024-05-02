import { FC } from 'react';
import { ThemeColor, ButtonVariant } from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   color?: ThemeColor;
   variant?: ButtonVariant;
   icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
   const { color, variant } = props;

   const colors = {
      [ThemeColor.PRIMARY]: {
         [ButtonVariant.SOLID]: 'shadow-gray-700 bg-gray-700 text-white',
         [ButtonVariant.OUTLINE]:
            'shadow-gray-700 outline outline-1 outline-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
      },
      [ThemeColor.SECONDARY]: {
         [ButtonVariant.SOLID]: 'shadow-gray-400 bg-gray-200 text-black',
         [ButtonVariant.OUTLINE]:
            'shadow-gray-400 outline outline-1 outline-gray-200 text-gray-700 hover:bg-gray-200 hover:text-black'
      },
      [ThemeColor.NEGATIVE]: {
         [ButtonVariant.SOLID]: 'shadow-red-500 bg-red-500 text-white',
         [ButtonVariant.OUTLINE]:
            'shadow-red-500 outline outline-1 outline-red-500 text-red-500 hover:bg-red-500 hover:text-white'
      },
      [ThemeColor.WARNING]: {
         [ButtonVariant.SOLID]: 'shadow-yellow-500 bg-yellow-500 text-black',
         [ButtonVariant.OUTLINE]:
            'shadow-yellow-500 outline outline-1 outline-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'
      },
      [ThemeColor.INFO]: {
         [ButtonVariant.SOLID]: 'shadow-blue-500 bg-blue-500 text-white',
         [ButtonVariant.OUTLINE]:
            'shadow-blue-500 outline outline-1 outline-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
      }
   };

   const className =
      'p-2 rounded-md px-10 shadow-sm font-semibold uppercase transition-all active:animate-jump animate-once animate-duration-1000 animate-ease-in-out animate-normal animate-fill-both flex items-center justify-center gap-2';

   return (
      <button
         {...props}
         className={`
      ${className}
      ${props.className}
      ${colors[color as ThemeColor][variant as ButtonVariant]}
      `}
      >
         {props?.icon}
         <span>{children}</span>
      </button>
   );
};

export default Button;
