import AuthHeader from '../../components/auth/auth-header/AuthHeader';
import RegisterForm from '../../components/auth/register-form/RegisterForm';

const Register = () => {
   return (
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl shadow-2xl p-8">
         <AuthHeader title="Register" />

         <RegisterForm />
      </div>
   );
};

export default Register;
