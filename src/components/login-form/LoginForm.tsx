import { Link } from 'react-router-dom';
import { ButtonVariant, ThemeColor } from '../../types';

import Input from '../../components/form-control/input/Input';
import Button from '../../components/button/Button';
import { loginSchema } from '../../consts/formRules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
   const resolver = yupResolver(loginSchema);
   const initialValues = {
      email: '',
      password: ''
   };

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({ resolver, defaultValues: initialValues });

   const onSubmit = handleSubmit((data) => {
      console.log(data);
   });

   return (
      <>
         <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
            <div>
               <Input
                  {...register('email')}
                  isError={!!errors.password?.message}
                  errorMessage={errors.password?.message}
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
