import './ContentEditable.scss';
import { FC, FormEvent, useState } from 'react';

import Button from '../button/Button';
import { CancelIcon, CheckIcon } from '../icons/Icons';

interface ContentEditableProps {
   onSave: (html: string) => void;
   onCancel?: () => void;
   text: string;
   className?: string;
   disabled?: boolean;
}

const ContentEditable: FC<ContentEditableProps> = ({ onCancel, onSave, text, className, disabled }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [textValue, setTextValue] = useState(text);
   const isActive = isEditing ? 'active' : '';

   const disabledClass = disabled ? 'disabled' : '';

   const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
      const $textArea = event.target as HTMLTextAreaElement;
      const $textValue = $textArea.value;
      setTextValue($textValue);
   };

   const handleSave = () => {
      onSave(textValue.trim());
      setTextValue(textValue.trim());
      setIsEditing(false);
   };

   const handleFocus = (event: FormEvent<HTMLTextAreaElement>) => {
      if (disabled) return;

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
      <div className="relative w-full h-full">
         <textarea
            className={`content-area ${isActive} ${className} ${disabledClass}`}
            onInput={handleChange}
            onFocus={handleFocus}
            readOnly={!isEditing}
            value={textValue}
         />
         {isEditing && (
            <div className="absolute right-0 z-40 flex gap-2">
               <Button
                  icon={<CheckIcon size={26} />}
                  variant="solid"
                  color="primary"
                  onClick={handleSave}
                  className="!p-1"
               />
               <Button
                  icon={<CancelIcon size={26} />}
                  variant="solid"
                  color="primary"
                  onClick={handleCancel}
                  className="!p-1"
               />
            </div>
         )}
      </div>
   );
};

export default ContentEditable;
