import * as React from 'react';

import { Button } from '@/components/ui/Button';
import TaskForm from '@/components/screens/Home/TaskForm';
import ToggleMode from '@/components/ui/ToggleMode';

const Header = () => {
  const [isTaskForm, setIsTaskForm] = React.useState(false);
  return (
    <header className='mx-auto flex w-full max-w-screen-lg items-center p-8'>
      <nav className='flex w-full justify-between'>
        <Button onClick={() => setIsTaskForm(true)}>Create Task</Button>

        <ToggleMode />
      </nav>
      <TaskForm isOpen={isTaskForm} setIsOpen={setIsTaskForm} />
    </header>
  );
};

export default Header;
