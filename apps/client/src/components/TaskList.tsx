import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { TasksAPI } from '../api/methods';
import * as Params from '../api/params';
import { TaskStatus } from '../api/types';

import TaskItem from './TaskItem';

const TaskList = () => {
  const [status, _setStatus] = useState<TaskStatus | undefined>(undefined);
  const [search, _setSearch] = useState<string | undefined>(undefined);

  const TasksFilterParams: Params.TasksFilter = {
    status,
    search,
  };

  const {
    data: tasks,
    isLoading,
    error,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ['getTasks', TasksFilterParams],
    queryFn: () => TasksAPI.getTasks(TasksFilterParams),
  });

  const { mutate: deleteTask } = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (id: string) => TasksAPI.deleteTask(id),
    onSuccess: () => refetchTasks(),
  });

  const onEditTask = (_id: string) => {
    // TODO: edit task feature
  };

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {!tasks || tasks.length === 0 ? (
        <div>No Tasks To Display</div>
      ) : (
        <>
          <ul className='flex flex-col gap-4'>
            {tasks?.map((task) => (
              <TaskItem
                key={task.id}
                {...task}
                onDelete={deleteTask}
                onEdit={onEditTask}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
