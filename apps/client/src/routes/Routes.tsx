import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import Screen from 'screens';
import Path from './paths';
import Layout from 'components/layout/Layout';
import { absolutePath } from 'utils/path.utils';
import PrivateRoute from './PrivateRoute';
import AnonymousRoute from './AnonymousRoute';

const routes: RouteObject[] = [
  {
    path: Path.ROOT,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: Path.Tasks,
            element: <Screen.TaskList />,
          },
        ],
      },
      {
        path: '',
        element: <AnonymousRoute />,
        children: [
          {
            path: Path.SignUp,
            element: <Screen.SignUp />,
          },
          {
            path: Path.Login,
            element: <Screen.Login />,
          },
        ],
      },
      {
        path: '',
        element: <Navigate replace to={absolutePath(Path.Tasks)} />,
      },
      {
        path: Path.ROOT,
        element: <Navigate to={absolutePath(Path.Tasks)} />,
      },
      {
        path: Path.ALL,
        element: <Navigate replace to={absolutePath(Path.NotFound)} />,
      },
      { path: Path.NotFound, element: <Screen.NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
