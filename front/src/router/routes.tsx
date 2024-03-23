import Layout from '@/page/Layout';
import AuthContainer from '@/page/auth/AuthContainer';
import Recommend from '@/page/recommend/Recommend';
import RecommendResult from '@/page/recommend/RecommendResult';
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
        element: <AuthContainer />,
      },
      {
        path: 'explorer',
        element: <Layout />,
        children: [
          {
            path: 'recommend',
            element: <Recommend />,
            children: [
              {
                path: ':id',
                element: <RecommendResult />,
              },
            ],
          },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            path: 'change_password',
            element: <>Change password</>,
          },
        ],
      },
      {
        path: 'liked',
        element: <>liked</>,
      },
    ],
  },
]);

export default routes;
