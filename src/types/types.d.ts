import { DataSnapshot } from 'firebase/database';

export type SetDB = <T>(path: string, data: T) => void;

export type GetDB = (path: string, snapshot: (snapshot: DataSnapshot) => void, error?: (error: Error) => void) => void;

export type AuthStateChanged = (callback: (user: User | null) => void, error?: (error: Error) => void) => void;
