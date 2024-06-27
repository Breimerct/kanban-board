import { Link } from 'react-router-dom';
import Button from '../../button/Button';
import Input from '../../form-control/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../consts/formRules';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../store/auth.store';

const RegisterForm = () => {
   const createUser = useAuthStore((state) => state.createAccount);
   const authLoading = useAuthStore((state) => state.authLoading);
   const resolver = yupResolver(registerSchema);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({ resolver });

   const onSubmit = handleSubmit(async (data) => {
      try {
         createUser(data).then(() => reset());
      } catch (error) {
         console.error(error);
      }
   });

   return (
      <>
         <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
            <div>
               <Input
                  {...register('name')}
                  isError={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
               />
            </div>

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

            <div>
               <Input
                  {...register('confirmPassword')}
                  isError={!!errors.confirmPassword?.message}
                  errorMessage={errors.confirmPassword?.message}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
               />
            </div>

            <Button color="primary" variant="solid" isLoading={authLoading}>
               Register
            </Button>

            <Link to="/auth/login" className="text-blue-500 hover:underline self-end">
               Already have an account
            </Link>
         </form>
      </>
   );
};

export default RegisterForm;
