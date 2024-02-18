import Main from '@/page/Main';
import Login from '@/page/auth/Login';
import Register from '@/page/auth/Register';
import Profile from '@/page/user/Profile';
import { ApiProvider } from '@/provider/ApiContainerProvider';

import { createBrowserRouter } from 'react-router-dom';

const routes = createBrowserRouter([
  {
    path: '',
    element: <ApiProvider />,
    children: [
      {
        path: '',
        element: <Main />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default routes;
