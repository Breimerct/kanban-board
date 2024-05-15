import './index.scss';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import routes from './router';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={routes} />);
