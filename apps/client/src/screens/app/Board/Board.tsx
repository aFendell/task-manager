import { useQuery } from '@tanstack/react-query';

import * as Params from 'api/params';
import { TasksAPI } from 'api/methods';

import Column from './Column';
import BurnZone from './BurnZone';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import { TaskStatus } from 'api/response';

const Board = () => {
  const TasksFilterParams: Params.TasksFilter = {
    status: undefined,
    search: undefined,
  };

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getTasks'],
    queryFn: () => TasksAPI.getTasks(TasksFilterParams),
  });

  if (isLoading) return <LoadingSpinner className='m-auto' size={60} />;

  if (error) return <h2>An error has occurred: {error.message}</h2>;

  return tasks && tasks.length > 0 ? (
    <div className='flex h-full w-full flex-1 gap-3 overflow-scroll bg-neutral-900 p-12 text-neutral-50'>
      <Column
        title='Open'
        column={TaskStatus.OPEN}
        headingColor='text-yellow-200'
        items={tasks}
      />
      <Column
        title='In Progress'
        column={TaskStatus.IN_PROGRESS}
        headingColor='text-blue-200'
        items={tasks}
      />
      <Column
        title='Done'
        column={TaskStatus.DONE}
        headingColor='text-emerald-200'
        items={tasks}
      />
      <BurnZone />
    </div>
  ) : (
    // TODO: Design empty state
    <div>No tasks to display</div>
  );
};

export default Board;
