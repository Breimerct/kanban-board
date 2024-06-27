import { User } from 'firebase/auth';
import { setDB, updateData } from '../plugins/firebase';
import { Board } from '../types';

export const createBoard = async (boardName: string, boards: Board[], currentUser: User | null) => {
   if (currentUser) {
      const newData = await setDB(`boards`, {
         title: boardName,
         userId: currentUser?.uid
      });

      return [...boards, newData] as Board[];
   }

   const newBoard: Partial<Board> = {
      id: crypto.randomUUID(),
      title: boardName
   };

   return [...boards, newBoard] as Board[];
};

export const updateBoard = (boardId: string, board: Board, boards: Board[], currentUser: User | null) => {
   const _board = boards.find((b) => b.id === boardId);

   if (!_board) return [];

   _board.title = board?.title ?? _board.title;

   const updatedBoards = boards.map((b) => (b.id === boardId ? _board : b));

   if (currentUser) {
      const path = `boards/${currentUser.uid}/${boardId}`;
      updateData(path, board);
   }

   return updatedBoards;
};

export const deleteBoard = (boardId: string, boards: Board[], currentUser: User | null) => {
   const updatedBoards = boards.filter((b) => b.id !== boardId);

   if (currentUser) {
      const path = `boards/${currentUser.uid}/${boardId}`;
      updateData(path, null);
   }

   return updatedBoards;
};
