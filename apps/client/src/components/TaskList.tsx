import { useQuery } from '@tanstack/react-query';
import { TasksAPI } from '../api/methods';

const TaskList = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => TasksAPI.getTasks(),
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {!tasks || tasks.length === 0 ? (
        <div>No Tasks To Display</div>
      ) : (
        <ul>
          {tasks?.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
