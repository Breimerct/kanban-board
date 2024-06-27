import { FC } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import Button from '../../button/Button';
import { GitHubIcon, GoogleIcon } from '../../icons/Icons';

interface AuthHeaderProps {
   title: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {
   const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
   const signInWithGitHub = useAuthStore((state) => state.signInWithGitHub);

   return (
      <header className="w-full">
         <h1 className="text-4xl font-bold text-gray-800 w-full mb-4">{title}</h1>

         <div className="w-full flex gap-2 justify-between items-center">
            <hr className="h-[2px] w-full bg-gray-200" />
            <div className="flex justify-between items-center gap-2">
               <Button
                  color="primary"
                  variant="solid"
                  className="!rounded-full !p-0 !w-10 !h-10"
                  onClick={signInWithGitHub}
               >
                  <GitHubIcon size={20} />
               </Button>

               <Button
                  color="primary"
                  variant="solid"
                  className="!rounded-full !p-0 !w-10 !h-10"
                  onClick={signInWithGoogle}
               >
                  <GoogleIcon size={20} />
               </Button>
            </div>
            <hr className="h-[2px] w-full bg-gray-200" />
         </div>
      </header>
   );
};

export default AuthHeader;
