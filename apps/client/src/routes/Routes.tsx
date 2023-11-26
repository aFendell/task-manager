import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import Screen from '@/screens';
import Path from './paths';
import Layout from '@/components/layout/Layout';
import { absolutePath } from '@/utils/path.utils';

const routes: RouteObject[] = [
  {
    path: Path.ROOT,
    element: <Layout />,
    children: [
      {
        path: Path.ROOT,
        element: <Screen.TaskList />,
      },
      {
        path: Path.Tasks,
        element: <Screen.TaskList />,
      },
      {
        path: Path.SignUp,
        element: <Screen.SignUp />,
      },
      {
        path: Path.Login,
        element: <Screen.Login />,
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
