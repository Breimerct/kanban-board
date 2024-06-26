import LoginForm from '../../components/auth/login-form/LoginForm';
import AuthHeader from '../../components/auth/auth-header/AuthHeader';

const Login = () => {
   return (
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl shadow-2xl p-8">
         <AuthHeader title="Login" />

         <LoginForm />
      </div>
   );
};

export default Login;
