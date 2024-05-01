import { FC } from 'react';

interface IconProps {
   className?: string;
   size?: number | string;
}

export const BoardIcon: FC<IconProps> = ({ className, size }) => (
   <svg
      width={size || 24}
      height={size || 24}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 9h8M12 15h8M12 4v16" />
   </svg>
);

export const CircleXIcon: FC<IconProps> = ({ className, size }) => (
   <svg
      width={size || 24}
      height={size || 24}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
   </svg>
);
