import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from 'hooks/useAuthContext';
import { absolutePath } from 'utils/path.utils';
import Path from './paths';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={absolutePath(Path.Login)} />
  );
};

export default PrivateRoute;
