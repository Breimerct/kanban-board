import * as yup from 'yup';

const baseScheme = yup.string().trim();
const emailScheme = baseScheme.required('Email is required').email('Invalid email');
const passwordScheme = baseScheme.required('Password is required').min(6, 'Password must be at least 6 characters');

// new task schema
export const newTaskSchema = yup.object({
   title: baseScheme
      .required('Board name is required')
      .min(3, 'Board name must be at least 3 characters')
      .max(50, 'Board name must be at most 50 characters'),
   description: baseScheme
      .required('Description is required')
      .min(3, 'Description must be at least 3 characters')
      .max(250, 'Description must be at most 500 characters'),
   status: yup.string().trim().required('Status is required'),
   subtasks: yup.array().of(
      yup.object({
         title: yup.string().trim().max(50, 'Subtask name must be at most 50 characters').optional()
      })
   )
});

// login schema
export const loginSchema = yup.object({
   email: emailScheme,
   password: passwordScheme
});

// register schema
export const registerSchema = yup.object({
   name: baseScheme.required('Name is required').min(3, 'Name must be at least 3 characters'),
   email: baseScheme.required('Email is required').email('Invalid email'),
   password: passwordScheme
      .test('uppercase', 'Must contain at least one uppercase letter', (value) => /[A-Z]/.test(value))
      .test('number', 'Must contain at least one number', (value) => /\d/.test(value)),
   confirmPassword: baseScheme
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
});
