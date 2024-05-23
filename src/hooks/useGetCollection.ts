import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';
import { useAuthStore } from '../store/auth.store';
type GenericType = Record<string, string>;

interface Props {
   path: string;
}

const useGetCollection = ({ path }: Props) => {
   const [data, setData] = useState<object[]>([]);
   const currentUser = useAuthStore((state) => state.currentUser);

   useEffect(() => {
      if (!currentUser) return setData([]);

      getDB(path, currentUser.uid, (snapshot: DataSnapshot) => {
         const _data = snapshot.val() as Record<string, GenericType>;
         const _dataArray = Object.entries(_data || {}).map(([id, item]) => ({ id, ...item })) as GenericType[];

         _dataArray.sort((a, b) => {
            return Number(a?.orderNumber) - Number(b?.orderNumber);
         });

         setData(_dataArray);
      });
   }, [path, currentUser]);

   return data;
};

export default useGetCollection;
