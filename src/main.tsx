import './index.scss';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import routes from './router';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
   <>
      <RouterProvider router={routes} />
      <Toaster theme="light" position="bottom-center" richColors />
   </>
);
