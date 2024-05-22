import { Link } from 'react-router-dom';
import { ButtonVariant, ThemeColor } from '../../../types';

import Input from '../../form-control/input/Input';
import Button from '../../button/Button';
import { loginSchema } from '../../../consts/formRules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../store/auth.store';

const LoginForm = () => {
   const resolver = yupResolver(loginSchema);
   const signInWithEmailAndPass = useAuthStore((state) => state.signInWithEmailAndPass);

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({ resolver });

   const onSubmit = handleSubmit((data) => {
      signInWithEmailAndPass(data.email, data.password);
   });

   return (
      <>
         <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
            <div>
               <Input
                  {...register('email')}
                  isError={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
               />
            </div>

            <div>
               <Input
                  {...register('password')}
                  isError={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
               />
            </div>

            <Button color={ThemeColor.PRIMARY} variant={ButtonVariant.SOLID} type="submit">
               Login
            </Button>

            <Link to="/auth/register" className="text-blue-500 hover:underline self-end">
               Create an account
            </Link>
         </form>
      </>
   );
};

export default LoginForm;
