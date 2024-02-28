import * as React from 'react';
import { Trash, Edit } from 'lucide-react';

import type { Task } from 'api/response';

import ConfirmationModal, { Action } from 'components/modals/ConfirmationModal';
import TaskStatusForm from './TaskStatusForm';
import { Button } from 'components/ui/Button';
import useDeleteTask from 'hooks/useDeleteTask';

const TaskItem = ({ id, title, description, status }: Task) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const onEdit = () => {
    // TODO: edit task feature
  };

  const { deleteTask } = useDeleteTask();

  const confirmDeleteProps: Action = {
    children: 'Delete',
    key: 'delete',
    onClick: () => {
      deleteTask(id);
      setIsDeleteModalOpen(false);
    },
  };

  const cancelDeleteProps: Action = {
    children: 'Cancel',
    key: 'cancel',
    onClick: () => {
      setIsDeleteModalOpen(false);
    },
    variant: 'secondary',
  };

  return (
    <>
      <li key={id}>
        <div className='flex justify-between gap-4 rounded-md border border-gray-200 p-4'>
          <div className='flex flex-grow flex-col gap-y-2'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <p className='mt-auto flex-grow'>{description}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <TaskStatusForm taskStatus={status} id={id} />
            <div className='flex'>
              <Button disabled variant='ghost' onClick={() => onEdit()}>
                <Edit />
              </Button>
              <Button
                variant='ghost'
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        actions={[cancelDeleteProps, confirmDeleteProps]}
        title='Delete Task'
        body='Are you sure you want to delete this task?'
      />
    </>
  );
};

export default TaskItem;
