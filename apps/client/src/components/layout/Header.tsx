import * as React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Path from 'routes/paths';
import TaskForm from 'screens/app/Tasks/TaskForm';
import { Button } from 'components/ui/Button';
import ToggleMode from 'components/ui/ToggleMode';
import useAuthContext from 'hooks/useAuthContext';
import ConfirmationModal, { Action } from 'components/modals/ConfirmationModal';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from 'api/methods';
import { setHeaderToken } from 'api/axiosClient';
import { absolutePath } from 'utils/path.utils';
import { useToast } from 'hooks/useToast';

const Header = () => {
  const { toast } = useToast();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isTaskForm, setIsTaskForm] = React.useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = React.useState(false);

  const isSignUpUrl = pathname.includes(Path.SignUp);
  const { isAuthenticated, setAuth } = useAuthContext();

  const isTasksBoardUrl = pathname.includes(Path.TasksBoard);

  const onLogoutSuccess = () => {
    setAuth(null);
    setHeaderToken();
    navigate(absolutePath(Path.Login));
  };

  const onLogoutError = (error: Error) => {
    toast({
      title: 'Logout Error',
      description: `There was an error while logging out: ${error?.message}`,
    });
    setAuth(null);
    setHeaderToken();
    navigate(absolutePath(Path.Login));
  };

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthAPI.logout(),
    onSuccess: () => onLogoutSuccess(),
    onError: (error) => onLogoutError(error),
  });

  const confirmLogoutProps: Action = {
    children: 'Logout',
    key: 'logout',
    onClick: () => {
      logout();
      setIsConfirmationModal(false);
    },
  };

  const cancelLogoutProps: Action = {
    children: 'Cancel',
    key: 'cancel',
    onClick: () => {
      setIsConfirmationModal(false);
    },
    variant: 'secondary',
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 w-full items-center justify-between'>
        {isAuthenticated ? (
          <nav className='flex w-full justify-between'>
            <Button onClick={() => setIsTaskForm(true)}>Create Task</Button>
            <Button asChild>
              <NavLink
                replace
                to={
                  isTasksBoardUrl ? `/${Path.TasksList}` : `/${Path.TasksBoard}`
                }
              >
                {isTasksBoardUrl ? 'List' : 'Board'}
              </NavLink>
            </Button>
            <Button onClick={() => setIsConfirmationModal(true)}>Logout</Button>
          </nav>
        ) : (
          <nav>
            {isSignUpUrl ? (
              <Button asChild>
                <NavLink replace to={`/${Path.Login}`}>
                  Login
                </NavLink>
              </Button>
            ) : (
              <Button asChild>
                <NavLink replace to={`/${Path.SignUp}`}>
                  Sign Up
                </NavLink>
              </Button>
            )}
          </nav>
        )}

        <ToggleMode />
      </div>
      <TaskForm isOpen={isTaskForm} setIsOpen={setIsTaskForm} />
      <ConfirmationModal
        isOpen={isConfirmationModal}
        setIsOpen={setIsConfirmationModal}
        actions={[cancelLogoutProps, confirmLogoutProps]}
        title='Logout'
        body='Are you sure you wish to logout?'
      />
    </header>
  );
};

export default Header;
