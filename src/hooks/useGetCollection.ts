import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';
import useCurrentUser from './useCurrentUser';

type GenericType = Record<string, string>;

interface Props {
   path: string;
}

const useGetCollection = ({ path }: Props) => {
   const [data, setData] = useState<object[]>([]);
   const { currentUser } = useCurrentUser();

   useEffect(() => {
      if (!currentUser) return setData([]);

      getDB(path, (snapshot: DataSnapshot) => {
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