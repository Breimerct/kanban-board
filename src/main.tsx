import './index.scss';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import routes from './router';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={routes} />);
