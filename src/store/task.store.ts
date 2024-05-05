import { persist } from 'zustand/middleware';
import { Task } from './../types/index';
import { create } from 'zustand';

type TaskState = {
   task: Task | null;
};

type TaskActions = {
   setTask: (task: Task | null) => void;
};

export const useTaskStore = create<TaskState & TaskActions>()(
   persist(
      (set) => ({
         task: null,

         setTask: (task) => set({ task })
      }),
      { name: 'task-store' }
   )
);
