import Main from '@/page/Main';
import Recommend from '@/page/recommend/Recommend';
import Profile from '@/page/user/Profile';
import ProfileList from '@/page/user/ProfileList';
import { ApiProvider } from '@/provider/ApiContainerProvider';

import { Outlet, createBrowserRouter } from 'react-router-dom';

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
            children: [
              {
                path: ':id',
                element: <ProfileList />,
              },
            ],
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
