import './ContentEditable.scss';
import { FC, FormEvent, useState } from 'react';
import { ButtonVariant, ThemeColor } from '../../types';

import Button from '../button/Button';
import { CancelIcon, CheckIcon } from '../icons/Icons';

interface ContentEditableProps {
   onSave: (html: string) => void;
   onCancel?: () => void;
   text: string;
   className?: string;
}

const ContentEditable: FC<ContentEditableProps> = ({ onCancel, onSave, text, className }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [textValue, setTextValue] = useState(text);
   const isActive = isEditing ? 'active' : '';

   const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
      const $textArea = event.target as HTMLTextAreaElement;
      const $textValue = $textArea.value;
      setTextValue($textValue);
   };

   const handleSave = () => {
      onSave(textValue);
      setIsEditing(false);
   };

   const handleFocus = (event: FormEvent<HTMLTextAreaElement>) => {
      const $currentTarget = event.target as HTMLElement;
      $currentTarget.focus();
      setIsEditing(true);
   };

   const handleCancel = () => {
      setTextValue(text);
      setIsEditing(false);
      onCancel?.();
   };

   return (
      <div className="relative">
         <textarea
            className={`content-area ${isActive} ${className}`}
            onInput={handleChange}
            onFocus={handleFocus}
            readOnly={!isEditing}
            value={textValue}
         />
         {isEditing && (
            <div className="absolute right-0 z-10 flex gap-2">
               <Button
                  icon={<CheckIcon size={26} />}
                  variant={ButtonVariant.SOLID}
                  color={ThemeColor.PRIMARY}
                  onClick={handleSave}
                  className="!p-1"
               />
               <Button
                  icon={<CancelIcon size={26} />}
                  variant={ButtonVariant.SOLID}
                  color={ThemeColor.PRIMARY}
                  onClick={handleCancel}
                  className="!p-1"
               />
            </div>
         )}
      </div>
   );
};

export default ContentEditable;
