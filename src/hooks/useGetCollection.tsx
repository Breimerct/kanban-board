import { useEffect, useState } from 'react';
import { getDB } from '../plugins/firebase';
import { DataSnapshot } from 'firebase/database';

type GenericType = Record<string, string>;

interface Props {
   path: string;
}

const useGetCollection = ({ path }: Props) => {
   const [data, setData] = useState<[string, GenericType][]>([]);

   useEffect(() => {
      getDB(path, handleSnapshot, handleErrors);
   }, [path]);

   const handleSnapshot = (snapshot: DataSnapshot) => {
      const _data = snapshot.val() as Record<string, GenericType>;
      const _dataArray = Object.entries(_data || {});

      setData(_dataArray);
   };

   const handleErrors = (error: Error) => {
      console.log(error);
   };

   return data;
};

export default useGetCollection;
