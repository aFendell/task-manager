import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { TaskStatus } from 'api/response';
import { TasksAPI } from 'api/methods';
import * as Params from 'api/params';

import TaskItem from './TaskItem';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const TaskList = () => {
  const [status, _setStatus] = React.useState<TaskStatus | undefined>(
    undefined,
  );
  const [search, _setSearch] = React.useState<string | undefined>(undefined);

  const TasksFilterParams: Params.TasksFilter = {
    status,
    search,
  };

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getTasks', TasksFilterParams],
    queryFn: () => TasksAPI.getTasks(TasksFilterParams),
  });

  if (isLoading) return <LoadingSpinner className='m-auto' size={60} />;

  if (error) return <h2>An error has occurred: {error.message}</h2>;

  return (
    <section>
      {!tasks || tasks.length === 0 ? (
        <div>No Tasks To Display</div>
      ) : (
        <>
          <ul className='flex flex-col gap-4'>
            {tasks?.map((task) => <TaskItem key={task.id} {...task} />)}
          </ul>
        </>
      )}
    </section>
  );
};

export default TaskList;
