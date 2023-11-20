import * as React from 'react';

import { Button } from '../ui/Button';
import TaskForm from '../TaskForm';

const Header = () => {
  const [isTaskForm, setIsTaskForm] = React.useState(false);
  return (
    <header className='w-full p-8 flex items-center'>
      <Button onClick={() => setIsTaskForm(true)}>Create Task</Button>
      <TaskForm open={isTaskForm} setOpen={setIsTaskForm} />
    </header>
  );
};

export default Header;
