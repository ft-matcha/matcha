import Main from '@/page/Main';
import Recommend from '@/page/recommend/Recommend';
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
          {
            path: 'liked',
            element: <Recommend />,
          },
          {
            path: 'recommend',
            element: <Recommend />,
          },
        ],
      },
    ],
  },
]);

export default routes;
