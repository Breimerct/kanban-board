import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';
import { useAuthStore } from '../store/auth.store';

interface Props {
   path: string;
}

const useGetOne = ({ path }: Props) => {
   const [data, setData] = useState<object | null>(null);
   const currentUser = useAuthStore((state) => state.currentUser);

   useEffect(() => {
      if (!currentUser) return setData(null);

      getDB(path, currentUser.uid, (snapshot: DataSnapshot) => {
         const _data = snapshot.val();

         setData(_data);
      });
   }, [path, currentUser]);

   return data;
};

export default useGetOne;
