import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';
import useCurrentUser from './useCurrentUser';

interface Props {
   path: string;
}

const useGetOne = ({ path }: Props) => {
   const [data, setData] = useState<object | null>(null);
   const { currentUser } = useCurrentUser();

   useEffect(() => {
      if (!currentUser) return setData(null);

      getDB(path, (snapshot: DataSnapshot) => {
         const _data = snapshot.val();

         setData(_data);
      });
   }, [path, currentUser]);

   return data;
};

export default useGetOne;
