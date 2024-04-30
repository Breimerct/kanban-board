import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/main-layout/MainLayout';

const routes = createBrowserRouter([
   {
      path: '/',
      Component: MainLayout,
      children: []
   }
]);

export default routes;
