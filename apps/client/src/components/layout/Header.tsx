import * as React from 'react';

import { Button } from '@/components/ui/Button';
import TaskForm from '@/screens/app/Tasks/TaskForm';
import ToggleMode from '@/components/ui/ToggleMode';

const Header = () => {
  const [isTaskForm, setIsTaskForm] = React.useState(false);
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 w-full items-center justify-between'>
        <Button onClick={() => setIsTaskForm(true)}>Create Task</Button>

        <ToggleMode />
      </div>
      <TaskForm isOpen={isTaskForm} setIsOpen={setIsTaskForm} />
    </header>
  );
};

export default Header;
