import React, { FC, useEffect, useState } from 'react';
import { CircleXIcon } from '../icons/Icons';
import Button from '../button/Button';
import { ThemeColor, ButtonVariant } from '../../types';

interface ModalProps {
   children: React.ReactNode;
   isOpen: boolean;
   onClose?: () => void;
   title?: string;
   buttonSuccessText?: string;
   buttonCancelText?: string;
   buttonSuccessClassName?: string;
   buttonCancelClassName?: string;
   onButtonSuccess?: () => void;
   onButtonCancel?: () => void;
   hideActions?: boolean;
   classNameModalContent?: string;
}

const Modal: FC<ModalProps> = ({
   children,
   isOpen,
   title,
   buttonCancelClassName,
   buttonCancelText,
   buttonSuccessClassName,
   buttonSuccessText,
   onButtonCancel,
   onButtonSuccess,
   onClose,
   hideActions,
   classNameModalContent
}) => {
   const [showModal, setShowModal] = useState(isOpen);

   const handleClose = () => {
      setShowModal(false);
      if (onClose) onClose();
   };

   const handleSuccess = () => {
      handleClose();
      if (onButtonSuccess) onButtonSuccess();
   };

   const handleCancel = () => {
      handleClose();
      if (onButtonCancel) onButtonCancel();
   };

   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]);

   return (
      <>
         {showModal && (
            <div
               className={`fixed inset-0 z-10 overflow-hidden bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-all ease-in-out`}
            >
               <div
                  className={`mx-auto p-4 z-20 w-screen h-screen flex items-center justify-center animate-once animate-ease-in-out ${showModal ? 'animate-jump-in' : 'animate-jump-out'}`}
               >
                  <div
                     className={`w-full max-w-5xl h-full sm:h-[initial] flex flex-col relative shadow-lg rounded-lg bg-white overflow-hidden ${classNameModalContent}`}
                  >
                     {title && (
                        <header className="flex justify-between items-center text-gray-800 shadow-md">
                           <h2 className="text-2xl font-bold p-4">{title}</h2>
                           <button onClick={handleClose} className="p-2 hover:text-opacity-75 focus:outline-none">
                              <CircleXIcon />
                           </button>
                        </header>
                     )}

                     <main className="text-left h-full max-h-full overflow-hidden">{children}</main>

                     {!hideActions && (
                        <footer className="flex justify-end p-4 gap-2 border border-t-gray-300">
                           <Button
                              onClick={handleCancel}
                              variant={ButtonVariant.OUTLINE}
                              color={ThemeColor.NEGATIVE}
                              className={`${buttonCancelClassName}`}
                           >
                              {buttonCancelText || 'Cancel'}
                           </Button>

                           <Button
                              onClick={handleSuccess}
                              variant={ButtonVariant.SOLID}
                              color={ThemeColor.PRIMARY}
                              className={`${buttonSuccessClassName}`}
                           >
                              {buttonSuccessText || 'Save'}
                           </Button>
                        </footer>
                     )}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Modal;
