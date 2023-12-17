import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Path from 'routes/paths';
import TaskForm from 'screens/app/Tasks/TaskForm';
import { Button } from 'components/ui/Button';
import ToggleMode from 'components/ui/ToggleMode';

const Header = () => {
  const { pathname } = useLocation();

  const [isTaskForm, setIsTaskForm] = React.useState(false);
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 w-full items-center justify-between'>
        {pathname.includes(Path.Tasks) ? (
          <Button onClick={() => setIsTaskForm(true)}>Create Task</Button>
        ) : pathname.includes(Path.SignUp) ? (
          <Button>
            <NavLink replace to={`/${Path.Login}`}>
              Login
            </NavLink>
          </Button>
        ) : (
          <Button>
            <NavLink replace to={`/${Path.SignUp}`}>
              Sign Up
            </NavLink>
          </Button>
        )}

        <ToggleMode />
      </div>
      <TaskForm isOpen={isTaskForm} setIsOpen={setIsTaskForm} />
    </header>
  );
};

export default Header;
