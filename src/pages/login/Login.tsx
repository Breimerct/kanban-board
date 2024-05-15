import Button from '../../components/button/Button';
import { GitHubIcon, GoogleIcon } from '../../components/icons/Icons';
import LoginForm from '../../components/login-form/LoginForm';
import { signInWithGitHub, signInWithGoogle } from '../../plugins/firebase';
import { ButtonVariant, ThemeColor } from '../../types';

const Login = () => {
   const handleSignInWithGitHub = () => {
      signInWithGitHub();
   };

   const handleSignInWithGoogle = () => {
      signInWithGoogle();
   };

   return (
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl shadow-2xl p-8">
         <header className="w-full">
            <h1 className="text-3xl font-bold w-full mb-4">Login</h1>

            <div className="w-full flex gap-2 justify-between items-center">
               <hr className="h-[2px] w-full bg-gray-200" />
               <div className="flex justify-between items-center gap-2">
                  <Button
                     color={ThemeColor.PRIMARY}
                     variant={ButtonVariant.SOLID}
                     className="!rounded-full !p-0 !w-10 !h-10"
                     onClick={handleSignInWithGitHub}
                  >
                     <GitHubIcon size={20} />
                  </Button>

                  <Button
                     color={ThemeColor.PRIMARY}
                     variant={ButtonVariant.SOLID}
                     className="!rounded-full !p-0 !w-10 !h-10"
                     onClick={handleSignInWithGoogle}
                  >
                     <GoogleIcon size={20} />
                  </Button>
               </div>
               <hr className="h-[2px] w-full bg-gray-200" />
            </div>
         </header>

         <LoginForm />
      </div>
   );
};

export default Login;
