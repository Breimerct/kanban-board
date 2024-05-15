import * as yup from 'yup';

export const newTaskSchema = yup.object({
   title: yup
      .string()
      .trim()
      .min(3, 'Board name must be at least 3 characters')
      .max(50, 'Board name must be at most 50 characters')
      .required('Board name is required'),
   description: yup
      .string()
      .trim()
      .min(3, 'Description must be at least 3 characters')
      .max(250, 'Description must be at most 500 characters')
      .required('Description is required'),
   status: yup.string().trim().required('Status is required'),
   subtasks: yup.array().of(
      yup.object({
         title: yup.string().trim().max(50, 'Subtask name must be at most 50 characters').optional()
      })
   )
});

export const loginSchema = yup.object({
   email: yup.string().trim().email('Invalid email').required('Email is required'),
   password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('Password is required')
});
