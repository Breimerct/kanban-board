import React, { FC, useEffect, useState } from 'react';
import { CircleXIcon } from '../icons/Icons';
import Button from '../button/Button';
import { ButtonColor, ButtonVariant } from '../../types';

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
   hideActions
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
               className={`fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-all ease-in-out`}
            >
               <div
                  className={`mx-auto p-4 w-screen h-screen flex items-center animate-once animate-ease-in-out ${showModal ? 'animate-jump-in' : 'animate-jump-out'}`}
               >
                  <div className="w-full max-w-lg mx-auto relative shadow-lg rounded-lg bg-white overflow-hidden">
                     <header className="flex justify-between items-center text-gray-800 shadow-md">
                        <h2 className="text-2xl font-bold p-4">{title}</h2>
                        <button onClick={handleClose} className="p-2 hover:text-opacity-75 focus:outline-none">
                           <CircleXIcon />
                        </button>
                     </header>

                     <main className="p-6 text-left">{children}</main>

                     {!hideActions && (
                        <footer className="flex justify-end p-4 gap-2 border border-t-gray-300">
                           <Button
                              onClick={handleCancel}
                              variant={ButtonVariant.OUTLINE}
                              color={ButtonColor.NEGATIVE}
                              className={`${buttonCancelClassName}`}
                           >
                              {buttonCancelText || 'Cancel'}
                           </Button>

                           <Button
                              onClick={handleSuccess}
                              variant={ButtonVariant.SOLID}
                              color={ButtonColor.PRIMARY}
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
