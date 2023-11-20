import { TrashIcon, EditIcon } from 'lucide-react';

import type { Task } from '../api/response';

import TaskStatusForm from './TaskStatusForm';
import { Button } from './ui/Button';

type Props = Task & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const TaskItem = ({
  id,
  title,
  description,
  status,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <li key={id}>
      <div className='flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-md'>
        <div className='flex flex-col flex-grow'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='flex flex-col'>
          <TaskStatusForm taskStatus={status} id={id} />

          <div className='flex'>
            <Button variant='ghost' onClick={() => onEdit(id)}>
              <EditIcon />
            </Button>
            <Button variant='ghost' onClick={() => onDelete(id)}>
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
