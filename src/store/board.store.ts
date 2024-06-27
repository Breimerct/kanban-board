import { Board } from './../types/index';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { useAuthStore } from './auth.store';
import { createBoard, updateBoard, deleteBoard } from '../services/board.service';

type BoardState = {
   board: Board | null;
   boards: Board[];
};

type BoardActions = {
   setBoard: (board: Board | null) => void;
   createBoard: (board: Board) => void;
   updateBoard: (boardId: string, board: Board) => void;
   deleteBoard: (boardId: string) => void;
};

const initialValues: BoardState = {
   board: null,
   boards: []
};

const { currentUser } = useAuthStore.getState();

export const useBoardStore = create<BoardState & BoardActions>()(
   persist(
      (set, get) => ({
         ...initialValues,

         setBoard: (board) => set({ board }),

         createBoard: (board) => {
            const updatedBoards = createBoard(board, get().boards, currentUser);

            set({ boards: updatedBoards });
         },

         updateBoard: (boardId, board) => {
            const updatedBoards = updateBoard(boardId, board, get().boards, currentUser);

            set({ boards: updatedBoards });
         },

         deleteBoard: (boardId) => {
            const boards = deleteBoard(boardId, get().boards, currentUser);

            set({ boards });
         }
      }),
      { name: 'board-store' }
   )
);
