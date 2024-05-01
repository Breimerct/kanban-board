import { User } from 'firebase/auth';
import { DataSnapshot, Unsubscribe } from 'firebase/database';

export type SetDB = <T>(path: string, data: T) => Promise<boolean>;

export type GetDB = (
   path: string,
   snapshot: (snapshot: DataSnapshot) => void,
   error?: (error: Error) => void
) => Unsubscribe;

export type AuthStateChanged = (callback: (user: User | null) => void, error?: (error: Error) => void) => void;

export type Board = {
   id: string;
   title: string;
};

export type Status = {
   id: string;
   title: string;
   color: string;
};

export type Task = {
   id: string;
   title: string;
   description: string;
};

export enum ButtonColor {
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
