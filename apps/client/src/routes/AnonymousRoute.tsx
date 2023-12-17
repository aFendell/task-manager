import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from 'hooks/useAuthContext';
import Path from './paths';

const AnonymousRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to={Path.ROOT} /> : <Outlet />;
};

export default AnonymousRoute;
