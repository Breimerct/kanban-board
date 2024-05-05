import { DataSnapshot, Unsubscribe } from 'firebase/database';

export type SetDB = <T>(path: string, data: T) => Promise<boolean>;

export type GetDB = (
   path: string,
   snapshot: (snapshot: DataSnapshot) => void,
   error?: (error: Error) => void
) => Unsubscribe;

export type UpdateData = (updates: object) => void;

export type Board = {
   id: string;
   userId: string;
   title: string;
};

export type Status = {
   id: string;
   boardId: string;
   title: string;
   color: string;
   orderNumber: number;
};

export type Task = {
   id: string;
   statusId: string;
   title: string;
   description: string;
   orderNumber: number;
};

export enum ThemeColor {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   NEGATIVE = 'negative',
   WARNING = 'warning',
   INFO = 'info'
}

export enum ButtonVariant {
   SOLID = 'solid',
   OUTLINE = 'outline'
}
