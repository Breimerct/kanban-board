import { DataSnapshot, Unsubscribe } from 'firebase/database';

export type SetDB = <T>(path: string, data: T) => Promise<string | null>;

export type GetDB = (
   path: string,
   userId: string,
   snapshot: (snapshot: DataSnapshot) => void,
   error?: (error: Error) => void
) => Unsubscribe;

export type UpdateData = (path: string | Record<string, unknown>, data?: unknown) => void;

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

export type Subtask = {
   id: string;
   taskId: string;
   title: string;
   isCompleted: boolean;
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

export type NewUser = {
   name: string;
   email: string;
   password: string;
};
