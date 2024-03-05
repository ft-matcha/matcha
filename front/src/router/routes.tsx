import Layout from '@/page/Layout';
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
        element: <Layout />,
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
            element: <>liked</>,
          },
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
    ],
  },
]);

export default routes;
