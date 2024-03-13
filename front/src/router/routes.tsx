import Layout from '@/page/Layout';
import Main from '@/page/Main';
import AuthContainer from '@/page/auth/AuthContainer';
import Login from '@/page/auth/Login';
import Register from '@/page/auth/register/Register';
import Recommend from '@/page/recommend/Recommend';
import RecommendResult from '@/page/recommend/RecommendResult';
import Profile from '@/page/user/Profile';
import ProfileList from '@/page/user/ProfileList';
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
            path: ':id',
            element: <ProfileList />,
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
