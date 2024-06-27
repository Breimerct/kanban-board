import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';
import { useAuthStore } from '../store/auth.store';
import { useBoardStore } from '../store/board.store';
type GenericType = Record<string, string>;

enum StoreName {
   board = 'board',
   task = 'task',
   subtask = 'subtask'
}

interface Props {
   path: string;
   storeName?: keyof typeof StoreName;
}

const useGetCollection = ({ path, storeName }: Props) => {
   const [data, setData] = useState<object[]>([]);
   const currentUser = useAuthStore((state) => state.currentUser);
   const boardStore = useBoardStore((state) => state.boards);

   useEffect(() => {
      if (!currentUser) {
         if (storeName === 'board') setData(boardStore);
         return;
      }

      getDB(path, currentUser.uid, (snapshot: DataSnapshot) => {
         const _data = snapshot.val() as Record<string, GenericType>;
         const _dataArray = Object.entries(_data || {}).map(([id, item]) => ({ id, ...item })) as GenericType[];

         _dataArray.sort((a, b) => {
            return Number(a?.orderNumber) - Number(b?.orderNumber);
         });

         setData(_dataArray);
      });
   }, [path, storeName, currentUser]);

   return data;
};

export default useGetCollection;
