import { Task } from '../api/response';
import { Button } from './ui/Button';

type Props = Task & {
  onDelete: (id: string) => void;
};

const TaskItem = ({ id, title, description, status, onDelete }: Props) => {
  return (
    <li key={id}>
      <div className='flex items-center justify-between p-4 m-2 border border-gray-200 rounded-md'>
        <div className=''>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='ml-4 '>
          <p>
            Status:{' '}
            <span className='font-semibold'>{status.replace('_', ' ')}</span>
          </p>
          <Button variant='outline' onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
